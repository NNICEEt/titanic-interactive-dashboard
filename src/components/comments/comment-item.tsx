import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { type Comment } from "./comment-section";

interface CommentItemProps {
  comment: Comment;
  onUpdateComment: (id: string, content: string) => void;
  onDeleteComment: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onUpdateComment,
  onDeleteComment,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdateComment(comment.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content); // Reset content on cancel
  };

  return (
    <div className="p-2 border rounded space-y-2">
      {isEditing ? (
        <div className="space-y-2">
          <p className="font-semibold">{comment.author}</p>
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full"
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              บันทึก
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              ยกเลิก
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-semibold">{comment.author}</p>
          <p className="break-words whitespace-pre-wrap">{comment.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              แก้ไข
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDeleteComment(comment.id)}
            >
              ลบ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
