import React from "react";
import { Button, Form } from "react-bootstrap";
import "./ReviewForm.css";

export interface ReviewFormProp {
  value: IValue;
  onChange: (value: IValue) => void;
  onSubmit: () => void;
  loading: boolean;
}

export interface IValue {
  texture: number;
  taste: number;
  presentation: number;
  description: string;
}

export default function ReviewForm({ value, onChange, onSubmit, loading }: ReviewFormProp) {

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    onChange({
      ...value,
      [target.name]: target.value
    });
  }

  function handleSelectChange({ target }: React.ChangeEvent<HTMLSelectElement>) {
    onChange({
      ...value,
      [target.name]: target.value
    });
  }
  return (
    <Form className="review-form">
      <Form.Group className="mb-3">
        <Form.Label>Texture</Form.Label>
        <Form.Select name="texture" value={value.texture} onChange={handleSelectChange} aria-label="Floating label select example">
          <option>Rate the texture</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Taste</Form.Label>
        <Form.Select name="taste" onChange={handleSelectChange} value={value.taste} aria-label="Floating label select example">
          <option>Rate the taste</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Presentation</Form.Label>
        <Form.Select name="presentation" onChange={handleSelectChange} value={value.presentation} aria-label="Floating label select example">
          <option>Rate the presentation</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" value={value.description} onChange={handleChange} rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Button type="button" onClick={onSubmit} disabled={loading}>{loading ? 'Loading...' : 'save'}</Button>
      </Form.Group>

    </Form>
  )
}