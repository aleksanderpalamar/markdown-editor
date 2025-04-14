"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { cn } from "@/lib/utils";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  const renderedContent = useMemo(() => {
    return content || "Nothing to preview";
  }, [content]);

  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, className, children, ...props }) => (
            <h1
              className="text-3xl font-bold mt-6 mb-4 pb-2 border-b"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ node, className, children, ...props }) => (
            <h2
              className="text-2xl font-bold mt-5 mb-3 pb-1 border-b"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ node, className, children, ...props }) => (
            <h3 className="text-xl font-bold mt-4 mb-2" {...props}>
              {children}
            </h3>
          ),
          h4: ({ node, className, children, ...props }) => (
            <h4 className="text-lg font-bold mt-3 mb-1" {...props}>
              {children}
            </h4>
          ),
          p: ({ node, className, children, ...props }) => (
            <p className="my-3 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          strong: ({ node, className, children, ...props }) => (
            <strong className="font-bold" {...props}>
              {children}
            </strong>
          ),
          em: ({ node, className, children, ...props }) => (
            <em className="italic" {...props}>
              {children}
            </em>
          ),
          ul: ({ node, className, children, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ node, className, children, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ node, className, children, ...props }) => (
            <li className="pl-1 my-1" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ node, className, children, ...props }) => (
            <blockquote
              className="pl-4 border-l-4 border-gray-300 dark:border-gray-700 my-4 italic text-gray-700 dark:text-gray-300"
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children, node, ...props }) => {
            const isInline = !(className && /language-(\w+)/.test(className));
            const match = className ? /language-(\w+)/.exec(className) : null;

            return !isInline && match ? (
              <SyntaxHighlighter
                // @ts-ignore
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-4 text-sm"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {renderedContent}
      </ReactMarkdown>
    </div>
  );
}
