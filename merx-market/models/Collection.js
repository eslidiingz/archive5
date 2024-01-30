import { gqlQuery } from "./GraphQL";

/** GraphQL */
export const gqlCollectionReturning = `{
  id
  name
  cover_url
  creator_wallet
}`;

export const getCollection = async (_condition = null) => {
  let query = `
    collection ${
      _condition ? `(where: ${_condition})` : ""
    } ${gqlCollectionReturning}
  `;

  return gqlQuery(query);
};
