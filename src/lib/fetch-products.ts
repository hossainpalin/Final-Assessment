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
    `http://localhost:3000/api/product-list?page=${page}&sortBy=${sortBy}&orderBy=${orderBy}&search=${search}`
  );

  return await response.json();
}
