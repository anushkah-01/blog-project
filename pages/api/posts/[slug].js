import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("blog");
  const collection = db.collection("posts");
  const { slug } = req.query;

  if (req.method === 'DELETE') {
    const result = await collection.deleteOne({ slug });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Post deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Post not found.' });
    }
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const result = await collection.updateOne({ slug }, { $set: { title, content } });
    res.status(200).json(result);
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

