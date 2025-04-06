import {Platform} from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const fontScale = (value: number) => moderateScale(value, 0.3);
function moderateScale(value: number, arg1: number) {
  throw new Error('Function not implemented.');
}
