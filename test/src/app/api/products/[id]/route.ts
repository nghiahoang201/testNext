import { products } from "../../mockData";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const product = products.find((product) => product.id === id);

  return Response.json(product);
};
