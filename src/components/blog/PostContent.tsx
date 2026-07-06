import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PostContentProps = {
  content: string;
};

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose-impact max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
