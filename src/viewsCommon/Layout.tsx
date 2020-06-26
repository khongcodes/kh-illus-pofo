//                                                     src/viewsCommon/Layout.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - display organization of children
//  - hold keep track of menu state and define menus


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { LinkShape, SubmenuShape, MenuDataShape } from '../model/MenuShape'
import rawMenuData from '../configData/menuData.json';

import siteLogo from '../images/site-logo.png'

import layoutStyles from '../style/Layout.module.sass';


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               SETUP

// export layout data
export const mobileBreakpoint = 788;
export const maxWindowBreakpoint = 1440;

// assert type for imported JSON data, strings => literal types
const menuData = rawMenuData as MenuDataShape;


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               TYPES

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}
type MenuDataProps = {
  data: (LinkShape | SubmenuShape)[]
}
type MobileMenuControlProps = {
  mobileMenuOpen: boolean;
  handleMobileMenuToggle?: () => void;
  resetMobileMenu: () => void;
}


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// ListItemNavLink: FC
// function: formats NavLinks as list items
//      why: DRY out code
const ListItemNavLink = ({ item, resetMobileMenu }: {
  item: LinkShape;
  resetMobileMenu: () => void;
}) => (
  <li>
    <NavLink to={item.path} onClick={resetMobileMenu}> {item.text} </NavLink>
  </li>
)

// TogglingSubMenu: FC
// function:  creates a submenu usable in SideMenu: FC - toggles open and shut
//      why:  separated logic to its own part of the doc
//            a specialized, higher-functioning version of ListItemNavLink (above)
//            also calls ListItemNavLink for the item prop's subitems
const TogglingSubmenu = ({ item, resetMobileMenu }: { 
  item: SubmenuShape;
  resetMobileMenu: () => void;
 }) => {
  const [submenuOpen, toggleSubmenu] = useState(false);
  const handleSubmenuToggle = () => toggleSubmenu(!submenuOpen)

  return (
    <li>
      <span className={layoutStyles.submenuTitle} onClick={handleSubmenuToggle}>
        {item.text}
      </span>
      
      <ul className={`${layoutStyles.submenuList} ${submenuOpen ? layoutStyles.open : ''}`}>
        {
          item.items.map(subitem => {
            if (subitem.type==='link') {
              return (
                <ListItemNavLink item={subitem} resetMobileMenu={resetMobileMenu} key={subitem.path}/>
              )
            } else { return <></> }
          }
        )}
      </ul>
    </li>
  )
}


// LockedSubmenu: FC
// function: creates shape of submenu, like TogglingSubmenu, but not toggling
//      why: separated out logic
//  PROPOSE: refactor to combine with TogglingSubmenu;
//           Submenu FC with prop - toggling: boolean
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
        } else { return <></> }
      })}
    </ul>
  </li>
)


// mapMenuContent: FC Controller
// function: controller handling calling different list item components switching on type
//      why: have a filter handling input and controlling output before passing data to FCs
const mapMenuContent = (
  data: (LinkShape | SubmenuShape)[],
  submenuType: "toggling" | "locked",
  resetMobileMenu: () => void
  ) => (
  data.map(item => {
    // const linkTriggersMobileMenu = !!resetMobileMenu;

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
    return <></>;
  })
)


// MobileMenuControl: FC
// function: button for toggling mobileMenu. 
//           animates - hamburger <-> X
//      why: semantic clarity in SideMenu
//           to keep in mind the transforming functionality
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


// SideMenu: FC
// function: take in menu config data and give shape to side menu
//           display logo
//           call component controller and MobileMenuControl
//      why: semantic clarity in Layout
const SideMenu = ({ data, mobileMenuOpen, handleMobileMenuToggle, resetMobileMenu }: MenuDataProps & MobileMenuControlProps): JSX.Element => {
  
  return (
    <div className={layoutStyles.sideMenuContainer} >
      {/* Site Logo */}
      <Link to='/'>
        <img 
          src={siteLogo}
          id={layoutStyles.siteLogo}
          alt="K Hong Draws - website logo"
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


// MobileMenuDrawer: FC
// function: take in menu config data and give shape to mobile menu
//      why: semantic clarity in Layout
const MobileMenuDrawer = ({ data, mobileMenuOpen, resetMobileMenu }: MenuDataProps & MobileMenuControlProps): JSX.Element => {
  return (
    <div className={`${layoutStyles.mobileMenuContainer} ${mobileMenuOpen ? layoutStyles.open : ''}`} >
      <ul>
        {mapMenuContent(data, "locked", resetMobileMenu)}
      </ul>
    </div>
  )
}

// Layout: FC(main)
// function: handle menu states (is mobile menu open?)
//           give whole app shape
//      why: DRY out code in pages
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, toggleMobileMenu] = useState(false);
  const handleMobileMenuToggle = () => toggleMobileMenu(!mobileMenuOpen)
  const resetMobileMenu = () => toggleMobileMenu(false)

  return (
    <>
      <MobileMenuDrawer 
        data = {menuData} 
        mobileMenuOpen = {mobileMenuOpen}
        resetMobileMenu = {resetMobileMenu}
      />

      <div id={layoutStyles.appLayout} >
        <SideMenu 
          data = {menuData} 
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