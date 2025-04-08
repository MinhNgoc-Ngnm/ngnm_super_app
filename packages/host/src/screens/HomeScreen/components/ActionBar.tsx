import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, memo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
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
        <Icon name="menu" size={24} color="#FFFFFF" />
      </TouchDebounce>
      <View style={styles.left_container}>
        <TouchDebounce>
          <Icon name="magnify" size={24} color="#FFFFFF" />
        </TouchDebounce>
        <View style={{width: moderateScale(16)}} />
        <TouchDebounce>
          <Icon name="bell" size={24} color="#FFFFFF" />
        </TouchDebounce>
      </View>
    </View>
  );
});

export default memo(ActionBar);

const styles = StyleSheet.create({
  root: {
    // position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    // left: 0,
    // right: 0,
    // top: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
