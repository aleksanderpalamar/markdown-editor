"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function getDocuments() {
    return prisma.document.findMany({
        orderBy: {
            updatedAt: "desc",
        },
    })
}

export async function getDocumentById(id: string) {
    return prisma.document.findUnique({
        where: { id },
    })
}

export async function createDocument(title: string, content: string) {
    const document = await prisma.document.create({
        data: {
            title,
            content,
        },
    })

    revalidatePath("/");
    return document;
}

export async function updateDocument(id: string, title: string, content: string) {
    const document = await prisma.document.update({
        where: { id },
        data: {
            title,
            content,
            updatedAt: new Date(),
        },
    })

    revalidatePath("/");
    revalidatePath(`/editor/${id}`);
    return document;
}

export async function deleteDocument(id: string) {
    await prisma.document.delete({
        where: { id },
    })

    revalidatePath("/");
}