import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  storageKey: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ storageKey }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedComments = localStorage.getItem(storageKey);
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleAddComment = (comment: Omit<Comment, "id">) => {
    const newComment = { ...comment, id: crypto.randomUUID() };
    const newComments = [...comments, newComment];
    setComments(newComments);
    localStorage.setItem(storageKey, JSON.stringify(newComments));
  };

  const handleDeleteComment = (id: string) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    setComments(newComments);
    localStorage.setItem(storageKey, JSON.stringify(newComments));
  };

  const handleUpdateComment = (id: string, content: string) => {
    const newComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: content } : comment
    );
    setComments(newComments);
    localStorage.setItem(storageKey, JSON.stringify(newComments));
  };

  const commentCount = comments.length;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="cursor-pointer">
            ความคิดเห็น ({commentCount})
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ความคิดเห็น</DialogTitle>
            <DialogDescription>แสดงความคิดเห็นของคุณที่นี่</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <CommentForm onAddComment={handleAddComment} />
            <CommentList
              comments={comments}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="cursor-pointer">
          ความคิดเห็น ({commentCount})
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ความคิดเห็น</DrawerTitle>
          <DrawerDescription>แสดงความคิดเห็นของคุณที่นี่</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <CommentForm onAddComment={handleAddComment} />
          <CommentList
            comments={comments}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">ปิด</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentSection;
