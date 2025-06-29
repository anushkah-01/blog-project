import axios from "axios";

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await axios.get(`http://localhost:3000/api/posts/${slug}`);
  return { props: { post: res.data } };
}

export default function PostPage({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
