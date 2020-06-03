const itemTypeList = ['link', 'submenu'] as const;
export type ItemType = typeof itemTypeList[number];

// type is 'link'
export type LinkShape = {
  type: 'link';
  text: string;
  path: string;
};

// type is 'submenu'
export type SubmenuShape = {
  type: 'submenu';
  text: string;
  items: (LinkShape|SubmenuShape)[];
};

export const muddyMenuData: (LinkShape|SubmenuShape)[] = [
  {
    type: "link",
    text: "Illustration",
    path: "/"
  },
  {
    type: "link",
    text: "Pen & Ink",
    path: "/pen-ink"
  },
  {
    type: "submenu",
    text: "Comics",
    items: [
      {
        type: "link",
        text: "Snake",
        path: "/comics/snake"
      },
      {
        type: "link",
        text: "Darkest Knife",
        path: "/comics/darkest-knife"
      },
      {
        type: "link",
        text: "etc.",
        path: "/comics/etc"
      }
    ]
  },
  {
    type: "link",
    text: "Sketchbook",
    path: "/sketchbook"
  },
  {
    type: "link",
    text: "About",
    path: "/about"
  }
]
