import React from "react";
import { IPost } from "./../../types/types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./PostList.css";
import PostCard from "../PostCard/PostCard";

export interface PostListProps {
  posts: IPost[]
}



export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      <Container>
        <Row xs={1} sm={1} md={1} xl={1}>
          {posts.map((post) => {
            return (
              <PostCard key={post.id}
                title={`Posted by ${post.creator.name}`}
                image={post.imgUrl}
                description={post.description} />
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

