import "./App.css";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import searchRequest from "./api";
import { UnsplashImage } from "./types";

export default function App() {
  const [imageCards, setImageCards] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );

  const openModal = (image: UnsplashImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const loadImages = async (
    searchQuery: string,
    pageNumber: number
  ): Promise<void> => {
    if (searchQuery.trim() === "") return;

    setIsLoading(true);
    setError(null);
    setIsEmpty(false);

    try {
      const { results, total_pages } = await searchRequest(
        searchQuery,
        pageNumber
      );
      setTotalPages(total_pages);

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

  const handleSearch = (newTopic: string): void => {
    setQuery(newTopic);
    setPage(1);
    setImageCards([]);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const shouldShowLoadMore: boolean =
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
