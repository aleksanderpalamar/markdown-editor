import { notFound } from "next/navigation"
import { Editor } from "@/components/editor"
import { getDocumentById } from "@/lib/actions"

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object before accessing its properties
  const { id } = await params

  // Handle "new" document creation
  if (id === "new") {
    return <Editor isNew={true} document={null} />
  }

  // Get existing document
  const document = await getDocumentById(id)

  if (!document) {
    notFound()
  }

  return <Editor isNew={false} document={document} />
}
