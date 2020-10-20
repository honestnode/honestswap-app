import React from 'react';
import {MintPage, OverviewPage, RedeemPage, SavePage, SwapPage} from '../pages';

export interface Route {
  path: string;
  title: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  navigator?: boolean;
}

export const routes: Route[] = [
  {path: '/', title: 'Home', component: OverviewPage, exact: true, navigator: true},
  {path: '/mint', title: 'Mint', component: MintPage, navigator: true},
  {path: '/save', title: 'Save', component: SavePage, navigator: true},
  {path: '/swap', title: 'Swap', component: SwapPage, navigator: true},
  {path: '/redeem', title: 'Redeem', component: RedeemPage, navigator: true}
];