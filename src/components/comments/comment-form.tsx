import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { type Comment } from "./comment-section";

interface CommentFormProps {
  onAddComment: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (author.trim() && content.trim()) {
      onAddComment({
        id: Date.now(),
        author: author.trim(),
        content: content.trim(),
        timestamp: new Date().toISOString(),
      });
      setAuthor("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="ชื่อของคุณ"
        value={author}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAuthor(e.target.value)
        }
        required
      />
      <Textarea
        placeholder="แสดงความคิดเห็น..."
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        required
      />
      <Button type="submit">ส่งความคิดเห็น</Button>
    </form>
  );
};

export default CommentForm;
