import { useState } from "react";
import Editor from "@/components/Editor";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/posts/create", { title, content });
      alert("Post created");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <Editor value={content} onChange={setContent} />
      <button onClick={handleSubmit}>Create Post</button>
    </div>
  );
}
        