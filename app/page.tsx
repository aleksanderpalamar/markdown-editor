import { DocumentList } from "@/components/document-list";
import { getDocuments } from "@/lib/actions";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const documents = await getDocuments();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Markdown Editor</h1>
        <Link href="/editor/new" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          <Plus className="h-6 w-6 mr-2" />
          New Document
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center
        border rounded-lg">
          <h3 className="mb-2 text-xl font-medium">No documents yet</h3>
          <p className="mb-4 text-zinc-500">Create your first Markdown document to get started.</p>
          <Link href="/editor/new" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            <Plus className="h-6 w-6 mr-2" />
            <span>Create New Document</span>
          </Link>
        </div>
      ): (
        <DocumentList documents={documents} />
      )}
    </div>
  );
}
