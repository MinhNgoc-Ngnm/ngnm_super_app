import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {RootStackParamList} from './types';
import {refNavigation} from './navigationHelper';

const Navigator: React.FC<any> = () => {
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['aot://'],
    config: {
      screens: {},
    },
  };
  return (
    <NavigationContainer ref={refNavigation} linking={linking} onReady={()=> console.log("AAAAAAA")}>
      <MainStack />
    </NavigationContainer>
  );
};
export default Navigator;
