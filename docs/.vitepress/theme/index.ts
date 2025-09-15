// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { rewrites } from "../data/index";
import "./style.scss";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 路由变化前的钩子 实现 重定向
    router.onBeforeRouteChange = async (to) => {
      if (Object.keys(rewrites).length == 0) {
        return;
      }
      const decodedUrl = decodeURI(to);
      // 正则 去开头的 /
      const path = decodedUrl.replace(/^\//, "").replace(/\.html$/, ".md");
      // 把 .html 改为 .md
      const val = rewrites[path] as string;
      // 把 .md 改为 .html
      if (val) {
        const newPath = val.replace(/\.md$/, ".html");
        console.log("redirect to", newPath);
        // 执行重定向
        await router.go(newPath, { replace: true });
        // 返回 false 取消原导航
        return false;
      }
      // 不需要重定向时返回 undefined 或 true
      return true;
    };
    // app.component("MyGlobalComponent" /* ... */);
  },
} satisfies Theme;
