import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, memo} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
export type DataUsageInfoProps = {};
export type DataUsageInfoRef = {};
const DataUsageInfo = forwardRef<DataUsageInfoRef, DataUsageInfoProps>(
  (props, _ref) => {
    const {} = props;
    return (
      <View style={styles.root}>
        <Text>DataUsageInfo</Text>
      </View>
    );
  },
);

export default memo(DataUsageInfo);

const styles = StyleSheet.create({
  root: {
    marginTop: verticalScale(16),
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: '#141414',
  },
});
