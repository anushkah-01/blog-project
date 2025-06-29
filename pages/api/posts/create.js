import { connectDB } from "@/utils/db";
import Post from "@/models/Post";
import slugify from "slugify";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Missing fields" });

    await connectDB();
    const slug = slugify(title, { lower: true });
    try {
      const newPost = await Post.create({ title, content, slug });
      return res.status(201).json(newPost);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create post" });
    }
  }
}
