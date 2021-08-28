import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import "./Feed.css";
import ImageLoader from './../../components/ImageLoader/ImageLoader';
import useImageLoader from './../../components/ImageLoader/useImageLoader';
import Button from 'react-bootstrap/Button';
import Layout from "../../components/Layout/Layout";
import { useState } from "react";





export default function Feed() {

  const [showCreatePost, setImageUpload] = useState(false);

  function handleCollapse(toggle: boolean) {
    setImageUpload(toggle);
  }

  const imagesLoaderProps = useImageLoader({ onShowImageLoader: handleCollapse });

  return (
    <Layout defaultPageTitle="Fantastic Burger">
      <div className="menu">
        <div className="menu-container white-background">
          <Button
            variant="outline-dark"
            disabled={showCreatePost}
            size="lg"
            onClick={() => handleCollapse(true)}>
            Share your burger
          </Button>
        </div>
      </div>
      <Collapse in={showCreatePost}>
        <div>
          <ImageLoader {...imagesLoaderProps} />
        </div>
      </Collapse>
    </Layout >
  )
} 