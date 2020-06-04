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

export type MenuDataShape = (LinkShape|SubmenuShape)[];