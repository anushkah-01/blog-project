import clientPromise from '@/lib/mongodb';

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('blog');
  const post = await db.collection('posts').findOne({ slug: context.params.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt.toString(),
      },
    },
  };
}

export default function PostPage({ post }) {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}
