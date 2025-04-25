"use client";

import { fetchProducts } from "@/lib/fetch-products";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  initialPage: number;
  initialSortBy: string | string[];
  initialOrderBy: string | string[];
  initialSearch?: string | string[];
}

export default function ProductList({
  initialPage,
  initialSortBy,
  initialOrderBy,
  initialSearch,
}: IProps) {
  const router = useRouter();

  const [page, setPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [search, setSearch] = useState(initialSearch || "");

  const { data: products } = useQuery({
    queryKey: ["products", page, sortBy, orderBy, search],
    queryFn: () => fetchProducts({ page, sortBy, orderBy, search }),
    placeholderData: (previousData) => previousData,
  });

  // update URL search params
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("sortBy", sortBy as string);
    params.set("orderBy", orderBy as string);
    if (search) {
      params.set("search", search as string);
    }

    router.push(`/?${params.toString()}`);
  }, [page, sortBy, orderBy, search]);

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
      </div>

      {/* Product list */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
        {products?.data?.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-md h-fit">
            <div className="flex justify-between items-center mb-2 h-[150px]">
              <Image
                src={product.img}
                alt={product.name}
                width={400}
                height={300}
                priority
                className="w-full h-full object-cover rounded-md mb-2"
              />
            </div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Buying Price: {product.selling_price}</p>
            <p>Selling Price: {product.buying_price}</p>
            <p>Stock: {product.stock}</p>
            <p>Brand name: {product.brand_name}</p>
            <p>Category: {product.category_name}</p>
            <p>Status: {product.status}</p>
          </div>
        ))}

        {products?.message && (
          <div className="col-span-5 text-center text-gray-500">
            {products.message}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-x-6 pb-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Previews
        </button>

        {Array.from({ length: products?.last_page }).map((_, index: number) => (
          <button
            onClick={() => setPage(index + 1)}
            key={index + 1}
            className={cn(
              "px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md",
              page === index + 1 && "bg-red-500"
            )}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page >= products?.last_page}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-2 py-1 cursor-pointer bg-blue-500 text-white rounded-md disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
