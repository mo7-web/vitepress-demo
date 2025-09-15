import rewritesJson from "./rewrites.json";
import srcExcludeJson from "./srcExclude.json";

type rewritesType = {
  [key: string]: string;
};

type srcExcludeType = string[];

export const rewrites = rewritesJson as rewritesType;
export const srcExclude = srcExcludeJson as srcExcludeType;
