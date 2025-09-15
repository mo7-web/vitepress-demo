import { defineConfig } from "vitepress";
import { GenerateRewrites } from "./utils/GenerateRewrites";
import { nav, sidebar } from "./themeConfig";

const GenerateConfig = GenerateRewrites({
  srcDir: "./docs",
});

const MyConfig = {
  rewrites: {
    // 路径映射，用于实现 frontmatter.permalink
    ...GenerateConfig.rewrites,
  },

  srcExclude: [
    // 需要排除渲染的文件可用于实现 frontmatter.exclude
    ...GenerateConfig.srcExclude,
  ],
};

console.log("MyConfig", MyConfig);

export default defineConfig({
  ...MyConfig,
  title: "My Awesome Project",
  description: "A VitePress Site",
  base: "/",
  srcDir: "./", // 相对于，根目录为 .vitepress 所在目录
  outDir: "../dist",
  assetsDir: "vitepress-assets",
  themeConfig: {
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message: "messagexxx",
      copyright: "Copyright © 2019-present Evan You",
    },
  },
});
