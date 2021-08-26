import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Feed.css";
import { getAllReviews, createReview } from './../../api/reviewsAPI/reviewsAPI';
import Button from 'react-bootstrap/Button';



export default function Feed() {

  async function addReview() {
    const review = {
      id: 2,
      description: "awesome",
      ratings: {
        "texture": 2,
        "taste": 2,
        "presentation": 2
      },
      user: {
        "id": 1,
        "name": "oscar"
      },
      restaurant: {
        "id": 1,
        "name": "Burger Concept"
      },
      date: "2021-02-02",
      timestamp: 1629996868
    }

    const r = await createReview(review);

    console.log("created r", r);


  }

  useEffect(() => {
    getAllReviews().then((response) => {
      console.log(response);
    })

  }, []);

  return (
    <>
      <h1>FEED PAGE</h1>
      <Link to="/restaurants">Go To Restaurants</Link>
      <Button onClick={addReview}>Add Review </Button>

      <Container>
        <Row>
          <Col xs={12} md={6} className="green-background">1 of 2</Col>
          <Col xs={12} md={6} className="red-background">2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3 {process.env.REACT_APP_NOT_SECRET_CODE}</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>

    </>
  )
} 