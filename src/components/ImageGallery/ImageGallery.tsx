import css from "./ImageGallery.module.css";
import ImageCards from "../ImageCard/ImageCard";
import { UnsplashImage } from "../../types";

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCards
            src={image.urls.small}
            alt={image.alt_description} // замінив description на alt_description, щоб відповідало типу
            image={image}
            onClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}
