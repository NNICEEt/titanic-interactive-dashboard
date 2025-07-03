import React, { useState } from "react";

interface Comment {
  id: string;
  text: string;
}

interface CommentSectionProps {
  storageKey: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ storageKey }) => {
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

  return (
    <div className="mt-2">
      <h3 className="font-medium mb-1">Comments</h3>
      <div className="flex flex-col gap-2">
        {comments.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            {editingId === c.id ? (
              <>
                <input
                  className="border px-2 py-1 rounded flex-1"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(c.id);
                  }}
                  autoFocus
                />
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => saveEdit(c.id)}
                >
                  Save
                </button>
                <button
                  className="text-gray-400 hover:underline"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{c.text}</span>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => startEdit(c.id, c.text)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteComment(c.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
        <div className="flex gap-2 mt-1">
          <input
            className="border px-2 py-1 rounded flex-1"
            placeholder="+ Add New Comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addComment();
            }}
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={addComment}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
