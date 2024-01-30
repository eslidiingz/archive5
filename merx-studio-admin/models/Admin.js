import { gqlMutation, gqlQuery } from "./GraphQL";

export const gqlAdminReturning = `
  createdAt
  displayName
  firstname
  id
  isActive
  lastname
  password
  position
  roleId
  updatedAt
  username
`;

export const getAdmins = async (_where) => {
  let query = `
    admins ${_where ? `(where: ${_where})` : ""}
    {${gqlAdminReturning}}
  `;

  return await gqlQuery(query);
};
