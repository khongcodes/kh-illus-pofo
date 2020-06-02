import React from 'react';
import { NavLink } from 'react-router-dom';

import layoutStyles from '../style/Layout.module.sass';

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}

const sideMenu = () => (
  <div></div>
)

const mobileMenuDrawer = () => (
  <div></div>
)

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={layoutStyles.root} >
    {}
    {children}
  </div>
)

export default Layout