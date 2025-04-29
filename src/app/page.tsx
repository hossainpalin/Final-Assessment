import ProductList from "@/components/product-list";
import {fetchProducts} from "@/lib/fetch-products";
import {dehydrate, HydrationBoundary, QueryClient,} from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const queryClient = new QueryClient();
  const query = await searchParams;

  const currentPage = Number(query.page) || 1;
  const sortBy = "id";
  const orderBy = "desc";
  const term = "";

  await queryClient.prefetchQuery({
    queryKey: ["products", currentPage, sortBy, orderBy, term],
    queryFn: () => fetchProducts({ currentPage, sortBy, orderBy, term }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full max-w-3/4 h-full mx-auto">
        <ProductList initialPage={currentPage} />
      </div>
    </HydrationBoundary>
  );
}
