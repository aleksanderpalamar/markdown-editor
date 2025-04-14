"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createDocument, updateDocument } from "@/lib/actions"
import { MarkdownPreview } from "@/components/markdown-preview"
import type { Document } from "@prisma/client"
import Link from "next/link"

export function Editor({
  isNew,
  document,
}: {
  isNew: boolean
  document: Document | null
}) {
  const router = useRouter()
  const [title, setTitle] = useState(document?.title || "")
  const [content, setContent] = useState(document?.content || "")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    if (!title) return

    setIsSaving(true)

    try {
      if (isNew) {
        const newDoc = await createDocument(title, content)
        router.push(`/editor/${newDoc.id}`)
      } else if (document) {
        await updateDocument(document.id, title, content)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to save document:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // Auto-save when content changes (with improved debounce)
  useEffect(() => {
    if (isNew || !document) return

    // Track if content has changed from the original
    const hasChanges = title !== document.title || content !== document.content

    if (!hasChanges) return

    // Increase debounce time to 2 seconds to reduce frequency of saves
    const timer = setTimeout(() => {
      console.log("Auto-saving changes...")
      updateDocument(document.id, title, content)
    }, 2000)

    return () => clearTimeout(timer)
  }, [title, content, isNew, document])

  return (
    <div className="container py-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isNew ? "New Document" : "Edit Document"}</h1>
        </div>
        <Button onClick={handleSave} disabled={isSaving || !title}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="p-2 mb-2 text-sm font-medium text-muted-foreground">Editor</div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your markdown here..."
            className="flex-1 min-h-[500px] font-mono text-sm resize-none"
          />
        </div>

        <div className="flex flex-col">
          <div className="p-2 mb-2 text-sm font-medium text-muted-foreground">Preview</div>
          <div className="flex-1 p-4 overflow-auto border rounded-md min-h-[500px]">
            <MarkdownPreview content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}
