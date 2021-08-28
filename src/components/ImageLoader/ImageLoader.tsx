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
  loading: boolean;
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
  imageFile?: any;
}

export default function ImageLoader({
  onChange,
  onSubmit,
  imageController,
  onSelect,
  value,
  onCancel,
  loading }: IImageLoaderProps) {

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {

    onChange({
      ...value,
      [target.name]:
        target &&
          target.files
          ? target.files[0] : target.value
    });
  }

  return (
    <Form className="form">
      <Container>
      <Row>
          <Col className="mb-30">
            <Form.Label className="mb-30"><h2><b>Upload your hamburger</b></h2></Form.Label>
            <Form.Control type="file" name="imageFile" onChange={handleChange} />
          </Col>
        </Row>
        <Row>
          <Col className="mb-30">
            <Form.Control name="description" value={value.description} onChange={handleChange} placeholder="Write something" />
          </Col>
        </Row>
        <Row>
          <Col className="pick-image-text"><h4>You can also select one picture from thease restaurant ; )</h4></Col>
      </Row>
      <Row lg={4} md={3} sm={1} xs={1}>
        {imageController.map((image) => {
          return (
            <Col className="image-controller-card-image" key={image.id}>
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
      </Container>
      <div className="buttons">
        <Button
          variant="primary"
          disabled={loading}
          onClick={onSubmit}>
          {loading ? 'Loading...' : 'Publish'}
        </Button>
        <Button
          variant="secondary"
          disabled={loading}
          onClick={onCancel}>
          Cancel
        </Button>
          </div>
    </Form>
  )
}