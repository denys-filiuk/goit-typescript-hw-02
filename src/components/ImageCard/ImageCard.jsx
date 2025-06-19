import { FaSearchPlus } from "react-icons/fa";
import css from "./ImageCard.module.css";

export default function ImageCards({ src, alt, image, onClick }) {
  return (
    <div onClick={() => onClick(image)} className={css.card}>
      <img className={css.image} src={src} alt={alt} />
      <div className={css.magnifierIcon}>
        <FaSearchPlus />
      </div>
    </div>
  );
}
