import React from 'react';
import {AppBar} from './AppBar';
import {NavigationBar} from './NavigationBar';
import {NavigationItemProps} from './NavigationItem';

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