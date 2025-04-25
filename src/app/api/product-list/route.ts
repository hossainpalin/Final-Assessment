import { products } from "@/data/products";
import { paginate } from "@/utils/paginate";
import { searching } from "@/utils/searching";
import { sorting } from "@/utils/sorting";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let data: any = products;

  try {
    if (products.length === 0) {
      return NextResponse.json(
        { message: "Products not found" },
        { status: 404 }
      );
    }

    // const paginatedData = paginate(request, data) as any;
    // if (paginatedData?.data?.length > 0) {
    //   data = paginatedData;
    // }

    // Sorting and Paginate data
    if (products.length > 0) {
      data = sorting(request, products) as any;
      data = searching(request, products) as any;

      const paginatedData = paginate(request, data) as any;
      if (paginatedData?.data?.length > 0) {
        return NextResponse.json(paginatedData, { status: 200 });
      }
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching product list:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
