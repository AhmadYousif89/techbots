import { Product } from '@/lib/types';
import type { Category } from '@/lib/store';
import { getProductsByCategory, getLocalProducts } from '@/lib/actions';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductGrid } from '@/components/products/product_grid';
import { FilterProducts } from '@/components/products/filters/filter_products';
import { capitalizeString } from '@/lib/utils';

type PageProps = {
  searchParams: { [key: string]: string | Category | undefined };
};

export default async function ProductsPage({ searchParams }: PageProps) {
  let products = await getLocalProducts();
  let totalProducts = products.length;

  // Handle products filtering
  let productsByCategory: Product[] = [];
  let category = searchParams['category'] ?? '';
  if (category) {
    productsByCategory = await getProductsByCategory(category as Category);
    products = productsByCategory;
    totalProducts = products.length;
  }
  // Handle products pagination
  const page = searchParams['page'] ?? '1';
  const limitPerPage = searchParams['limit'] ?? '8';
  const gridSize = searchParams['grid'] ?? '';
  const totalPages = Math.ceil(totalProducts / +limitPerPage);
  const start = (+page - 1) * +limitPerPage;
  const end = start + +limitPerPage;
  const hasPrevPage = start > 0;
  const hasNextPage = end < totalProducts;
  const paginatedProducts = products.slice(start, end);

  return (
    <main className='min-h-screen max-w-screen-xl mx-auto bg-background'>
      <Card className='py-8 rounded-none border-0 shadow-none'>
        <div className='px-2 md:px-4 mb-4 flex items-center justify-between'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='text-xs'>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className='text-xs'>
                <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-xs text-muted-foreground font-semibold'>
                  {capitalizeString(category)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className='text-xs font-medium text-muted-foreground'>
            <p>
              Showing {start + 1} - {end} of {totalProducts} results
            </p>
          </div>
        </div>
        <Separator />
        <FilterProducts searchParams={searchParams} />
        <ProductGrid
          products={paginatedProducts}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          totalPages={totalPages}
          limit={limitPerPage}
          category={category}
          gridSize={gridSize}
          page={+page}
        />
      </Card>
    </main>
  );
}
