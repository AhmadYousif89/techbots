import Link from 'next/link';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { featuredProducts } from '@/data';
import { Badge } from '@/components/ui/badge';

export function HotProducts() {
  return (
    <section className='px-6 py-20 bg-secondary max-view lg:mx-auto'>
      <h2 className='text-2xl font-bold mb-12'>Featured Collections</h2>
      <Carousel opts={{ align: 'end' }} className='max-w-screen-xl mx-auto'>
        <CarouselContent>
          {featuredProducts.map(item => (
            <CarouselItem
              key={item.id}
              className='grid basis-11/12 sm:basis-1/2 lg:basis-1/3'>
              <Card className='grid'>
                <CardHeader>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  <p className='mt-2 text-sm text-gray-500'>{item.description}</p>
                </CardHeader>
                <CardContent className='mt-auto'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    className='rounded-lg'
                    width={500}
                    height={250}
                  />
                </CardContent>
                <CardFooter className='grid gap-2 justify-between'>
                  <span className='text-sm text-muted-foreground font-medium row-span-1 col-span-2'>
                    Starts from:
                  </span>
                  <Badge
                    variant={'outline'}
                    className='py-2 justify-center min-w-16 shadow font-medium'>
                    {item.price}
                  </Badge>
                  <Link href={item.url}>
                    <Button
                      variant={'link'}
                      className='bg-primary/95 text-white rounded-md text-xs'>
                      {item.buttonTitle}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-full translate-y-1/2 left-0' />
        <CarouselNext className='absolute top-full translate-y-1/2 right-0' />
      </Carousel>
    </section>
  );
}
