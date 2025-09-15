// 读取某个目录下的全部的markdown文件的frontmatter
import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { rewrites } from "../data/index";
import template from "art-template";

type opt = {
  srcDir: string;
};

type FrontmatterResult<T = any> = {
  relativePath: string;
  permalink?: string;
  exclude?: boolean;
};

/**
 * 递归读取目录下所有 .md / .mdx 文件，解析 frontmatter
 * @param opt.srcDir - 要遍历的源目录（绝对或相对路径）
 * @returns FrontmatterResult 数组
 *
 * 示例:
 * ```ts
 * const results = GetAllFrontmatter({ srcDir: path.resolve(__dirname, "../docs") });
 * console.log(results[0].data.title);
 * ```
 */
export function GetFrontmatter<T = any>(opt: opt): Array<FrontmatterResult<T>> {
  const root = path.resolve(opt.srcDir);
  const results: Array<FrontmatterResult<T>> = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const fullPath = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!ent.isFile()) {
        continue;
      }

      const ext = path.extname(ent.name).toLowerCase();
      if (ext !== ".md" && ext !== ".mdx") {
        continue;
      }

      try {
        const raw = fs.readFileSync(fullPath, "utf8");
        const parsed = matter(raw);
        var mdPath = path.relative(root, fullPath);
        var resultsObj: FrontmatterResult = {
          relativePath: mdPath.replace(/\\/g, "/"),
        };
        if (parsed.data) {
          if (parsed.data.permalink) {
            resultsObj.permalink = parsed.data.permalink + path.extname(mdPath);
          }
          if (parsed.data.exclude) {
            resultsObj.exclude = parsed.data.exclude;
          }
        }
        results.push(resultsObj);
      } catch (e) {
        // 非阻塞性错误处理：记录到控制台并继续
        // 使用者可以替换为更复杂的日志系统
        // eslint-disable-next-line no-console
        console.error(`Failed to read/parse markdown file: ${fullPath}`, e);
      }
    }
  }

  if (!fs.existsSync(root)) {
    throw new Error(`GetAllFrontmatter: srcDir does not exist: ${opt.srcDir}`);
  }
  walk(root);
  return results;
}

type rewrites = {
  [key: string]: string;
};

type GenerateRewritesReturn = {
  rewrites: rewrites;
  srcExclude: string[];
};

export function GenerateRewrites(opt: opt): GenerateRewritesReturn {
  const list = GetFrontmatter(opt);

  const rewrites: rewrites = {
    // "about/关于本站.md": "about/website.md",
    // "about/关于我.md": "about/me.md",
  };

  const srcExclude: string[] = [
    // "PostgreSQL/2.基本使用.md"
  ];
  list.forEach((item) => {
    if (item.permalink) {
      rewrites[item.relativePath] = item.permalink;
    }
    if (item.exclude) {
      srcExclude.push(item.relativePath);
    }
  });
  const dataDir = path.resolve(opt.srcDir, ".vitepress", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirpSync(dataDir);
  }
  const rewritesFile = path.resolve(dataDir, "rewrites.json");
  fs.writeFileSync(rewritesFile, JSON.stringify(rewrites, null, 2), "utf8");
  const srcExcludeFile = path.resolve(dataDir, "srcExclude.json");
  fs.writeFileSync(srcExcludeFile, JSON.stringify(srcExclude, null, 2), "utf8");
  return {
    rewrites,
    srcExclude,
  };
}

export function GenerateStaticHtml(siteConfig: any) {
  const TemplatePath = path.resolve(__dirname, "RedirectPage.html");

  const writeDir = path.resolve(siteConfig.outDir);
  if (!fs.existsSync(writeDir)) {
    fs.mkdirpSync(writeDir);
  }

  if (rewrites && typeof rewrites == "object") {
    for (const from in rewrites) {
      const writeFilePath = from.replace(/\.md$/, ".html");
      // 补全路径
      const fullWritePath = path.resolve(writeDir, writeFilePath);
      const dataPath = "/" + (rewrites as any)[from].replace(/\.md$/, ".html");

      var htmlCont = template(TemplatePath, {
        ToPath: dataPath,
      });

      fs.writeFileSync(fullWritePath, htmlCont, "utf8");
    }
  }
}
