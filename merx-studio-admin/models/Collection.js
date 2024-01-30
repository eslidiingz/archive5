import { gqlQuery } from "./GraphQL";

/** GraphQL */
export const gqlCollectionReturning = `{
  id
  name
  coverUrl
  creatorWallet
  createdAt
  updatedAt
}`;

export const getCollection = async (_condition = null) => {
  let query = `
    collection ${
      _condition ? `(where: ${_condition})` : ""
    } ${gqlCollectionReturning}
  `;

  return gqlQuery(query);
};
