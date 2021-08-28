import { useState, useEffect } from "react";
import { IImageLoaderProps, IValue, IImagaController } from "./ImageLoader";
import { getHamburgerImages, createPostWithImage } from "./../../api/imageAPI/imageAPI";
import { IPost } from "./../../types/types";



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
    setValue({ ...value });
  };

  const onSelect = (id: string) => {
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
    return imageController.find((image) => image.selected) && value.description !== "";
  }

  const onCancel = () => {
    onShowImageLoader(false);
    clearImageSelection();
    setValue({ description: "" })
  }

  const onSubmit = async () => {
    if (!isValid()) return;

    const imageSelected = imageController.find((image) => image.selected);

    if (!imageSelected) return;

    const newPost: IPost = {
      id: imageSelected.id,
      imgUrl: imageSelected.imgUrl,
      description: value.description,
      timestamp: new Date().getTime(),
      creator: {
        id: 1,
        name: "user 1"
      }
    }

    await createPostWithImage(newPost);

    setCreatedImage(newPost);

    //clear the values 
    setValue({ description: "" })

    clearImageSelection();

    //hide the component 
    onShowImageLoader(false);
  }

  return {
    value,
    imageController,
    onSubmit,
    onCancel,
    onSelect,
    onChange,
    createdImage
  }

}