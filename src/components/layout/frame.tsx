import React from 'react';
import {AppBar} from './app-bar';
import {NavigationBar} from './navigation-bar';
import {NavigationItemProps} from './navigation-item';

export interface FrameProps {
  navigations: NavigationItemProps[];
}

export const Frame: React.FC<FrameProps> = (props) => {
  const {navigations, children} = props;
  return (
    <>
      <AppBar/>
      <NavigationBar items={navigations}/>
      <main>{children}</main>
    </>
  );
};