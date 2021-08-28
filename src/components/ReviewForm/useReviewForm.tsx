import { useState } from "react";
import { IRestaurant, IReview } from "../../types/types";
import { createReview } from "../../api/reviewsAPI/reviewsAPI";

export interface IUseReviewFormResult {
  value: IValue;
  onChange: (value: IValue) => void;
  onSubmit: () => void;
  createdReview?: IReview;
  loading: boolean;
}

export interface IUseReviewFormParams {
  restaurant?: IRestaurant;
}

export interface IValue {
  texture: number;
  taste: number;
  presentation: number;
  description: string;
}

const defaultValue = {
  texture: 1,
  taste: 1,
  presentation: 1,
  description: ""
}

export default function useReviewForm({ restaurant }: IUseReviewFormParams): IUseReviewFormResult {
  const [value, setValue] = useState<IValue>(defaultValue);
  const [createdReview, setCreatedReview] = useState<IReview>();
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (value: IValue) => {
    setValue({
      ...value
    })
  }


  const onSubmit = async () => {
    setLoading(true);
    const review: IReview = {
      id: Math.floor(Math.random() * Date.now()),
      timestamp: new Date().getTime(),
      ratings: {
        texture: value!.texture,
        taste: value!.taste,
        presentation: value!.presentation
      },
      user: {
        id: Math.floor(Math.random() * Date.now()),
        name: "some user"
      },
      description: value!.description,
      restaurant: {
        id: restaurant!.id,
        name: restaurant!.name
      },
      date: ""
    }

    await createReview(review);
    setCreatedReview(review);
    setLoading(false);
    setValue(defaultValue);

  }

  return {
    value,
    onSubmit,
    onChange,
    createdReview,
    loading
  }
}