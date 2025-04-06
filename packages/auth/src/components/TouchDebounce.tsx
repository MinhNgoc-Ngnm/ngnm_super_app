import {
  View,
  PressableProps,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
  Easing,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {forwardRef, memo, useEffect, useRef, useState} from 'react';

const {timing} = Animated;

const radius = 8;
const styles = StyleSheet.create({
  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});

interface Ripple {
  unique: number;
  R: number;
  progress: Animated.Value;
  locationX: number;
  locationY: number;
  started: boolean;
}
export const getRipple: (p: {
  dimension: {width: number; height: number};
  event: GestureResponderEvent;
  unique: number;
}) => Ripple = ({unique = 0, dimension, event}) => {
  const {width = 0, height = 0} = dimension;
  const {locationX, locationY} = event.nativeEvent;

  const w2 = width / 2;
  const h2 = height / 2;

  const ofX = Math.abs(w2 - locationX);
  const ofY = Math.abs(h2 - locationY);

  const R = Math.sqrt((w2 + ofX) ** 2 + (h2 + ofY) ** 2);

  return {
    unique: unique + 1,
    progress: new Animated.Value(0),
    R,
    locationX,
    locationY,
    started: false,
  };
};

interface RippleProps extends Ripple {
  color?: string;
}

const RippleComponent: React.FC<RippleProps> = ({
  locationX,
  locationY,
  R,
  progress,
  color = '#fff',
  unique,
}) => {
  const style = {
    top: locationY - radius,
    left: locationX - radius,
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5 / radius, R / radius],
        }),
      },
    ],
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0.05],
    }),
    backgroundColor: color,
  };
  return (
    <Animated.View
      pointerEvents="box-only"
      key={unique}
      style={[styles.ripple, style]}
    />
  );
};
export interface TouchDebounceProps extends PressableProps {
  renderTouchComponent?: (props: any) => React.ReactElement<any>;
  delay?: number;
  color?: string;
  duration?: number;
}
export interface TouchDebounceRef extends View {}
const TouchDebounce = forwardRef<TouchDebounceRef, TouchDebounceProps>(
  (props, ref) => {
    const {
      renderTouchComponent = (p: PressableProps) => <Pressable {...p} />,
      delay = 500,
      style,
      onPress = () => {},
      onPressIn = () => {},
      onLayout,
      children,
      duration = 300,
      color = '#fff',
      ...restProps
    } = props;
    const [offset, setOffset] = useState({
      width: 0,
      height: 0,
    });
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const unique = useRef<number>(0);
    const onLayoutTouch = (event: LayoutChangeEvent) => {
      const {layout} = event.nativeEvent;
      setOffset({width: layout.width || 0, height: layout.height || 0});
      onLayout?.(event);
    };

    const pressIn = (event: GestureResponderEvent) => {
      startRipple(event);
      onPressIn?.(event);
    };

    const startRipple = (event: GestureResponderEvent) => {
      unique.current += 1;
      const ripple = getRipple({
        dimension: offset,
        event,
        unique: unique.current,
      });
      setRipples((s: Ripple[]) => s.concat(ripple));
    };

    useEffect(() => {
      const ripple = ripples[ripples.length - 1];
      if (ripple && !ripple.started) {
        let checkFinished = false;
        ripple.started = true;
        timing(ripple.progress, {
          toValue: 1,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          if (!checkFinished) {
            checkFinished = true;
            setRipples((s: Ripple[]) =>
              s.filter(i => i.unique !== s[0]?.unique),
            );
          }
        });
      }
    }, [duration, ripples]);

    const renderChildren = () => {
      return (
        <>
          {children}
          <View
            pointerEvents="box-only"
            // eslint-disable-next-line react-native/no-inline-styles
            style={[StyleSheet.absoluteFill, {overflow: 'hidden'}]}>
            {ripples.map((item: Ripple) => (
              <RippleComponent key={item.unique} {...item} color={color} />
            ))}
          </View>
        </>
      );
    };

    const last_time = useRef<number>(-delay);

    const press = (event: GestureResponderEvent) => {
      if (Date.now() - last_time.current >= delay * 0.9) {
        last_time.current = Date.now();
        onPress?.(event);
      }
    };
    const combinedStyle:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) =
      typeof style === 'function'
        ? (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
            return [{overflow: 'hidden'}, style(state)];
          }
        : [{overflow: 'hidden'}, style];

    return React.cloneElement(
      renderTouchComponent({
        hitSlop: {top: 10, left: 10, right: 10, bottom: 10},
        style: combinedStyle,
        onPress: typeof onPress === 'function' ? press : undefined,
        onLayout: onLayoutTouch,
        onPressIn: pressIn,
        ...restProps,
        children: renderChildren(),
      }),
      ref
        ? {
            ref,
          }
        : {},
    );
  },
);

export default memo(TouchDebounce);
