import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Path, Svg} from 'react-native-svg';
import {moderateScale, verticalScale} from 'react-native-size-matters';
export interface HomeBottomTabarProps extends BottomTabBarProps {}
export type HomeBottomTabarRef = {};

const HomeBottomTabar = forwardRef<HomeBottomTabarRef, HomeBottomTabarProps>(
  (props, _ref) => {
    const {insets} = props;
    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = verticalScale(48) + insets.bottom;
    const CORNER_RADIUS = 0;
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
        <View style={styles.tab}>
          <Text style={{color: 'red'}}>asdasd</Text>
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
    bottom: -1,
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
    height: verticalScale(48),
  },
});
