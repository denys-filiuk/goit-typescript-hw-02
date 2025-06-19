import { FaSearchPlus } from "react-icons/fa";
import css from "./ImageCard.module.css";
import { UnsplashImage } from "../../types";

interface ImageCardsProps {
  src: string;
  alt: string | null;
  image: UnsplashImage;
  onClick: (image: UnsplashImage) => void;
}

export default function ImageCards({
  src,
  alt,
  image,
  onClick,
}: ImageCardsProps) {
  return (
    <div onClick={() => onClick(image)} className={css.card}>
      <img className={css.image} src={src} alt={alt || "Image"} />
      <div className={css.magnifierIcon}>
        <FaSearchPlus />
      </div>
    </div>
  );
}
