import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { useState, useEffect, useRef } from "react";
import searchRequest from "./api";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [imageCards, setImageCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const galleryRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const loadImages = async (searchQuery, pageNumber) => {
    if (searchQuery.trim() === "") return;

    setIsLoading(true);
    setError(null);
    setIsEmpty(false);

    try {
      const { results, totalPages } = await searchRequest(
        searchQuery,
        pageNumber
      );
      setTotalPages(totalPages);

      if (results.length === 0) {
        setIsEmpty(true);
      } else {
        setImageCards((prevImages) =>
          pageNumber === 1 ? results : [...prevImages, ...results]
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      loadImages(query, page);
    }
  }, [query, page]);

  useEffect(() => {
    if (page > 1 && galleryRef.current) {
      const { bottom } = galleryRef.current.getBoundingClientRect();
      window.scrollBy({
        top: bottom - window.innerHeight + 100,
        behavior: "smooth",
      });
    }
  }, [imageCards]);

  const handleSearch = (newTopic) => {
    setQuery(newTopic);
    setPage(1);
    setImageCards([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const shouldShowLoadMore =
    imageCards.length > 0 && page < totalPages && !isLoading;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {isEmpty && <p className="empty-message">No results found.</p>}
      {imageCards.length > 0 && (
        <>
          <div ref={galleryRef}>
            <ImageGallery images={imageCards} onImageClick={openModal} />
          </div>
          {isLoading && <Loader />}
          {shouldShowLoadMore && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
      {imageCards.length === 0 && isLoading && <Loader />}
    </>
  );
}
