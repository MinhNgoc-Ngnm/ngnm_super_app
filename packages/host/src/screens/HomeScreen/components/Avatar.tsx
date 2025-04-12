import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, memo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import TouchDebounce from '../../../components/Touch/TouchDebounce';

export type AvatarProps = {};
export type AvatarRef = {};

const Avatar = forwardRef<AvatarRef, AvatarProps>((props, _ref) => {
  const {} = props;
  return (
    <View style={styles.root}>
      <Icon
        name="account-circle-outline"
        size={moderateScale(40)}
        color={'#FFFFFF'}
      />
      <View style={styles.left_container}>
        <Text style={styles.txt_name}>Phạm Minh Ngọc</Text>
        <TouchDebounce style={styles.touch_ranking}>
          <Icon name="chess-queen" size={moderateScale(20)} color={'#D21F3C'} />
          <Text style={styles.touch_txt}>Hạng vàng</Text>
        </TouchDebounce>
      </View>
    </View>
  );
});

export default memo(Avatar);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
  },
  left_container: {
    marginLeft: scale(16),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  txt_name: {
    fontSize: moderateScale(16, 0.3),
    lineHeight: moderateScale(24, 0.3),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  touch_ranking: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
  },
  touch_txt: {
    fontSize: moderateScale(12, 0.3),
    lineHeight: moderateScale(16, 0.3),
    fontWeight: '600',
    color: '#000000',
  },
});
