import { NextRequest } from "next/server";

export function sorting(request: NextRequest, data: any) {
  try {
    const sortBy = request?.nextUrl?.searchParams.get("sort_by");
    const orderBy = request?.nextUrl?.searchParams.get("order");

    if (!sortBy || !orderBy) {
      return data;
    }

    console.log("Sorting data by", sortBy, orderBy);

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
