import React, {forwardRef, memo} from 'react';
import {DrawerStackScreenProps, HomeStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDrawerProgress} from '@react-navigation/drawer';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Animated from 'react-native-reanimated';
import {ROUTER_HOME} from './routers';
import {StyleSheet, Text, View} from 'react-native';

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
        [0, 20, 40],
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
          initialRouteName={ROUTER_HOME.HOME_SCREEN}
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'transperant',
            },
            gestureEnabled: false,
          }}>
          <Stack.Screen
            name={ROUTER_HOME.HOME_SCREEN}
            component={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Home</Text>
              </View>
            )}
          />
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
