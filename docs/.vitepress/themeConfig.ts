export const nav = [
  { text: "Home", link: "/" },
  { text: "Examples", link: "/markdown-examples" },
  {
    text: "Dropdown Menu",
    items: [
      { text: "About", link: "/about/" },
      { text: "PostgreSQL", link: "/PostgreSQL/1.安装和部署" },
      {
        text: "theory",
        items: [
          { text: "About", link: "/about" },
          { text: "bookmark", link: "/bookmark" },
          { text: "coder", link: "/coder" },
          { text: "misc", link: "/misc" },
          { text: "self_manage", link: "/self_manage" },
          { text: "theory", link: "/theory" },
        ],
      },
    ],
  },
];

export const sidebar = {
  "/": [
    {
      text: "Examples",
      items: [
        { text: "Markdown Examples", link: "/markdown-examples" },
        { text: "Runtime API Examples", link: "/api-examples" },
      ],
    },
  ],
  "/about/": [
    {
      text: "about",
      collapsed: true,
      items: [
        { text: "Index", link: "/about/" },
        { text: "关于本站", link: "/about/website" },
        { text: "关于我", link: "/about/me" },
      ],
    },
  ],
  "/PostgreSQL/": [
    {
      text: "PostgreSQL",
      collapsed: true,
      items: [
        { text: "1.安装和部署", link: "/PostgreSQL/1.安装和部署" },
        { text: "2.基本使用", link: "/PostgreSQL/2.基本使用" },
        { text: "3.模式的增删改查", link: "/PostgreSQL/3.模式的增删改查" },
        {
          text: "4.插入你的第一条数据",
          link: "/PostgreSQL/4.插入你的第一条数据",
        },
        { text: "5.TABLE的增删改查", link: "/PostgreSQL/5.TABLE的增删改查" },
        { text: "6.数据的增删改查", link: "/PostgreSQL/6.数据的增删改查" },
        {
          text: "7.SQL常用关键字及示例",
          link: "/PostgreSQL/7.SQL常用关键字及示例",
        },
      ],
    },
  ],
};
