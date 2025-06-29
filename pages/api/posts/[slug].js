import { connectDB } from "@/utils/db";
import Post from "@/models/Post";

export default async function handler(req, res) {
  const { slug } = req.query;
  await connectDB();

  if (req.method === "GET") {
    const post = await Post.findOne({ slug });
    return post ? res.status(200).json(post) : res.status(404).json({ error: "Not found" });
  }

  if (req.method === "PUT") {
    const { title, content } = req.body;
    const newSlug = title ? slugify(title, { lower: true }) : slug;
    const post = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: newSlug },
      { new: true }
    );
    return res.status(200).json(post);
  }

  if (req.method === "DELETE") {
    await Post.deleteOne({ slug });
    return res.status(204).end();
  }
}
