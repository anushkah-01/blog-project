import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection('posts');

  if (req.method === 'POST') {
    const { title, summary, content } = req.body;
    const result = await collection.insertOne({ title, summary, content });
    return res.status(201).json(result);
  }

  if (req.method === 'GET') {
    const posts = await collection.find({}).toArray();
    return res.status(200).json(posts);
  }
}
