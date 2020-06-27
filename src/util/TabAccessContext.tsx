import React, { createContext, useState } from 'react';

type ChildProps = { children: React.ReactNode[] | React.ReactNode }

type TabAccessConsumers = "lightbox" | "sideMenu" | "mobileMenu";
type TabAccessType = { [key in TabAccessConsumers]: number };
// lightbox: number;
// sideMenu: number;
// mobileMenu: number;

type TabAccessMode = "default" | "lightbox" | "mobileMenu";
export type TabAccessSchemeType = { [key in TabAccessMode]: TabAccessType }
// default: TabAccessType; 
// lightbox: TabAccessType;
// mobileMenu: TabAccessType;

export type TabAccessContextType = {
  scheme: TabAccessSchemeType;
  tabAccessMode: TabAccessMode;
  setTabAccessMode: (string: TabAccessMode) => void;
}

const tabAccessScheme = {
  default: {
    lightbox: -1,
    sideMenu: 0,
    mobileMenu: -1
  },
  lightbox: {
    lightbox: 0,
    sideMenu: -1,
    mobileMenu: -1
  },
  mobileMenu: {
    lightbox: -1,
    sideMenu: -1,
    mobileMenu: 0
  }
};

const uselessTabAccessContext: TabAccessContextType = {
  scheme: tabAccessScheme,
  tabAccessMode: "default",
  setTabAccessMode: (string: TabAccessMode) => {}
}

export const TabAccessContext = createContext<TabAccessContextType>(uselessTabAccessContext);

const TabAccessProvider = ({children}: ChildProps) => {
  
  const [tabAccessMode, setTabAccessMode] = useState<TabAccessMode>("default");
  
  const defaultTabAccessContext: TabAccessContextType = {
    scheme: tabAccessScheme,
    tabAccessMode: tabAccessMode,
    setTabAccessMode: setTabAccessMode
  }

  return (
    <TabAccessContext.Provider value={defaultTabAccessContext}>
      {children}
    </TabAccessContext.Provider>
  )
};

export default TabAccessProvider;