import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = async (slug) => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    setPosts(posts.filter(post => post.slug !== slug));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      <Link href="/create">
        <button className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + New Post
        </button>
      </Link>
      {posts.map(post => (
        <div key={post._id} className="mb-6 p-4 border rounded">
          <Link href={`/post/${post.slug}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
          </Link>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          <div className="mt-2 flex gap-4">
            <Link href={`/edit/${post.slug}`}>
              <button className="text-blue-600 underline">Edit</button>
            </Link>
            <button
              className="text-red-500 underline"
              onClick={() => handleDelete(post.slug)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}