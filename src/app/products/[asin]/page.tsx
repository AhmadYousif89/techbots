import { Suspense } from 'react';
import { SearchParams } from '../_lib/types';
import { capitalizeString, cn } from '@/lib/utils';
import { extractSearchParams } from '../_lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { ProductView } from './product_view';
import { SimilarProducts } from '../_components/similar_products';
import { ProductReviews } from '../_components/reviews/product_reviews';
import { SimilarItemSkeleton } from '../_components/skeletons/similar_item_skeleton';

type PageProps = {
  params: { asin: string };
  searchParams: SearchParams;
};

export default async function SingleProductPage({ params, searchParams }: PageProps) {
  const { asin } = params;
  const { category } = extractSearchParams(searchParams);

  return (
    <main className='grid min-h-screen max-w-screen-xl mx-auto'>
      <Breadcrumb className='flex items-center col-span-full px-10 bg-muted h-14'>
        <BreadcrumbList>
          <BreadcrumbItem className='text-xs text-muted-foreground'>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs text-muted-foreground'>
            <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-xs text-muted-foreground'>
                <BreadcrumbLink href={`/products?cat=${category}`}>
                  {capitalizeString(category)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem className='text-xs'>
            <BreadcrumbPage>{asin}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductView asin={asin} searchParams={searchParams} />

      <Suspense fallback={<SimilarItemSkeleton />}>
        <SimilarProducts asin={asin} category={category} />
      </Suspense>

      <Suspense fallback={<h1>Loading reviews...</h1>}>
        <Card id='reviews' className='rounded-none py-10 sm:px-4 xl:px-8'>
          <CardHeader>
            <CardTitle className='text-2xl font-medium'>Customer’s Review</CardTitle>
          </CardHeader>
          <ProductReviews asin={asin} searchParams={searchParams} />
        </Card>
      </Suspense>
    </main>
  );
}
