import React from 'react';
import {AppBar} from './app-bar';
import {NavigationBar} from './navigation-bar';
import {NavigationItemProps} from './navigation-item';

export interface FrameProps {
  navigations: NavigationItemProps[];
  account?: string;
}

export const Frame: React.FC<FrameProps> = (props) => {
  const {navigations, account, children} = props;
  return (
    <>
      <AppBar account={account}/>
      <NavigationBar items={navigations}/>
      <main>{children}</main>
    </>
  );
};