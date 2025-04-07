import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {BottomTabNavigatorProp} from '@react-navigation/bottom-tabs';
export type RootStackParamList = {
  DRAWER: NavigatorScreenParams<DrawerStackParamList>;
};
export type DrawerStackParamList = {
  HOME: NavigatorScreenParams<HomeStackParamList>;
};
export type HomeStackParamList = {
  HOME_SCREEN: undefined;
};

export type RoutesType = RootStackParamList;

export type RootStackScreenProp<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DrawerStackScreenProps<T extends keyof DrawerStackParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerStackParamList, T>,
    RootStackScreenProp<keyof RootStackParamList>
  >;
export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
  BottomTabNavigatorProp<HomeStackParamList, T>,
    CompositeScreenProps<
      DrawerStackScreenProps<keyof DrawerStackParamList>,
      RootStackScreenProp<keyof RootStackParamList>
    >
  >;
