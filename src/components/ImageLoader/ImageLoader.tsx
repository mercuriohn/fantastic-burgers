import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import "./ImageLoader.css";

export interface IImageLoaderProps {
  onChange: (value: IValue) => void;
  onSubmit: () => void;
  onSelect: (id: string) => void;
  onCancel: () => void;
  value: IValue;
  imageController: IImagaController[];
}

export interface IImagaController {
  id: string;
  imgUrl: string;
  selected: boolean;
  disabled: boolean;
}

export interface IValue {
  description: string;
}

export default function ImageLoader({ onChange, onSubmit, imageController, onSelect, value, onCancel }: IImageLoaderProps) {

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      ...value,
      [target.name]: target.value
    });
  }

  return (
    <Container>
      <Row>
        <Col><h3>Soon you will be able to upload your own picture, but for now pick one from here</h3></Col>
      </Row>
      <Row lg={4} md={3} sm={1} xs={1}>
        {imageController.map((image) => {
          return (
            <Col className="card-image" key={image.id}>
              <Card
                border={image.selected ? "primary" : undefined}
                bg={image.selected ? "primary" : undefined}
              >
                <Card.Img variant="top" className="image-res"  src={image.imgUrl} />
                <Card.Body>
                  <Button
                    variant="outline-success"
                    disabled={image.disabled}
                    key={image.id}
                    onClick={() => onSelect(image.id)} >
                    Bite me
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
      <Row>
        <Form className="form">
          <Row>
            <Col>
              <Form.Control name="description" value={value.description} onChange={handleChange} placeholder="Write something" />
            </Col>
          </Row>
          <div className="buttons">
            <Button variant="primary" onClick={onSubmit}>Publish</Button>
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          </div>
        </Form>
      </Row>
    </Container>
  )
}