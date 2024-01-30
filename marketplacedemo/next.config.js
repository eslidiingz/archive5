require("dotenv").config();

const Config = require("./utils/config.json");

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: Config.openProcess ? "/market" : "/profile/mynft/",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
    MORALIS_APP_ID: process.env.MORALIS_APP_ID,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
  },
};
