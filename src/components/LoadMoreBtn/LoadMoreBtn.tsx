interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button className="load-more-btn" onClick={onClick}>
      Load more
    </button>
  );
}
