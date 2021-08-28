import { useState, useEffect } from "react";
import { PostListProps } from "./PostList";
import { IPost, IGetAllPostResult } from "./../../types/types";
import { getAllPosts } from "./../../api/imageAPI/imageAPI";


export default function usePostList(newPost?: IPost): PostListProps {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts: IGetAllPostResult[] = await getAllPosts();
      const postsDesc = posts.map((post) => (post.data)).sort((a, b) => b.timestamp - a.timestamp);
      setPosts(postsDesc);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    if (newPost) {
      const updatePost = [...posts].concat(newPost).sort((a, b) => b.timestamp - a.timestamp);
      setPosts(updatePost);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost])

  useEffect(() => {

  }, [posts])


  return {
    posts
  }
}