import React from 'react';
import {AppBar} from './app-bar';
import {Navigation, NavigationBar} from './navigation-bar';

export interface FrameProps {
  navigations: Navigation[]
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