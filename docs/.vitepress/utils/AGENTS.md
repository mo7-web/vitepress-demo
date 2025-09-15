# utils 文件说明

## permalink 的实现思路

1. 基于 `rewrites` 路径重定向实现 permalink 功能
2. 基于 `srcExclude` 属性实现草稿排除功能

扫描 `docs` 目录下的所有 md 文件，提取出 frontmatter 中的 permalink 字段，生成 `rewrites` 和 `srcExclude`，并写入到 `docs/.vitepress/data/` 目录下。

```json title="rewrites.json"
{
  "about/me.md": "about/关于我.md",
  "about/website.md": "about/关于本站.md"
}
```

```json title="srcExclude.json"
["PostgreSQL/2.基本使用.md"]
```

然后在 vitepress 配置文件中引用。
`rewrites` 属性会更改页面的编译路径，如 `/about/关于我.md` => `about/me.md` 路径下。

但是，如果在其他页面中使用 `[关于我](./关于我.md)` 进行页面链接，在开发阶段 vitepress 中会处理重定向，但是编译结果会直接跳转 `/about/关于我.md` 并 404 。

于是在 `docs/.vitepress/theme/index.ts` 中手动实现一下路由重定向，确保在开发和编译阶段都能正确跳转。

但是，这会导致一个问题，爬虫在爬取 `[关于我](./关于我.md)` 时也会 出现 404 问题。

于是通过 `refresh.html` 模板动态生成重定向页面，确保爬虫也能正确跳转。
