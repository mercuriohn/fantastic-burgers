import { useState, useEffect } from "react";
import { IImageLoaderProps, IValue, IImagaController } from "./ImageLoader";
import { getHamburgerImages } from "./../../api/imageAPI/imageAPI";



export interface IUserImageLoaderParameters {
  onShowImageLoader: (toggle: boolean) => void;
}

interface images {
  id: string;
  url: string;
}
export type useImageLoaderResult = IImageLoaderProps;

export default function useImageLoader({ onShowImageLoader }: IUserImageLoaderParameters): useImageLoaderResult {
  const [value, setValue] = useState<IValue>({ description: "" });
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

  const onSubmit = () => {
    if (!isValid()) return;
    console.log("This is the image", value, imageController);
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
    onChange
  }

}