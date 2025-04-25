import { NextRequest } from "next/server";

export function sorting(request: NextRequest, data: any) {
  try {
    const sortBy = request?.nextUrl?.searchParams.get("sortBy");
    const orderBy = request?.nextUrl?.searchParams.get("orderBy");

    if (!sortBy || !orderBy) {
      return data;
    }

    return data.sort((a: any, b: any) => {
      if (orderBy === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  } catch (error) {
    console.error(error);
  }
}
