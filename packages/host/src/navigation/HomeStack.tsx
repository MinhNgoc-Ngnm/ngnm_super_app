import React, {forwardRef, memo} from 'react';
import {DrawerStackScreenProps, HomeStackParamList} from './types';
import {useDrawerProgress} from '@react-navigation/drawer';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Animated from 'react-native-reanimated';
import {ROUTER_HOME} from './routers';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeBottomTabar from './components/HomeBottomTabar';
import HomeScreen from '../screens/HomeScreen';

const Stack = createBottomTabNavigator<HomeStackParamList>();

export interface HomeStackScreenProps extends DrawerStackScreenProps<'HOME'> {}
export type HomeStackScreenRef = {};

const HomeStack = forwardRef<HomeStackScreenRef, HomeStackScreenProps>(
  (props, _ref) => {
    const {} = props;

    const drawerProgress = useDrawerProgress();
    const rootStyled = useAnimatedStyle(() => {
      const scale = interpolate(
        drawerProgress.value,
        [0, 0.5, 1],
        [1, 0.9, 0.8],
        Extrapolation.CLAMP,
      );
      const borderRadius = interpolate(
        drawerProgress.value,
        [0, 0.5, 1],
        [0, 8, 16],
        Extrapolation.CLAMP,
      );
      return {
        borderRadius,
        transform: [{scale: scale}],
      };
    }, []);
    return (
      <Animated.View style={[styles.root, rootStyled]}>
        <Stack.Navigator
          detachInactiveScreens
          backBehavior="none"
          initialRouteName={ROUTER_HOME.HOME_SCREEN}
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBar={p => <HomeBottomTabar {...p} />}
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'transperant',
            },
          }}>
          <Stack.Screen name={ROUTER_HOME.HOME_SCREEN} component={HomeScreen} />
        </Stack.Navigator>
      </Animated.View>
    );
  },
);

export default memo(HomeStack);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transperant',
    overflow: 'hidden',
  },
});
