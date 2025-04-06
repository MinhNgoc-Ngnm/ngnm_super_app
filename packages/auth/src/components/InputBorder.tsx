import {StyleSheet, View} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';

export interface InputBorderProps extends Omit<TextInputProps, 'mode'> {
  errorMsg?: string;
}
export type InputBorderRef = {};

const InputBorder = forwardRef<InputBorderRef, InputBorderProps>(
  (props, ref) => {
    const {error, errorMsg = '', ...p} = props;
    useImperativeHandle(ref, () => ({}));
    return (
      <View style={styles.root}>
        <TextInput mode="outlined" error={error} {...p} />
        {error && (
          <HelperText numberOfLines={1} style={styles.errText} type="error">
            {errorMsg}
          </HelperText>
        )}
      </View>
    );
  },
);

export default memo(InputBorder);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    width: '100%',
  },
  errText: {
    fontSize: moderateScale(12, 0.3),
    lineHeight: moderateScale(18, 0.3),
  },
});
