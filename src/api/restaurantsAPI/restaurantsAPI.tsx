import { client, q } from '../faunaDB';
import { IGetAllRestaurants } from './../../types/types';

export async function getAllRestaurants() {
  try {
    const posts: { data: any[] } = await client.query(q.Paginate(q.Match(q.Index("all_restaurants"))));

    const postRef = posts.data;

    const getAllDataQuery = postRef.map((ref) => q.Get(ref));

    const result: IGetAllRestaurants[] = await client.query(getAllDataQuery);

    return result;

  } catch (error) {
    return []
  }
}