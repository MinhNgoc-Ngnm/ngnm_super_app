import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {forwardRef, memo} from 'react';
import {HomeStackScreenProps} from '../../navigation/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {verticalScale} from 'react-native-size-matters';
import ActionBar from './components/ActionBar';
import Avatar from './components/Avatar';
import DataUsageInfo from './components/DataUsageInfo';
import Rive, {Fit} from 'rive-react-native';

export interface HomeScreenProps extends HomeStackScreenProps<'HOME_SCREEN'> {}
export type HomeScreenRef = {};

const HomeScreen = forwardRef<HomeScreenRef, HomeScreenProps>((props, _ref) => {
  const {} = props;
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root]}>
      <Rive resourceName="light" style={styles.wall} fit={Fit.Fill} />
      <ActionBar />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={['#D21F3C']}
            tintColor={'#D21F3C'}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={[
          styles.scroll_content,
          {paddingBottom: insets.bottom + 10},
        ]}>
        <Avatar />
        <DataUsageInfo />
      </ScrollView>
    </View>
  );
});

export default memo(HomeScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scroll: {
    flex: 1,
    marginTop: verticalScale(80),
  },
  scroll_content: {
    flexGrow: 1,
  },
  wall: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: verticalScale(280),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
});
