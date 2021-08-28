import axios from 'axios';
import { EImageTerms, IPost, IGetAllPostResult } from './../../types/types';
import { client, q } from '../faunaDB';

export async function getHamburgerImages() {

  try {
    const response: { data: { results: any[] } } = await axios.get(
      `https://api.unsplash.com/search/photos/?query=${EImageTerms.HAMBURGER}&client_id=${process.env.REACT_APP_UNSPLASH_TOKEN}`
    );

    const images = response.data.results.map((image) => ({ id: image.id, url: image.urls.small }));

    return images

  } catch (error) {
    return {
      hasError: true,
      message: "Sorry the images are not available"
    }
  }
}

export async function createPostWithImage(post: IPost) {
  try {
    const created: { data: IPost } = await client.query(q.Create(q.Ref("classes/Posts"), { data: post }));

    return created.data;

  } catch (error) {
    return {
      hasError: true,
      message: "something went wrong"
    }
  }
}

export async function getAllPosts() {
  try {
    const posts: { data: any[] } = await client.query(q.Paginate(q.Match(q.Index("all_post"))));

    const postRef = posts.data;

    const getAllDataQuery = postRef.map((ref) => q.Get(ref));

    const result: IGetAllPostResult[] = await client.query(getAllDataQuery);

    return result;

  } catch (error) {
    return []
  }
}
