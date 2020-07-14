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

import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { 
  LinkShape, SubmenuShape, MenuDataShape,               // data handling
  LayoutProps, MenuDataProps, MobileMenuControlProps,   // main component prop types 
  ListItemNavLinkProps, ListItemSubmenuProps            // sub component prop types
} from '../model/Menu';
import rawMenuData from '../configData/menuData.json';

import { TabAccessContext } from '../util/TabAccessContext';
import siteLogo from '../assets/images/site-logo.png'
import useWindowDimensions from '../util/UseWindowDimensions';

import layoutStyles from '../assets/style/Layout.module.sass';

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               SETUP

// export layout data
export const mobileBreakpoint = 788;
export const maxWindowBreakpoint = 1440;

// assert type for imported JSON data, strings => literal types
const menuData = rawMenuData as MenuDataShape;


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// ListItemNavLink: FC
// function: formats NavLinks as list items
//      why: DRY out code
const ListItemNavLink = ({ item, resetMobileMenu, tabIndex }: ListItemNavLinkProps) => {
  // get tabAccess information corresponding to passed-in menuType
  return (
    <li>
      <NavLink 
        to={item.path} 
        onClick={resetMobileMenu}
        tabIndex={tabIndex}
      > 
        {item.text} 
      </NavLink>
    </li>
  )
}

// TogglingSubMenu: FC
// function:  creates a submenu usable in SideMenu: FC - toggles open and shut
//      why:  separated logic to its own part of the doc
//            a specialized, higher-functioning version of ListItemNavLink (above)
//            also calls ListItemNavLink for the item prop's subitems
const TogglingSubmenu = ({ item, resetMobileMenu, tabIndex }: ListItemSubmenuProps) => {
  const [submenuOpen, toggleSubmenu] = useState(false);
  const handleSubmenuToggle = () => toggleSubmenu(!submenuOpen)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmenuToggle();
    }
  }
  return (
    <li>
      <button 
        className={layoutStyles.submenuTitle} 
        onClick={handleSubmenuToggle}
        onKeyPress={handleKeyPress}
        tabIndex={tabIndex}
        aria-label="Open Comics submenu"
      >
        {item.text}
      </button>
      
      <ul className={`${layoutStyles.submenuList} ${submenuOpen ? layoutStyles.open : ''} ${submenuOpen}`}>
        {
          item.items.map(subitem => {
            if (subitem.type==='link') {
              return (
                <ListItemNavLink
                  key={subitem.path}
                  item={subitem} 
                  {...{resetMobileMenu, tabIndex}}
                />
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
const LockedSubmenu = ({ item, resetMobileMenu, tabIndex }: ListItemSubmenuProps) => (
  <li>
    {item.text}
    <ul className={layoutStyles.lockedSubmenu}>
      {item.items.map(subitem => {
        if (subitem.type==='link') {
          return (
            <ListItemNavLink
              key={subitem.path}
              item={subitem}
              {...{resetMobileMenu, tabIndex}}
            />
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
  menuType: "sideMenu" | "mobileMenu",
  submenuType: "toggling" | "locked",
  resetMobileMenu: () => void
  ) => (
  data.map(item => {
    // call useContext just when creating items for a list
    // not once in each individual list item
    // child component doesn't need to know what menuType it's in
    const tabAccessControl = useContext(TabAccessContext);
    const tabIndex = tabAccessControl.scheme[tabAccessControl.tabAccessMode][menuType];
    // const linkTriggersMobileMenu = !!resetMobileMenu;
    switch(item.type) {

      case "link":
        return (
          <ListItemNavLink 
            key={item.path}
            {...{item, resetMobileMenu, tabIndex}}
          />
        )

      case "submenu":
        switch (submenuType) {
          case "toggling":
            return (
              <TogglingSubmenu 
                key={item.text}
                {...{item, resetMobileMenu, tabIndex}}
              />
            )
          case "locked":
            return (
              <LockedSubmenu
                key={item.text} 
                {...{item, resetMobileMenu, tabIndex}}
              />
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
  const { windowWidth } = useWindowDimensions();
  return (
    <div 
      className={`${layoutStyles.mobileMenuControlContainer} ${mobileMenuOpen ? layoutStyles.open : ''}`}
      onClick={handleMobileMenuToggle}
      tabIndex={windowWidth <= mobileBreakpoint ? 0 : 1}
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
  const tabAccessControl = useContext(TabAccessContext);
  const sideMenuTabIndexState = tabAccessControl.scheme[tabAccessControl.tabAccessMode].sideMenu;
  // console.log(tabAccessControl);
  // console.log(tabAccessControl.scheme[tabAccessControl.tabAccessMode].sideMenu);
  return (
    <div className={layoutStyles.sideMenuContainer} >
      {/* Site Logo */}
      <Link 
        to='/'
        tabIndex={sideMenuTabIndexState}
      >
        <img 
          src={siteLogo}
          id={layoutStyles.siteLogo}
          alt="K Hong Draws - website logo"
        />
      </Link>
      
      {/* Side menu, display:none on mobile-media */}
      <ul className={ `${layoutStyles.sideMenuList} sidemenu` }>
        {mapMenuContent(data, "sideMenu", "toggling", resetMobileMenu)}
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
      <ul className="mobilemenu">
        {mapMenuContent(data, "mobileMenu", "locked", resetMobileMenu)}
      </ul>
    </div>
  )
}



// Layout: FC(main)
// function: handle menu states (is mobile menu open?)
//           give whole app shape
//      why: DRY out code in pages
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, toggleMobileMenu] = useState<boolean>(false);
  const tabAccessControl = useContext(TabAccessContext);
  
  const handleMobileMenuToggle = () => {
    tabAccessControl.switchTabAccessMode("mobileMenu");
    toggleMobileMenu(!mobileMenuOpen);
  };

  const resetMobileMenu = () => toggleMobileMenu(false);

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