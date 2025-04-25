interface IFetchingProducts {
  page?: number;
  sortBy?: string | string[];
  orderBy?: "asc" | "desc" | string | string[];
  search?: string | string[];
}

export async function fetchProducts({
  page,
  sortBy,
  orderBy,
  search,
}: IFetchingProducts) {
  const response = await fetch(
    `https://final-assessment-mu.vercel.app/api/product-list?page=${page}&sort_by=${sortBy}&order=${orderBy}&search=${search}`
  );

  return await response.json();
}
