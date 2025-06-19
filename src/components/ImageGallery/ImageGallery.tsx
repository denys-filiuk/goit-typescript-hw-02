import css from "./ImageGallery.module.css";
import ImageCards from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCards
            src={image.urls.small}
            alt={image.description}
            image={image}
            onClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}
