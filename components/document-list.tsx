import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Document } from "@prisma/client";
import { DeleteDocumentButton } from "./delete-document-button";

export function DocumentList({ documents }: { documents: Document[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{doc.title}</CardTitle>
              <DeleteDocumentButton id={doc.id} />
            </div>
            <CardDescription>
              Last updated {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <Link href={`/editor/${doc.id}`}>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    )
}