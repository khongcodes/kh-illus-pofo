import React from 'react';

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    test message layout
    {children}
  </div>
)

export default Layout