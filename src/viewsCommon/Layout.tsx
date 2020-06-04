import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// import menuData from '../configData/menuData.json';
import { muddyMenuData, LinkShape, SubmenuShape } from '../model/MenuShape'

import siteLogo from '../images/site-logo.png'

import layoutStyles from '../style/Layout.module.sass';


type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}
type MenuDataProps = {
  data: (LinkShape|SubmenuShape)[]
}
type MobileMenuControlProps = {
  mobileMenuOpen: boolean;
  handleMobileMenuToggle?: () => void;
  resetMobileMenu: () => void;
}

const ListItemNavLink = ({ item, resetMobileMenu }: {
  item: LinkShape;
  resetMobileMenu: () => void;
}) => (
  <li>
    <NavLink to={item.path} onClick={resetMobileMenu}> {item.text} </NavLink>
  </li>
)

const TogglingSubmenu = ({ item, resetMobileMenu }: { 
  item: SubmenuShape;
  resetMobileMenu: () => void;
 }) => {
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
                <ListItemNavLink item={subitem} resetMobileMenu={resetMobileMenu} key={subitem.path}/>
              )
            }
          }
        )}
      </ul>
    </li>
  )
}

const LockedSubmenu = ({ item, resetMobileMenu }: {
  item: SubmenuShape;
  resetMobileMenu: () => void;
}) => (
  <li>
    {item.text}
    <ul>
      {item.items.map(subitem => {
        if (subitem.type==='link') {
          return (
            <ListItemNavLink item={subitem} resetMobileMenu={resetMobileMenu} key={subitem.path}/>
          )
        }
      })}
    </ul>
  </li>
)

const mapMenuContent = (
  data: (LinkShape|SubmenuShape)[],
  submenuType: "toggling"|"locked",
  resetMobileMenu: () => void
  ) => (
  data.map(item => {
    const linkTriggersMobileMenu = !!resetMobileMenu;

    switch(item.type) {

      case "link":
        return (
          <ListItemNavLink item={item} resetMobileMenu={resetMobileMenu} key={item.path}/>
        )

      case "submenu":
        switch (submenuType) {
          case "toggling":
            return (
              <TogglingSubmenu item={item} key={item.text} resetMobileMenu={resetMobileMenu}/>
            )
          case "locked":
            return (
              <LockedSubmenu item={item} key={item.text} resetMobileMenu={resetMobileMenu}/>
            )
        }
    }
  })
)

const MobileMenuControl = ({ mobileMenuOpen, handleMobileMenuToggle }: MobileMenuControlProps) => {
  return (
    <div 
      className={`${layoutStyles.mobileMenuControlContainer} ${mobileMenuOpen ? layoutStyles.open : ''}`}
      onClick={handleMobileMenuToggle}
    >
      <div className={layoutStyles.bar1}/>
      <div className={layoutStyles.bar2}/>
      <div className={layoutStyles.bar3}/>
    </div>
  )
}

const SideMenu = ({ data, mobileMenuOpen, handleMobileMenuToggle, resetMobileMenu }: MenuDataProps & MobileMenuControlProps): JSX.Element => {
  
  return (
    <div className={layoutStyles.sideMenuContainer} >
      {/* Site Logo */}
      <Link to='/'>
        <img 
          src={siteLogo}
          id={layoutStyles.siteLogo}
        />
      </Link>
      
      {/* Side menu, display:none on mobile-media */}
      <ul className={layoutStyles.sideMenuList}>
        {mapMenuContent(data, "toggling", resetMobileMenu)}
      </ul>

      {/* Toggle mobile menu, display:none on desktop-media */}
      <MobileMenuControl 
        mobileMenuOpen={mobileMenuOpen}
        handleMobileMenuToggle={handleMobileMenuToggle}
        resetMobileMenu={resetMobileMenu}
      />
    </div>
  )
}

const MobileMenuDrawer = ({ data, mobileMenuOpen, resetMobileMenu }: MenuDataProps & MobileMenuControlProps): JSX.Element => {
  return (
    <div className={`${layoutStyles.mobileMenuContainer} ${mobileMenuOpen ? layoutStyles.open : ''}`} >
      <ul>
        {mapMenuContent(data, "locked", resetMobileMenu)}
      </ul>
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);
  const handleMobileMenuToggle = () => toggleMobileMenu(!mobileMenuOpen)
  const resetMobileMenu = () => toggleMobileMenu(false)

  return (
    <>
      <MobileMenuDrawer 
        data = {muddyMenuData} 
        mobileMenuOpen = {mobileMenuOpen}
        resetMobileMenu = {resetMobileMenu}
      />

      <div id={layoutStyles.appLayout} >
        <SideMenu 
          data = {muddyMenuData} 
          mobileMenuOpen = {mobileMenuOpen}
          handleMobileMenuToggle = {handleMobileMenuToggle}
          resetMobileMenu = {resetMobileMenu}
        />
        <div id={layoutStyles.pageContentContainer}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout