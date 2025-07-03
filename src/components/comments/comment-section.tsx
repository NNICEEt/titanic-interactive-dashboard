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
import { Input } from "@/components/ui/input";
import useMediaQuery from "@/hooks/use-media-query";

interface Comment {
  id: string;
  text: string;
}

interface CommentSectionProps {
  storageKey: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ storageKey }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem(storageKey, JSON.stringify(newComments));
  };

  const addComment = () => {
    if (input.trim()) {
      const newComments = [
        ...comments,
        { id: Date.now().toString(), text: input.trim() },
      ];
      saveComments(newComments);
      setInput("");
    }
  };

  const deleteComment = (id: string) => {
    const newComments = comments.filter((c) => c.id !== id);
    saveComments(newComments);
  };

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditInput(text);
  };

  const saveEdit = (id: string) => {
    const newComments = comments.map((c) =>
      c.id === id ? { ...c, text: editInput } : c
    );
    saveComments(newComments);
    setEditingId(null);
    setEditInput("");
  };

  const commentCount = comments.length;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link">ความคิดเห็น ({commentCount})</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ความคิดเห็น</DialogTitle>
            <DialogDescription>
              เพิ่ม, แก้ไข, หรือลบความคิดเห็นสำหรับแผนภูมินี้
            </DialogDescription>
          </DialogHeader>
          <CommentForm
            comments={comments}
            editingId={editingId}
            editInput={editInput}
            setEditInput={setEditInput}
            startEdit={startEdit}
            saveEdit={saveEdit}
            deleteComment={deleteComment}
            setEditingId={setEditingId}
            input={input}
            setInput={setInput}
            addComment={addComment}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link">ความคิดเห็น ({commentCount})</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>ความคิดเห็น</DrawerTitle>
          <DrawerDescription>
            เพิ่ม, แก้ไข, หรือลบความคิดเห็นสำหรับแผนภูมินี้
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <CommentForm
            comments={comments}
            editingId={editingId}
            editInput={editInput}
            setEditInput={setEditInput}
            startEdit={startEdit}
            saveEdit={saveEdit}
            deleteComment={deleteComment}
            setEditingId={setEditingId}
            input={input}
            setInput={setInput}
            addComment={addComment}
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">ยกเลิก</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function CommentForm({
  comments,
  editingId,
  editInput,
  setEditInput,
  startEdit,
  saveEdit,
  deleteComment,
  setEditingId,
  input,
  setInput,
  addComment,
}: {
  comments: Comment[];
  editingId: string | null;
  editInput: string;
  setEditInput: (value: string) => void;
  startEdit: (id: string, text: string) => void;
  saveEdit: (id: string) => void;
  deleteComment: (id: string) => void;
  setEditingId: (id: string | null) => void;
  input: string;
  setInput: (value: string) => void;
  addComment: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-4 h-[400px]">
      <div className="flex-grow overflow-y-auto pr-4 space-y-4">
        {comments.length === 0 && (
          <p className="text-center text-gray-500">ยังไม่มีความคิดเห็น</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between">
            {editingId === comment.id ? (
              <>
                <Input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="flex-grow mr-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(comment.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  autoFocus
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button onClick={() => saveEdit(comment.id)}>บันทึก</Button>
                  <Button variant="ghost" onClick={() => setEditingId(null)}>
                    ยกเลิก
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="flex-grow mr-4 break-all">{comment.text}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(comment.id, comment.text)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteComment(comment.id)}
                  >
                    ลบ
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex-shrink-0 flex w-full items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="เพิ่มความคิดเห็นใหม่..."
          disabled={editingId !== null}
          onKeyDown={(e) => {
            if (e.key === "Enter") addComment();
          }}
        />
        <Button onClick={addComment} disabled={editingId !== null}>
          เพิ่ม
        </Button>
      </div>
    </div>
  );
}

export default CommentSection;
