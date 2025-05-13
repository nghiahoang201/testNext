import { products } from "../mockData";

export async function GET() {
  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    category,
    imageUrl,
    description,
    price,
    reviewCount,
    onSale,
    originalPrice,
    thumbnails,
    isNew,
    rating,
  } = body;

  const newProduct = {
    id: String(products.length + 1),
    name,
    category,
    imageUrl,
    description,
    price,
    reviewCount,
    onSale,
    originalPrice,
    thumbnails,
    isNew,
    rating,
  };

  products.push(newProduct);

  return Response.json(products);
}
