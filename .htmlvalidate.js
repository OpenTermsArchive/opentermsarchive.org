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

    /* Validates BEM class names, based on https://github.com/potherca-blog/BEM-Regex */
    "class-pattern": ["error", {"pattern": "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$"}],
    
    /* Allow the use of unescaped special characters */
    "no-raw-characters": ["error", {"relaxed": true}],

    /* Disable inline styles validation */
    "no-inline-style": ["off"]
  }
});
