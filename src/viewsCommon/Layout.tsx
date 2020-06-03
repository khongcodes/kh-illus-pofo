import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// import menuData from '../configData/menuData.json';
import { muddyMenuData, LinkShape, SubmenuShape } from '../model/MenuShape'

import layoutStyles from '../style/Layout.module.sass';


type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}
type MenuProps = {
  data: (LinkShape|SubmenuShape)[]
}

const TogglingSubmenu = ({ item }: { item: SubmenuShape }) => {
  const [submenuOpen, toggleSubmenu] = useState(false);
  const handleSubmenuToggle = () => toggleSubmenu(!submenuOpen)

  return (
    <li>
      <span
        className={layoutStyles.submenuTitle}
        onClick={handleSubmenuToggle}
      >
        {item.text}
      </span>
      
      <ul className={`${layoutStyles.submenuList} ${submenuOpen ? layoutStyles.open : ''}`}>
        {
          item.items.map(subitem => {
            if (subitem.type==='link') {
              return (
                <li key={subitem.path}>
                  <NavLink to={subitem.path}> {subitem.text} </NavLink>
                </li>
              )   
            }
          }
        )}
      </ul>
    </li>
  )
}

const LockedSubmenu = ({ item }: { item: SubmenuShape }) => (
  <li>
    {item.text}
    <ul>
      {item.items.map(subitem => {
        if (subitem.type==='link') {
          return (
            <li key={subitem.path}>
              <NavLink to={subitem.path}> {subitem.text} </NavLink>
            </li>
          )
        }
      })}
    </ul>
  </li>
)

const mapMenuContent = (
  data: (LinkShape|SubmenuShape)[],
  submenuType: "toggling"|"locked"
  ) => (
  data.map(item => {
    switch(item.type) {

      case "link":
        return (
          <li key={item.path}>
            <NavLink to={item.path}> {item.text} </NavLink>
          </li>
        );

      case "submenu":
        switch (submenuType) {
          case "toggling":
            return (
              <TogglingSubmenu item={item} key={item.text}/>
            )
          case "locked":
            return (
              <LockedSubmenu item={item} key={item.text}/>
            )
        }
    }
  })
)

const SideMenu = ({ data }: MenuProps): JSX.Element => {
  return (
    <div className={layoutStyles.sideMenuContainer} >
      <ul className={layoutStyles.sideMenuList}>
        {mapMenuContent(data, "toggling")}
      </ul>
    </div>
  )
}

const MobileMenuDrawer = ({ data }: MenuProps): JSX.Element => {
  return (
    <div className={layoutStyles.mobileMenuContainer} >
      <ul>
        {mapMenuContent(data, "locked")}
      </ul>
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <MobileMenuDrawer data={muddyMenuData} />

    <div id={layoutStyles.appLayout} >
      <SideMenu data={muddyMenuData} />
      <div id={layoutStyles.pageContentContainer}>
        {children}
      </div>
    </div>
  </>
)

export default Layout