const { defineConfig } = require("html-validate");

module.exports = defineConfig({
  extends: ["html-validate:recommended"],
  rules: {
    /* Define <!DOCTYPE html> to lowercase because Hugo minify does it */
    "doctype-style": ["error", {"style": "lowercase"}],

    /* Allow images to not have alt="" attribute */
    "wcag/h37": ["off"],

    /* Only validates the ID is non-empty and contains no whitespace */
    "valid-id": ["error", {"relaxed": true}],

    /* Increase max <title> size */
    "long-title": ["error", {"maxlength": 120}],
  }
});
