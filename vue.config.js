module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://worldfood.guide",
        changeOrigin: true,
      },
    },
  },
};
