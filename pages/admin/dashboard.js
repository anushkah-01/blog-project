import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/posts").then((res) => setPosts(res.data));
  }, []);

  const handleDelete = async (slug) => {
    await axios.delete(`/api/posts/${slug}`);
    setPosts(posts.filter((p) => p.slug !== slug));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {posts.map((post) => (
        <div key={post.slug}>
          <h3>{post.title}</h3>
          <Link href={`/${post.slug}`}>View</Link>
          <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
          <button onClick={() => handleDelete(post.slug)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
