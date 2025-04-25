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

    // Apply searching
    data = searching(request, data) as any;

    // Apply sorting
    data = sorting(request, data) as any;

    // Apply pagination
    const paginatedData = paginate(request, data) as any;

    // Return paginated data
    if (paginatedData?.data?.length > 0) {
      return NextResponse.json(paginatedData, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No products found after applying filters" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching product list:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
