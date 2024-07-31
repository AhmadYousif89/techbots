import Link from 'next/link';

import { TProduct } from '../_lib/types';
import { extractSearchParams } from '../_lib/utils';
import { RatingBreakdown, SearchParams } from '../_lib/types';

import { getProductDetails } from './product_details';
import { AddReview } from '../_components/reviews/add_review';
import { ReviewItem } from '../_components/reviews/review_item';
import { RatingStars } from '../_components/reviews/rating_stars';
import { PaginationButtons } from '../_components/pagination_button';
import { ReviewsRatingBars } from '../_components/reviews/rating_bars';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ProductReviewsProps = {
  asin: string;
  searchParams: SearchParams;
};

export async function ProductReviews({ asin, searchParams }: ProductReviewsProps) {
  const limit = 5;
  const { page, selectedRating } = extractSearchParams(searchParams);
  const { product, reviewsCount } = await getProductDetails(asin, searchParams, limit);

  const reviews = product.topReviews;

  if (reviewsCount === 0 && !selectedRating) {
    return (
      <Card className='max-w-screen-sm mx-6'>
        <CardHeader>
          <CardTitle className='text-lg w-fit'>No reviews for this product!</CardTitle>
          <CardDescription className='py-4 ml-4'>
            Be the first to review this product and help others make a better decision.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AddReview />
        </CardFooter>
      </Card>
    );
  }

  let content;
  if (selectedRating && reviewsCount === 0) {
    content = (
      <CardTitle className='text-lg text-muted-foreground'>
        No reviews for this rating!
      </CardTitle>
    );
  }

  const totalPages = Math.ceil(reviewsCount / limit);
  const start = (+page <= 0 ? 0 : +page - 1) * limit;
  const end = start + limit;
  const hasNextPage = end < reviewsCount;
  const hasPrevPage = start > 0;

  if (reviews.length > 0) {
    content = (
      <div className='space-y-8'>
        <ReviewsPaginationButtons
          asin={asin}
          searchParams={searchParams}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          totalPages={totalPages}
        />
        {reviews.map(review => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </div>
    );
  }

  return (
    <CardContent>
      <section className='flex flex-col lg:flex-row lg:justify-between gap-8'>
        <RatingOverview searchParams={searchParams} product={product} />
        <Card className='p-6 flex-1 lg:basis-full flex flex-col justify-between'>
          <>{content}</>
          <CardFooter className='p-6 px-0'>
            <AddReview />
          </CardFooter>
        </Card>
      </section>
    </CardContent>
  );
}

type PaginationSectionProps = {
  asin: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  searchParams: SearchParams;
};

export function ReviewsPaginationButtons({
  asin,
  hasPrevPage,
  hasNextPage,
  totalPages,
  searchParams,
}: PaginationSectionProps) {
  const { page, selectedRating, category } = extractSearchParams(searchParams);
  const params = new URLSearchParams({
    ...(category && { cat: category }),
    ...(selectedRating && { sr: selectedRating }),
  });

  let reviewsTitle = 'Top Reviews';
  for (let i = 0; i < 5; i++) {
    if (selectedRating === `${5 - i}`) {
      reviewsTitle = `${5 - i} Star Reviews`;
      break;
    }
  }

  const firstPageUrl = `/products/${asin}?page=1&${params.toString()}#reviews`;
  const nextPageUrl = `/products/${asin}?page=${
    +page == 0 ? 2 : +page + 1
  }&${params.toString()}#reviews`;
  const prevPageUrl = `/products/${asin}?page=${+page - 1}&${params.toString()}#reviews`;
  const lastPageUrl = `/products/${asin}?page=${totalPages}&${params.toString()}#reviews`;
  const resetUrl = `/products/${asin}?page=1&cat=${category}#reviews`;

  const startingPage = +page <= 0 ? 1 : +page <= totalPages ? +page : 0;
  const endingPage = totalPages >= 1 ? totalPages : 0;

  return (
    <div className='flex justify-between items-center'>
      <h3 className='font-medium text-xl mb-auto'>{reviewsTitle}</h3>
      <div className='grid items-center gap-y-2'>
        {selectedRating && (
          <Button
            size='sm'
            variant='outline'
            className='place-self-center'
            disabled={!selectedRating}>
            <Link href={resetUrl}>Reset</Link>
          </Button>
        )}

        <PaginationButtons
          page={page}
          params={params.toString()}
          baseUrl={`/products/${asin}/`}
          startingPage={startingPage}
          endingPage={endingPage}
          totalPages={totalPages}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          firstPageUrl={firstPageUrl}
          prevPageUrl={prevPageUrl}
          nextPageUrl={nextPageUrl}
          lastPageUrl={lastPageUrl}
        />
      </div>
    </div>
  );
}

type RatingOverviewProps = {
  product: Pick<TProduct, 'asin' | 'rating' | 'ratingsTotal' | 'ratingBreakdown'>;
  searchParams: SearchParams;
};

function RatingOverview({ product, searchParams }: RatingOverviewProps) {
  const { asin, rating, ratingsTotal } = product;
  const ratingBreakdown = product.ratingBreakdown as RatingBreakdown;

  return (
    <div className='grid gap-4 flex-1 lg:basis-1/2 lg:self-start'>
      <Card className='grid items-center justify-center max-w-32 aspect-square p-2 shadow-sm'>
        <h3 className='grid items-center justify-center place-self-center size-12 text-2xl font-semibold rounded-full ring-1 ring-zinc-300 shadow-sm aspect-square p-2 text-muted-foreground'>
          {rating}
        </h3>
        <RatingStars
          size={'sm'}
          className='justify-center'
          productRating={rating}
          reviewsCount={ratingsTotal}
          showTotalReviews={false}
        />
        <p className='text-xs text-center text-muted-foreground font-medium'>
          {ratingsTotal.toLocaleString()} rating
        </p>
      </Card>
      <ReviewsRatingBars
        asin={asin}
        searchParams={searchParams}
        ratingsTotal={ratingsTotal}
        ratingBreakdown={ratingBreakdown}
      />
    </div>
  );
}
