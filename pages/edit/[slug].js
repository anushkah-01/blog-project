import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '@/lib/mongodb';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('blog');
  const post = await db.collection('posts').findOne({ slug: context.params.slug });
  if (!post) return { notFound: true };

  return {
    props: {
      post: {
        slug: post.slug,
        title: post.title,
        content: post.content,
      },
    },
  };
}

export default function EditPost({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleUpdate = async () => {
    await fetch(`/api/posts/${post.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <input
        className="border p-2 w-full mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} className="mb-4" />
      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
