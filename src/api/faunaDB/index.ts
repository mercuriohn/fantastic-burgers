import faunadb, { errors } from 'faunadb';
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_SERVER_KEY as string
});
const q = faunadb.query;
export { client, q, errors };