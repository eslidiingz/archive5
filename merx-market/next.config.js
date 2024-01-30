/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["@madzadev/audio-player"]);
module.exports = withImages(
  withTM({
    images: {
      disableStaticImages: true,
    },
  })
);
