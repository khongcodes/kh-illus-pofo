const itemTypeList = ['link', 'submenu'] as const;
export type ItemType = typeof itemTypeList[number];

// type is 'link'
export type LinkShape = {
  type: string;
  text: string;
  path: string;
};

// type is 'submenu'
export type SubmenuShape = {
  type: string;
  text: string;
  items: (LinkShape|SubmenuShape)[];
};
