/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { getAllRestaurants } from "../../api/restaurantsAPI/restaurantsAPI";
import { getAllReviews } from "../../api/reviewsAPI/reviewsAPI";
import { IRestaurant, IReview } from './../../types/types';
import { raitingCalulationHelper, IRaitingAverage } from './raitingCalulationHelper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PostCard from '../../components/PostCard/PostCard';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import useReviewForm from '../../components/ReviewForm/useReviewForm';
import "./Review.css";



export default function Review() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [raiting, setRaiting] = useState<IRaitingAverage>();
  const { id } = useParams<{ id: string }>();
  const reviewFormProp = useReviewForm({ restaurant });

  useEffect(() => {
    const fetch = async () => {

      const restaurants = (await getAllRestaurants()).map((item) => item.data)
        .filter((restaurant) => restaurant.id === Number(id));

      if (restaurants.length > 0) {
        const pickedRestaurant = restaurants[0];
        setRestaurant(pickedRestaurant);
      }


      const reviews = (await getAllReviews()).map((item) => item.data)
        .filter((review) => review.restaurant.id === Number(id))
        .sort((a, b) => b.timestamp - a.timestamp);

      setReviews(reviews);
      setRaiting(raitingCalulationHelper({ reviews }).raitingScore);
    }

    fetch();
  }, [])

  //optimistic update
  useEffect(() => {
    if (reviewFormProp.createdReview) {
      const optimisticReview = [...reviews, ...[reviewFormProp.createdReview]]
        .sort((a, b) => b.timestamp - a.timestamp);
      setReviews(optimisticReview);
    }

  }, [reviewFormProp.createdReview])




  return (
    <Layout defaultPageTitle={`Review ${restaurant?.name} for Fantastic Burger community`}>
      <div className="restaurant-raiting">
        <h2>We love your oppinion ... 🤥  </h2>
      </div>
      <div>
        <h3>{`${restaurant?.name} has ${reviews?.length} reviews`} </h3>
        <div className="review-restaurant-container">
          <div>{`Texture: ${raiting?.texture} ⭐️`}</div>
          <div>{`Taste: ${raiting?.texture} ⭐️`}</div>
          <div>{`Presentation: ${raiting?.presentation} ⭐️`}</div>
        </div>
      </div>
      <Container>
        <Row>
          <ReviewForm {...reviewFormProp} />
        </Row>
        <Row>
          {
            reviews?.map((review) => (
              <div key={review.id}>
                <PostCard
                  title={`reviewed by ${review.user.name}`}
                  description={review.description}
                  image="https://picsum.photos/200/300/?blur"
                  footerText={` texture: ${review.ratings.texture} 🍔 of 5
                | taste: ${review.ratings.taste} 🍔 of 5
                | presentation: ${review.ratings.presentation} 🍔 of 5`}
                />
              </div>

            ))
          }
        </Row>
      </Container>

    </Layout>
  )
}