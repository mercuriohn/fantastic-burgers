import React from "react";
import { Card } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./PostCard.css";

export interface IPostCardProps {
  title: string;
  image: string;
  description: string;
  footerText?: string;
}


export default function PostCard({ title, image, description, footerText }: IPostCardProps) {
  return (
    <Col className="no-decoration">
      <Card className="mb">
        <Card.Header>{title}</Card.Header>
        <Card.Body className="body-post-card">
          <div className="mr">
            <Image className="card-image" src={image} rounded={true} />
          </div>
          <Card.Text className="card-text">
            {description}
          </Card.Text>
        </Card.Body>
        {footerText && <Card.Footer className="post-card-footer">
          {footerText}
        </Card.Footer>}
      </Card>
    </Col>
  )
}