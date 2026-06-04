const ORIGINAL_PRODUCT_PREFIX = "/products-original/";
const THUMB_PRODUCT_PREFIX = "/products/thumbs/";

export function productThumbnail(src: string) {
  if (!src.startsWith(ORIGINAL_PRODUCT_PREFIX)) {
    return src;
  }

  return src
    .replace(ORIGINAL_PRODUCT_PREFIX, THUMB_PRODUCT_PREFIX)
    .replace(/\.(png|jpe?g)$/i, ".webp");
}
