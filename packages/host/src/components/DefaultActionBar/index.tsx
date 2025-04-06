import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useImperativeHandle, Ref} from 'react';

export type DefaultActionBarProps = {};
export type DefaultActionBarRef = {};

const DefaultActionBar = ({
  props,
  ref,
}: {
  props: DefaultActionBarProps;
  ref: Ref<DefaultActionBarRef>;
}) => {
  const {} = props;
  useImperativeHandle(ref, () => ({}));
  return (
    <View>
      <Text>DefaultActionBar</Text>
    </View>
  );
};

export default memo(DefaultActionBar);

const styles = StyleSheet.create({});
