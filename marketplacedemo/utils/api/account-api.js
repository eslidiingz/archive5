import Config from "../config.json";

const userEndpoint = "users";
const userUrl = `${Config.collectionApi}/${userEndpoint}`;

export const fetchUserData = async (account) => {
  const findByAddress = await fetch(`${userUrl}?address=${account}`);
  return await findByAddress.json();
};

export const findUserById = async (id) => {
  const findByAddress = await fetch(`${userUrl}/${id}`);
  return await findByAddress.json();
};
