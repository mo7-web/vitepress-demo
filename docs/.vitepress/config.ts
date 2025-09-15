import { defineConfig } from "vitepress";
import { GenerateRewrites, GenerateStaticHtml } from "./utils/GenerateRewrites";
import { nav, sidebar } from "./themeConfig";
import { rewrites, srcExclude } from "./data/index";
// 生成相关数据中，并写入 data 目录
GenerateRewrites({
  srcDir: "./docs",
});

console.log("GetRewrites", rewrites);
console.log("GetSrcExclude", srcExclude);

const MyConfig = {
  rewrites, // 路径映射
  srcExclude, // 排除列表
};

export default defineConfig({
  ...MyConfig,
  title: "My Awesome Project",
  description: "A VitePress Site",
  base: "/",
  srcDir: "./", // 相对于，根目录为 .vitepress 所在目录
  outDir: "../dist",
  assetsDir: "vitepress-assets",
  buildEnd(siteConfig) {
    GenerateStaticHtml(siteConfig);
  },
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
