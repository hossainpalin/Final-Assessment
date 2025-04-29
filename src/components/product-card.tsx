import Image from "next/image";

export default function ProductCard({product}: { product: any}) {
  return (
    <div key={product.id} className="border p-4 rounded-md h-fit">
      <div className="flex justify-between items-center mb-2 h-[150px]">
        <Image
          src={
            "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={product.name}
          width={400}
          height={300}
          priority
          className="w-full h-full object-cover rounded-md mb-2"
        />
      </div>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Buying Price: {product.selling_price}</p>
      <p>Selling Price: {product.buying_price}</p>
      <p>Stock: {product.stock}</p>
      <p>Brand name: {product.brand_name}</p>
      <p>Category: {product.category_name}</p>
      <p>Status: {product.status}</p>
    </div>
  );
}
