"use client";

import {fetchProducts} from "@/lib/fetch-products";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import ProductCard from "@/components/product-card";
import Pagination from "@/components/pagination";
import {useDebounce} from "@/hooks/use-debounce";

interface IProps {
  initialPage: number;
}

export default function ProductList({ initialPage }: IProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("desc");

  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, sortBy, orderBy, term],
    queryFn: () => fetchProducts({ currentPage, sortBy, orderBy, term }),
    placeholderData: (previousData) => previousData,
  });

  const products = data as any;

  // Product list content
  let content;

  if (term) {
    if (isLoading) {
      content = (
        <div className="w-full h-full flex items-center justify-center">
          Searching...
        </div>
      );
    } else if (!isLoading && isError) {
      content = (
        <div className="w-full h-full flex items-center justify-center">
          Searching error, please try again later.
        </div>
      );
    } else if (!isLoading && !isError && products?.data.length === 0) {
      content = (
        <div className="w-full h-full flex items-center justify-center">
          No products found with the search term: {term}
        </div>
      );
    } else {
      content = (
        <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
          {products.data.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }
  } else {
    if (isLoading) {
      content = (
        <div className="w-full h-full flex items-center justify-center">
          loading...
        </div>
      );
    } else if (!isLoading && isError) {
      content = (
        <div className="w-full h-full flex items-center justify-center">
          Internal server error
        </div>
      );
    } else if (!isLoading && !isError && products?.data.length === 0) {
      content = (
        <div className="w-full h-full flex items-center justify-center">
          No products found
        </div>
      );
    } else {
      content = (
        <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
          {products.data.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }
  }

  // Handle search
  const searchTerm = useDebounce(search, 500);

  useEffect(() => {
    if (searchTerm) {
      setTerm(searchTerm);
      setCurrentPage(1);
    } else {
      setTerm("");
      setCurrentPage(1);
    }
  }, [searchTerm]);

  // Update URL search params
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", String(currentPage));

    router.push(`/?${params.toString()}`);
  }, [currentPage]);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-x-6">
        <h1 className="text-2xl font-bold">Product List</h1>

        {/* Search form */}
        <form action="">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="p-1 border border-gray-500 rounded"
          />
        </form>

        {/* Sorting products by */}
        {products.total !== 0 && (
          <div className="flex items-center justify-center gap-x-2">
            <div className="flex items-center justify-center gap-x-2">
              <label htmlFor="">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1 border border-gray-500 rounded"
              >
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="buying_price">Buying price</option>
                <option value="selling_price">Selling price</option>
                <option value="stock">Stock</option>
                <option value="brand_name">Brand name</option>
                <option value="category_name">Category name</option>
                <option value="status">Status</option>
              </select>
            </div>

            <div className="flex items-center justify-center gap-x-2">
              <label htmlFor="">Order by</label>
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value as "asc" | "desc")}
                className="p-1 border border-gray-500 rounded"
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Product list */}
      {content}

      {/* Pagination */}
      {products.total !== 0 && (
        <Pagination
          totalPages={products.last_page}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
