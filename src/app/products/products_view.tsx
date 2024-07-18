import { SearchParams } from '@/app/products/_lib/types';
import { extractSearchParams } from './_lib/utils';
import { capitalizeString } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { PaginationSummary } from './_components/pagination_summary';
import { ProductGrid } from '@/app/products/_components/product_grid';
import { FilterProducts } from './_components/filters/filter_products';
import { SearchProducts } from './_components/filters/search_products';
import { SortProducts } from './_components/filters/sort_products';

type ProductsViewProps = {
  searchParams: SearchParams;
};

export function ProductsView({ searchParams }: ProductsViewProps) {
  const { category } = extractSearchParams(searchParams);

  return (
    <>
      <div className='px-4 md:px-10 flex items-center justify-between h-14 bg-muted'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className='text-xs'>
              <BreadcrumbLink href='/products'>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            {category && !category.includes(',') && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-xs text-muted-foreground font-semibold'>
                    {capitalizeString(category)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <PaginationSummary searchParams={searchParams} />
      </div>

      <Separator />

      <div className='relative'>
        <FilterProducts searchParams={searchParams} />
        <div className='absolute right-0 top-[14px] pr-2'>
          <div className='flex items-center gap-4'>
            <SearchProducts />
            <SortProducts />
          </div>
        </div>
        <ProductGrid searchParams={searchParams} />
      </div>
    </>
  );
}
