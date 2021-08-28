import React from "react";
import Collapse from 'react-bootstrap/Collapse';
import "./Feed.css";
import ImageLoader from './../../components/ImageLoader/ImageLoader';
import useImageLoader from './../../components/ImageLoader/useImageLoader';
import Button from 'react-bootstrap/Button';
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import usePostList from "../../components/PostList/usePostList";
import PostList from "../../components/PostList/PostList";



export default function Feed() {

  const [showCreatePost, setImageUpload] = useState(false);

  function handleCollapse(toggle: boolean) {
    setImageUpload(toggle);
  }

  const imagesLoaderProps = useImageLoader({ onShowImageLoader: handleCollapse });

  const postListProps = usePostList(imagesLoaderProps.createdImage);

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
      <PostList {...postListProps} />
    </Layout >
  )
} 