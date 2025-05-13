export const dynamic = "force-dynamic";
import Product from "./product";
import { getAnProduct } from "./product_action";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getAnProduct(id);

  if (!product) return notFound();

  return <Product product={product} />;
}
