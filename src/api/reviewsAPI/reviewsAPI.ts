import { client, q } from '../faunaDB';
import { IGetAllReviewsResult, IReview } from './../../types/types';

export async function getAllReviews(): Promise<IGetAllReviewsResult[]> {

  try {
    const reviews: { data: any[] } = await client.query(q.Paginate(q.Match(q.Index("all_reviews"))));

    const reviewRef = reviews.data;

    const getAllDataQuery = reviewRef.map((ref) => q.Get(ref));

    const result: IGetAllReviewsResult[] = await client.query(getAllDataQuery);

    return result;

  } catch (error) {
    return []
  }
}

export async function createReview(review: IReview) {

  try {

    const created: { data: IReview } = await client.query(q.Create(q.Ref("classes/Reviews"), { data: review }));

    return created.data;

  } catch (error) {
    return {
      hasError: true,
      message: "something went wrong"
    }
  }

}

