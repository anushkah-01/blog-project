import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("blog");
  const collection = db.collection("posts");

  if (req.method === 'GET') {
    const posts = await collection.find({}).toArray();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content, slug } = req.body;
    const result = await collection.insertOne({ title, content, slug, createdAt: new Date() });
    res.status(201).json(result);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

