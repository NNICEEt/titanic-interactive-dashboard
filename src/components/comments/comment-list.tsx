import React from "react";
import { type Comment } from "./comment-section";
import CommentItem from "./comment-item";

interface CommentListProps {
  comments: Comment[];
  onUpdateComment: (id: string, content: string) => void;
  onDeleteComment: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onUpdateComment,
  onDeleteComment,
}) => {
  const reversedComments = [...comments].reverse();

  return (
    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
      {reversedComments.length > 0 ? (
        reversedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpdateComment={onUpdateComment}
            onDeleteComment={onDeleteComment}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">ยังไม่มีความคิดเห็น</p>
      )}
    </div>
  );
};

export default CommentList;
