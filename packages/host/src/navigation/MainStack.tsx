import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {ROUTER_ROOT} from './routers';
import DrawerStack from './DrawerStack';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTER_ROOT.DRAWER}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'transperant',
        },
        gestureEnabled: false,
      }}>
      <Stack.Screen name={ROUTER_ROOT.DRAWER} component={DrawerStack} />
    </Stack.Navigator>
  );
};

export default MainStack;
