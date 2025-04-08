import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Path, Svg} from 'react-native-svg';
import Rive from 'rive-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchDebounce from '../../components/Touch/TouchDebounce';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export interface HomeBottomTabarProps extends BottomTabBarProps {}
export type HomeBottomTabarRef = {};

const HomeBottomTabar = forwardRef<HomeBottomTabarRef, HomeBottomTabarProps>(
  (props, _ref) => {
    const {insets} = props;

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = verticalScale(48) + insets.bottom + 10;
    const CORNER_RADIUS = moderateScale(8);
    const CUTOUT_RADIUS = moderateScale(48);
    const CUTOUT_LEFT_X = WIDTH / 2 - CUTOUT_RADIUS;
    const CUTOUT_RIGHT_X = WIDTH / 2 + CUTOUT_RADIUS;
    const d = `
M0,${HEIGHT}
L0,${CORNER_RADIUS} Q0,0 ${CORNER_RADIUS},0
L${CUTOUT_LEFT_X},0
A${CUTOUT_RADIUS},${CUTOUT_RADIUS} 0 0 0 ${CUTOUT_RIGHT_X},0
L${WIDTH - CORNER_RADIUS},0 Q${WIDTH},0 ${WIDTH},${CORNER_RADIUS}
L${WIDTH},${HEIGHT}
Z
`;

    return (
      <View
        style={[
          styles.root,
          {
            width: WIDTH,
            height: HEIGHT,
          },
        ]}>
        <TouchDebounce style={styles.qr_container}>
          <Rive resourceName="scan_qr" style={styles.qr} />
        </TouchDebounce>
        <View style={styles.tab}>
          <TouchDebounce style={styles.touch}>
            <Icon name="home" size={moderateScale(24)} color={'#FFFFFF'} />
            <Text numberOfLines={1} style={styles.touch_text}>
              Trang chủ
            </Text>
          </TouchDebounce>
          <TouchDebounce style={styles.touch}>
            <Icon name="apps-box" size={moderateScale(24)} color={'#FFFFFF'} />
            <Text numberOfLines={1} style={styles.touch_text}>
              Ứng dụng
            </Text>
          </TouchDebounce>
          <View style={styles.w_96} pointerEvents="none" />
          <TouchDebounce style={styles.touch}>
            <Icon
              name="account-box"
              size={moderateScale(24)}
              color={'#FFFFFF'}
            />
            <Text numberOfLines={1} style={styles.touch_text}>
              Tài khoản
            </Text>
          </TouchDebounce>
          <TouchDebounce style={styles.touch}>
            <Icon name="cog" size={moderateScale(24)} color={'#FFFFFF'} />
            <Text numberOfLines={1} style={styles.touch_text}>
              Cài đặt
            </Text>
          </TouchDebounce>
        </View>
        <Svg width={WIDTH} height={HEIGHT}>
          <Path d={d} fill="#141414" />
        </Svg>
      </View>
    );
  },
);

export default HomeBottomTabar;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: verticalScale(48) + 10,
  },
  qr_container: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(80),
    position: 'absolute',
    top: moderateScale(-40),
    left: '50%',
    backgroundColor: '#141414',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    transform: [
      {
        translateX: '-50%',
      },
    ],
  },
  qr: {
    width: moderateScale(45),
    height: moderateScale(45),
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch_text: {
    fontSize: moderateScale(10, 0.3),
    lineHeight: moderateScale(16, 0.3),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  w_96: {
    width: moderateScale(96),
  },
});
