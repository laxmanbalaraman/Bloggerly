import "./posts.css";
import Post from "../post/Post";

export default function Posts({ posts }) {
  console.log(posts);
  return (
    <>
      <div className="posts">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </>
  );
}
