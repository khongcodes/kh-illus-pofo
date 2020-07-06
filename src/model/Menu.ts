// type management for configData/menuData
export type LinkShape = {
  type: 'link';
  text: string;
  path: string;
};

export type SubmenuShape = {
  type: 'submenu';
  text: string;
  items: (LinkShape|SubmenuShape)[];
};

export type MenuDataShape = (LinkShape|SubmenuShape)[];


/////////////////////////////////////////////////////////////////////
// prop-type management for viewsCommon/Layout Layout component
export type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode,
}
export type MenuDataProps = {
  data: (LinkShape | SubmenuShape)[];
}

export type MobileMenuControlProps = {
  mobileMenuOpen: boolean;
  handleMobileMenuToggle?: () => void;
  resetMobileMenu: () => void;
}

export type ListItemNavLinkProps = {
  item: LinkShape;
  resetMobileMenu: VoidFunction;
  tabIndex: number;
}

export type ListItemSubmenuProps = {
  item: SubmenuShape;
  resetMobileMenu: VoidFunction;
  tabIndex: number,
}

