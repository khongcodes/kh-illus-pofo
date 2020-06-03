import React from 'react';
import { NavLink } from 'react-router-dom';

import menuData from '../configData/menuData.json';
import { ItemType, LinkShape, SubmenuShape } from '../model/MenuShape'

import layoutStyles from '../style/Layout.module.sass';


type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}
type MenuProps = {
  data: (LinkShape|SubmenuShape)[]
}


const SideMenu = ({ data }: MenuProps) => (
  <div>
    side menu
  </div>
)

const MobileMenuDrawer = ({ data }: MenuProps) => {
  
  const menuContent = data.map(item => {
    switch (item.type) {
      case "link":
        return (
          <div>
            {item.text}
          </div>
        );
      case "submenu":
        return (
          <div>
            {item.text}
          </div>
        );
    }
  })

  return (
    <div className={layoutStyles.mobileMenuContainer} >
      <ul>
        {menuContent}
      </ul>
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <MobileMenuDrawer data={menuData} />

    <div className={layoutStyles.pageContentContainer} >
      {children}
    </div>
  </>
)

export default Layout