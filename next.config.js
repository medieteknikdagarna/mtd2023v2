/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

module.exports = withVideos({
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.pdf$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    });

    return config;
  },
});
