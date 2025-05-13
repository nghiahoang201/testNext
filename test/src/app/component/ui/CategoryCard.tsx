import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  imageUrl: string;
}

export default function CategoryCard({ name, imageUrl }: CategoryCardProps) {
  return (
    <div className="group">
      <Link href={`/products?category=${encodeURIComponent(name)}`}>
        <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={500}
            height={660}
          />
          <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-opacity-30 transition-opacity"></div>
          <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
            {name}
          </h3>
        </div>
      </Link>
    </div>
  );
}
