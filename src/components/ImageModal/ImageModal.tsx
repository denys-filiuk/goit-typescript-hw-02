import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { UnsplashImage } from "../../types";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: UnsplashImage | null;
}

export default function ImageModal({
  isOpen,
  onRequestClose,
  image,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      {image && (
        <img src={image.urls.regular} alt={image.alt_description || "Image"} />
      )}
    </Modal>
  );
}
