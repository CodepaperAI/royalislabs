import Image from "next/image";
import { productThumbnail } from "@/lib/product-images";

export function ProductPhoto({
  src,
  alt,
  priority = false,
  className = "",
  thumbnail = false,
  sizes = "(max-width: 768px) 100vw, 42vw"
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  thumbnail?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-image border border-arctic/10 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] ${className}`}
    >
      <Image
        src={thumbnail ? productThumbnail(src) : src}
        alt={alt}
        width={960}
        height={1200}
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-contain p-4 transition-transform duration-300 ease-snap motion-safe:group-hover:scale-[1.025]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-paper/70" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 ease-lab group-hover:opacity-100">
        <div className="absolute inset-x-5 top-5 h-px bg-arctic/20" />
        <div className="absolute bottom-5 inset-x-5 h-px bg-arctic/10" />
      </div>
    </div>
  );
}
