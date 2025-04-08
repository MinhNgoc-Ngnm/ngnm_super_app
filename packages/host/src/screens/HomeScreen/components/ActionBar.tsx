import {StyleSheet, View} from 'react-native';
import React, {forwardRef, memo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale, scale} from 'react-native-size-matters';
import TouchDebounce from '../../../components/Touch/TouchDebounce';
import {navigateToggleDrawer} from '../../../navigation/navigationHelper';

export type ActionBarProps = {};
export type ActionBarRef = {};

const ActionBar = forwardRef<ActionBarRef, ActionBarProps>((props, _ref) => {
  const {} = props;
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, {paddingTop: insets.top + 10}]}>
      <TouchDebounce onPress={() => navigateToggleDrawer()}>
        <Icon name="menu" size={moderateScale(24)} color="#FFFFFF" />
      </TouchDebounce>
      <View style={styles.left_container}>
        <TouchDebounce>
          <Icon name="magnify" size={moderateScale(24)} color="#FFFFFF" />
        </TouchDebounce>
        <View style={{width: scale(16)}} />
        <TouchDebounce>
          <Icon name="bell" size={moderateScale(24)} color="#FFFFFF" />
        </TouchDebounce>
      </View>
    </View>
  );
});

export default memo(ActionBar);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
