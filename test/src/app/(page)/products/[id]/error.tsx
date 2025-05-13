"use client";
import { Button } from "@/app/component/ui/button";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Product Not Found
        </h2>
        <p className="mb-4">
          {`The product you're looking for doesn't exist or has been removed.`}
        </p>
        <Button onClick={() => router.push("/products")}>
          Return to Products
        </Button>
      </div>
    </div>
  );
}
