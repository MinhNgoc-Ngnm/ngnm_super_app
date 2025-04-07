import {
  DrawerStackParamList,
  HomeStackParamList,
  RootStackParamList,
} from './types';

type Entries<T> = {
  [K in keyof T]: K;
};
export const ROUTER_ROOT: Entries<RootStackParamList> = {
  DRAWER: 'DRAWER',
};
export const ROUTER_DRAWER: Entries<DrawerStackParamList> = {
  HOME: 'HOME',
};
export const ROUTER_HOME: Entries<HomeStackParamList> = {
  HOME_SCREEN: 'HOME_SCREEN',
};
