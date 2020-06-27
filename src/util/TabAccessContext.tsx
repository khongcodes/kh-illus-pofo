import React, { createContext, useContext, useState } from 'react';

type ChildProps = {
  children: React.ReactNode[] | React.ReactNode,
}

type TabAccessConsumers = "lightbox" | "sideMenu" | "mobileMenu";
type TabAccessType = { [key in TabAccessConsumers]: number;
  // lightbox: number;
  // sideMenu: number;
  // mobileMenu: number;
};

type TabAccessMode = "default" | "lightbox" | "mobileMenu";

export type TabAccessSchemeType = { [key in TabAccessMode]: TabAccessType;
  // default: TabAccessType; 
  // lightbox: TabAccessType;
  // mobileMenu: TabAccessType;
}

export type TabAccessContextType = {
  scheme: TabAccessSchemeType;
  tabAccessMode: TabAccessMode;
  setTabAccess: (string: TabAccessMode) => void;
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

const defaultTabAccessContext: TabAccessContextType = {
  scheme: tabAccessScheme,
  tabAccessMode: "default",
  setTabAccess: (string: TabAccessMode) => {}
}

export const TabAccessContext = createContext<TabAccessContextType>(defaultTabAccessContext);

const TabAccessProvider = ({children}: ChildProps) => {
  const [tabAccessMode, setTabAccessMode] = useState<TabAccessMode>("default");
  const toggleTabAccessMode = (string: TabAccessMode) => setTabAccessMode(string);

  return (
    <TabAccessContext.Provider value={{
      scheme: tabAccessScheme,
      tabAccessMode: tabAccessMode,
      setTabAccess: toggleTabAccessMode
    }}>
      {children}
    </TabAccessContext.Provider>
  )
};

export default TabAccessProvider;