import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

import { Separator } from '../ui/separator';
import { AddToCartButton } from '../cart/add_to_cart_button';
import { AddToWishlistButton } from '../wishlist/add_to_wishlist_button';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RatingStars } from './reviews/rating_stars';
import { Category } from '@/lib/store';

type Props = {
  searchParams: { [key: string]: string | Category | undefined };
  product: Product;
};

export async function ProductGridItem({ product, searchParams }: Props) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <Card className='grid auto-rows-[150px_3px_1fr_3px_auto] md:auto-rows-[200px_3px_1fr_3px_auto] max-w-xs justify-self-center p-2 shadow-none border-0'>
      <Link href={`/products/${product.asin}`} className='place-self-center'>
        <Image
          src={product.main_image.link}
          alt={product.title}
          width={150}
          height={150}
          className='size-28 sm:size-36 md:size-44 lg:size-60 object-contain'
        />
      </Link>
      <Separator />
      <CardHeader className='p-0 py-4 justify-center space-y-0'>
        <Link href={`/products/${product.asin}`}>
          <CardTitle className='text-xs font-medium hover:underline hover:text-blue-700'>
            {product.title}
          </CardTitle>
        </Link>
        <div className='text-xs text-muted-foreground md:text-sm font-medium pt-4 mt-auto self-end flex-1 grid grid-cols-2 justify-between w-full items-end'>
          <RatingStars
            productRating={product.rating}
            showTotalReviews={false}
            size='xs'
          />
          <span className='place-self-end'>{product.price}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardFooter className='p-0 pt-2 gap-4 justify-between'>
        <AddToCartButton
          action='BuyNow'
          className='text-xs lg:text-sm'
          product={product}
          forceRedirect={`/cart?page=${searchParams['page'] || ''}&limit=${
            searchParams['limit'] || ''
          }&category=${searchParams['category'] || ''}`}
        />
        <AddToWishlistButton
          logoSize={18}
          className='text-xs hover:bg-transparent'
          product={product}
        />
      </CardFooter>
    </Card>
  );
}
