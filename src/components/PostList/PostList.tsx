import React from "react";
import { IPost } from "./../../types/types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Card } from "react-bootstrap";

export interface PostListProps {
  posts: IPost[]
}



export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      <Container>
        <Row xs={1} sm={1} md={1} xl={1}>
          {posts.map((post, i) => {
            return (
              <Col key={post.id + i}>
                <Card>
                  <Card.Header>Posted by {post.creator.name}</Card.Header>
                  <Card.Body className="card-body">
                    <Image src={post.imgUrl} rounded />
                    <Card.Text>
                      {post.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

