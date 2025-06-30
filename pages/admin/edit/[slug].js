import { useState, useEffect } from "react";
import Editor from '../../../components/Editor';
import { useRouter } from "next/router";
import axios from "axios";


export default function EditPost() {
  const { query } = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (query.slug) {
      axios.get(`/api/posts/${query.slug}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    }
  }, [query.slug]);

  const handleUpdate = async () => {
    await axios.put(`/api/posts/${query.slug}`, { title, content });
    alert("Post updated");
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Editor value={content} onChange={setContent} />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
}
