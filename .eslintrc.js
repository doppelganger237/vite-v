module.exports = {
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  plugins: ["vue", "html", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "vue/multi-word-component-names": 0,
  },
};
