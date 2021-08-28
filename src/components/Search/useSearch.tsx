
import { useState } from "react";

export interface useSearchResult {
  term: string;
  onChange: (term: string) => void;
  onSearch: (zipCode: string) => void;
}

export default function useSearch(): useSearchResult {
  const [term, setTerm] = useState<string>("");

  const onChange = (term: string) => {
    setTerm(term);
  }

  const onSearch = (zipCode: string) => {

    if (!zipCode) return;

    window.location.href = `/search/${zipCode}`;
  }

  return {
    term,
    onChange,
    onSearch
  }
}
