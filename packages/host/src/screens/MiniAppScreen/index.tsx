import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeStackScreenProps} from '../../navigation/types';

export interface MiniAppScreenProps
  extends HomeStackScreenProps<'MINI_APP_SCREEN'> {}
export type MiniAppScreenRef = {};
const MiniAppScreen = React.forwardRef<MiniAppScreenRef, MiniAppScreenProps>(
  (props, _ref) => {
    const {} = props;
    return (
      <View style={styles.root}>
        <Text>MiniAppScreen</Text>
      </View>
    );
  },
);

export default React.memo(MiniAppScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
