import { gqlMutation, gqlQuery } from "./GraphQL";

export const gqlUserReturning = `{
  bio
  createdAt
  id
  isActive
  isBanned
  isVerified
  name
  profileImage
  updatedAt
  wallet
}`;

export const getUsers = async (_where) => {
  let query = `
    users ${_where ? `(${_where})` : ""}
    ${gqlUserReturning}
  `;

  return await gqlQuery(query);
};

export const createUser = async (_wallet) => {
  let mutation = `
    insert_users_one(object: {wallet: "${_wallet}"}) ${gqlUserReturning}
  `;

  return await gqlMutation(mutation);
};

export const approveUserVerify = async (_wallet) => {
  let mutation = `
    update_users(_set: {isVerified: true}, where: {wallet: {_eq: "${_wallet}"}}) {
      returning ${gqlUserReturning}
    }
  `;

  return await gqlMutation(mutation);
};
