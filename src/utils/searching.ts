import { NextRequest } from "next/server";

export function searching(request: NextRequest, data: any) {
  try {
    const search = request?.nextUrl?.searchParams.get("search");

    if (!search) {
      return data;
    }

    return data.filter((item: any) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  } catch (error) {
    console.error(error);
  }
}
