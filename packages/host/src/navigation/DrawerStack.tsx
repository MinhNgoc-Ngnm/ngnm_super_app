import React, {forwardRef, memo, useCallback} from 'react';
import {DrawerStackParamList, RootStackScreenProp} from './types';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {StyleSheet, View, Text} from 'react-native';
import {ROUTER_DRAWER} from './routers';
import HomeStack from './HomeStack';
import {verticalScale} from 'react-native-size-matters';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export interface DrawerStackProps extends RootStackScreenProp<'DRAWER'> {}
export type DrawerStackRef = {};

const DrawerStack = forwardRef<DrawerStackRef, DrawerStackProps>(
  (props, _ref) => {
    const {} = props;

    const DrawerContent = useCallback((p: DrawerContentComponentProps) => {
      return (
        <View>
          <DrawerContentScrollView
            {...p}
            contentContainerStyle={{
              paddingTop: verticalScale(10),
            }}>
            <Text>asdasd</Text>
          </DrawerContentScrollView>
        </View>
      );
    }, []);
    return (
      <View style={{backgroundColor: '#000000', flex: 1}}>
        <Drawer.Navigator
          initialRouteName={ROUTER_DRAWER.HOME}
          screenOptions={{
            headerShown: false,
            swipeEnabled: false,
            drawerActiveBackgroundColor: 'transparent',
            drawerActiveTintColor: 'transparent',
            drawerInactiveTintColor: 'transparent',
            drawerType: 'slide',
            overlayColor: 'transparent',
            drawerStyle: {
              flex: 1,
              width: '60%',
              backgroundColor: 'transparent',
            },
            sceneStyle: {
              backgroundColor: 'transparent',
            },
            lazy: true,
          }}
          drawerContent={DrawerContent}>
          <Drawer.Screen name={ROUTER_DRAWER.HOME} component={HomeStack} />
        </Drawer.Navigator>
      </View>
    );
  },
);

export default memo(DrawerStack);
const styles = StyleSheet.create({});
