import axios from 'axios';
import { EImageTerms } from './../../types/types';

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