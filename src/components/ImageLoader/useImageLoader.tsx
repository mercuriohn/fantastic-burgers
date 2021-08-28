import { useState, useEffect } from "react";
import { IImageLoaderProps, IValue, IImagaController } from "./ImageLoader";
import { getHamburgerImages, createPostWithImage } from "./../../api/imageAPI/imageAPI";
import { IPost } from "./../../types/types";
import storage from "../../api/firebaseSTORAGE";
import { v4 as uuidv4 } from 'uuid';



export interface IUserImageLoaderParameters {
  onShowImageLoader: (toggle: boolean) => void;
}

interface images {
  id: string;
  url: string;
}
export interface useImageLoaderResult extends IImageLoaderProps {
  createdImage?: IPost
}

export default function useImageLoader({ onShowImageLoader }: IUserImageLoaderParameters): useImageLoaderResult {
  const [value, setValue] = useState<IValue>({ description: "" });
  const [createdImage, setCreatedImage] = useState<IPost>();
  const [imageController, setImageControler] = useState<IImagaController[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getHamburgerImages();

      if ('hasError' in images === false) {
        const imgController = (images as images[]).map((image) => ({
          id: image.id,
          imgUrl: image.url,
          selected: false,
          disabled: false
        })).slice(0, 4);
        setImageControler(imgController);
      }
    }

    fetchImages();

  }, []);

  const onChange = (value: IValue): void => {

    if (value.imageFile) {
      setImageControler(
        imageController.map((image) => ({
          ...image,
          disabled: false,
          selected: false
        }))
      );
    }

    setValue({ ...value });
  };

  const onSelect = (id: string) => {

    setValue({
      ...value,
      imageFile: undefined
    })

    const newImageController = imageController.map((image) => {
      return {
        ...image,
        selected: image.id === id,
        disabled: true
      }
    })

    setImageControler(newImageController);
  }

  const clearImageSelection = () => {
    const newImageController = imageController.map((image) => {
      return {
        ...image,
        selected: false,
        disabled: false
      }
    })
    setImageControler(newImageController);
  }

  const isValid = () => {
    return (imageController.find((image) => image.selected) || value.imageFile);
  }

  const onCancel = () => {
    onShowImageLoader(false);
    clearImageSelection();
    setValue({ description: "", imageFile: undefined })
  }

  const createPostHelper = async (post: IPost) => {

    await createPostWithImage(post);

    setCreatedImage(post);

    //clear the values 
    setValue({ description: "", imageFile: undefined })

    clearImageSelection();

    //hide the component 
    onShowImageLoader(false);

    setLoading(false);

  }


  const onSubmit = async () => {
    if (!isValid()) return;

    setLoading(true);

    if (value.imageFile && value.imageFile.name) {
      const imageName = value.imageFile.name;

      storage.ref(`/images/${imageName}`).put(value.imageFile)

      const publicUrl = `${process.env.REACT_APP_FIREBASE_STORAGE_PARTIAL_LINK}${value.imageFile.name}?alt=media`;

      const newPost: IPost = {
        id: uuidv4(),
        imgUrl: publicUrl,
        description: value.description,
        timestamp: new Date().getTime(),
        creator: {
          id: 1,
          name: "user 1"
        }
      }

      setTimeout(() => {
        createPostHelper(newPost);
      }, 3000);

      return;
    }

    const imageSelected = imageController.find((image) => image.selected);

    const newPost: IPost = {
      id: uuidv4(),
      imgUrl: imageSelected!.imgUrl,
      description: value.description,
      timestamp: new Date().getTime(),
      creator: {
        id: 1,
        name: "user 1"
      }
    }

    createPostHelper(newPost);
  }

  return {
    value,
    imageController,
    onSubmit,
    onCancel,
    onSelect,
    onChange,
    createdImage,
    loading
  }

}