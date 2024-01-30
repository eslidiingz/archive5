import { ApolloClient, InMemoryCache } from "@apollo/client";

export async function callGqlClient(
  _type: string,
  _url: string,
  _gql: any,
  _variable: any,
  accessToken: string | null
) {
  let graphqlUrl;
  console.log("_variable", _variable);
  if (_url === "organize") {
    graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL_ORGANIZE;
  } else {
    graphqlUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/${_url}`;
  }

  const gqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: `${graphqlUrl}`,
  });

  let _res;
  if (_type === "query") {
    _res = await gqlClient.query({
      query: _gql,
      variables: { ..._variable },
      context: {
        headers: {
          authorization: "Bearer " + accessToken || "",
        },
      },
    });
  } else {
    _res = await gqlClient.mutate({
      mutation: _gql,
      variables: { ..._variable },
      context: {
        headers: {
          authorization: "Bearer " + accessToken || "",
        },
      },
    });
  }

  return _res;
}
