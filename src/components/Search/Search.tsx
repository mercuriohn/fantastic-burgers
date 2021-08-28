import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import "./Search.css";

export interface ISearchProps {
  term: string;
  onChange: (term: string) => void;
  onSearch: (zipCode: string) => void;
}


export default function Search({ term, onChange, onSearch }: ISearchProps) {

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {

    onChange(target.value);
  }

  return (
    <div className="search-container">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Write a zip code I recommend you either 8260 or 1010"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={term}
          name="term"
          onChange={handleChange}
        />
        <Button variant="outline-secondary" onClick={() => onSearch(term)} id="button-addon2">
          Search
        </Button>
      </InputGroup>
    </div>
  )
}