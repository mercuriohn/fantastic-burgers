/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import "./Search.css";
import { IGetAllRestaurants, IRestaurant } from './../../types/types';
import { getAllRestaurants } from './../../api/restaurantsAPI/restaurantsAPI';
import PostCard from './../../components/PostCard/PostCard';

export default function Search() {

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  const { zipcode } = useParams<{ zipcode: string }>();


  useEffect(() => {
    const fetchRestaurants = async () => {
      const response: IGetAllRestaurants[] = await getAllRestaurants();

      const restaurantList = response.filter((restaurant) => restaurant.data.zipCode === zipcode)
        .map((item) => item.data);

      setRestaurants(restaurantList);
    }

    fetchRestaurants();
  }, [])



  return (
    <Layout defaultPageTitle="Fantastic Burger">
      <Container>
        <Row className="header">
          <h1>
            {restaurants.length ? `Thease are the restaurants with burgers close to ${zipcode}` :
              `Seems like you need to open a restaurant with burgers, no places were found`}
          </h1>
        </Row>
        <Row>
          {
            restaurants.map((restaurant) => (
              <Link to={`/restaurant/${restaurant.id}`}>
                <PostCard
                  footerText="Click and write a review"
                  key={restaurant.id}
                  title={restaurant.name}
                  image="https://firebasestorage.googleapis.com/v0/b/fantastic-bg.appspot.com/o/images%2Ffoto%20funny.jpeg?alt=media"
                  description={restaurant.street}
                />
              </Link>
            ))
          }
        </Row>
      </Container>
    </Layout>
  )
}