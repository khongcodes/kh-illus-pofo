//                                                  src/util/TabAccessContext.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Create and manage context for controlling tabIndex between
//    lightbox, sideMenu, and mobileMenu

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages

import React, { createContext, useState } from 'react';

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               SETUP

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
  prevTabAccessMode: TabAccessMode;
  switchTabAccessMode: (string: TabAccessMode) => void;
}


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

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
  prevTabAccessMode: "default",
  switchTabAccessMode: (string: TabAccessMode) => {}
}

export const TabAccessContext = createContext<TabAccessContextType>(uselessTabAccessContext);

const TabAccessProvider = ({children}: ChildProps) => {
  
  const [tabAccessMode, setTabAccessMode] = useState<TabAccessMode>("default");
  const [prevTabAccessMode, setPrevTabAccessMode] = useState<TabAccessMode>("default");

  const switchTabAccessMode = (consumerCaller: TabAccessMode): void => {
    // if the current mode is already this caller: revert it to previous tab state
    // otherwise set it to this caller
    const newTabAccessMode = tabAccessMode !== consumerCaller ? consumerCaller : prevTabAccessMode;
    setPrevTabAccessMode(tabAccessMode);
    setTabAccessMode(newTabAccessMode);
  };

  const defaultTabAccessContext: TabAccessContextType = {
    scheme: tabAccessScheme,
    tabAccessMode: tabAccessMode,
    prevTabAccessMode: prevTabAccessMode,
    switchTabAccessMode: switchTabAccessMode
  }

  return (
    <TabAccessContext.Provider value={defaultTabAccessContext}>
      {children}
    </TabAccessContext.Provider>
  )
};

export default TabAccessProvider;