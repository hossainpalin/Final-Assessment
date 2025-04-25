import ProductList from "@/components/product-list";
import { fetchProducts } from "@/lib/fetch-products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const queryClient = new QueryClient();
  const query = await searchParams;

  const page = Number(query.page) || 1;
  const sortBy = query.sortBy || "id";
  const orderBy = query.orderBy || "asc";
  const search = query.search || "";

  await queryClient.prefetchQuery({
    queryKey: ["products", page, sortBy, orderBy, search],
    queryFn: () => fetchProducts({ page, sortBy, orderBy, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full max-w-3/4 h-full mx-auto">
        <ProductList
          initialPage={page}
          initialSortBy={sortBy}
          initialOrderBy={orderBy}
          initialSearch={search}
        />
      </div>
    </HydrationBoundary>
  );
}
