interface IFetchingProducts {
  currentPage: number;
  sortBy: string;
  orderBy: "asc" | "desc" | string;
  term?: string;
}

export async function fetchProducts({
  currentPage,
  sortBy,
  orderBy,
  term,
}: IFetchingProducts) {
  let query;

  if (term) {
    query = `?search=${term}&page=${currentPage}&sort_by=${sortBy}&order=${orderBy}`;
  } else {
    query = `?page=${currentPage}&sort_by=${sortBy}&order=${orderBy}`;
  }

  const response = await fetch(
    `https://laravelpoint.com/api/ProductList${query}`,
  );

  return await response.json();
}
