import React from 'react';
import {Mint, Overview, Redeem, Save, Swap} from './pages';

export interface Route {
  path: string;
  title: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  navigator?: boolean;
}

export const routes: Route[] = [
  {path: '/', title: 'Home', component: Overview, exact: true, navigator: true},
  {path: '/mint', title: 'Mint', component: Mint, navigator: true},
  {path: '/save', title: 'Save', component: Save, navigator: true},
  {path: '/swap', title: 'Swap', component: Swap, navigator: true},
  {path: '/redeem', title: 'Redeem', component: Redeem, navigator: true}
];