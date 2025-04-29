"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({currentPage, setCurrentPage, totalPages}: PaginationProps) {
  

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if total is less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  const pagesToShow = getPageNumbers();

  return (
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 bg-gray-950 text-white rounded disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page numbers */}
      {pagesToShow.map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="p-2 size-[36px] flex items-center justify-center bg-gray-950 text-white rounded"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => handlePageChange(Number(page))}
            className={`p-2 w-[36px] cursor-pointer text-sm flex items-center justify-center rounded text-white ${currentPage === page ? "bg-blue-500" : "bg-gray-950"}`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 bg-gray-950 text-white rounded disabled:opacity-50 cursor-pointer flex items-center justify-center"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
