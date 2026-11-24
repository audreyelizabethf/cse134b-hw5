module.exports = function (eleventyConfig) {
  // Copy these to the build output unchanged
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("theme.js");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");

  // Don't turn the exercise README into a page
  eleventyConfig.ignores.add("README.md");
};