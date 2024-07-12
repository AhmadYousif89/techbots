import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious
} from '../components/ui/carousel';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { RatingStars } from './products/_components/reviews/rating_stars';
import { Category } from './products/_actions/actions';

export async function PopularItemsSlide() {
  const categories: Category[] = ['laptops', 'mobiles', 'headphones', 'watches'];
  const allProducts = await prisma.product.findMany({
    where: { category: { in: categories } }
  });

  const products = categories.flatMap(category => {
    return allProducts.filter(product => product.category === category).slice(0, 2);
  });

  return (
    <section className='bg-secondary py-10 px-6'>
      <div className='flex items-center gap-4 mb-12'>
        <h2 className='text-xl lg:text-2xl font-bold'>Popular Items</h2>
        <Button variant={'link'} className='hover:text-muted-foreground'>
          <Link href='/products?sort=popular'>View All</Link>
        </Button>
      </div>
      <Carousel
        className='mx-auto max-w-[min(320px,80vw)] sm:max-w-xl md:max-w-2xl lg:max-w-screen-md xl:max-w-screen-lg'
        opts={{ dragFree: true, skipSnaps: true, align: 'start' }}>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={product.asin + index}
              className='basis-48 lg:basis-56 grid pb-4'>
              <Card className='p-2 grid auto-rows-[1fr_auto] gap-4'>
                <Link
                  href={`/products/${product.asin}`}
                  className='grid place-content-center'>
                  <Image
                    src={product.mainImage}
                    alt={product.title}
                    width={150}
                    height={150}
                    className='group-hover:scale-105 transition-transform duration-200'
                  />
                </Link>
                <CardContent className='mt-auto py-0 px-0'>
                  <p className='text-xs font-medium mb-1'>
                    {product.title.split(' ').slice(0, 3).join(' ')}
                  </p>
                  <div className='flex items-center justify-between'>
                    <p className='text-xs text-muted-foreground'>{product.price}</p>
                    <RatingStars
                      productRating={product.rating}
                      showTotalReviews={false}
                      size='xs'
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='top-full -translate-y-2 left-0' />
        <CarouselNext className='top-full -translate-y-2 right-0' />
      </Carousel>
    </section>
  );
}
