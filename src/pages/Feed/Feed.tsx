import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





export default function Feed() {
  return (
    <>
      <h1>FEED PAGE</h1>
      <Link to="/restaurants">Go To Restaurants</Link>
      <Container>
        <Row>
          <Col xs={12} md={6} className="fee">1 of 2</Col>
          <Col xs={12} md={6} className="col-c">2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>

    </>
  )
} 