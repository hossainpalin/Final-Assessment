import { NextRequest } from "next/server";

export interface IResult {
  current_page?: number;
  data?: any[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string | null;
  path?: string;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  total?: number;
}

export function paginate(request: NextRequest, data: any) {
  try {
    const page = Number(request?.nextUrl?.searchParams.get("page")) || 1;
    const limit = 20;

    if (!page) {
      return data;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let result: IResult = {};

    if (data.length > 0 && page > 0) {
      result = {
        current_page: page,
        data: data.slice(startIndex, endIndex),
        first_page_url: `${request?.nextUrl?.origin}/api/product-list?page=1`,
        from: startIndex + 1,
        last_page: Math.ceil(data.length / limit),
        last_page_url: `${
          request?.nextUrl?.origin
        }/api/product-list?page=${Math.ceil(data.length / limit)}`,
        next_page_url:
          endIndex < data.length
            ? `${request?.nextUrl?.origin}/api/product-list?page=${page + 1}`
            : null,
        path: `${request?.nextUrl?.origin}/api/product-list`,
        per_page: limit,
        prev_page_url:
          startIndex > 0
            ? `${request?.nextUrl?.origin}/api/product-list?page=${page - 1}`
            : null,
        to: endIndex > data.length ? data.length : endIndex,
        total: data.length,
      };
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}
