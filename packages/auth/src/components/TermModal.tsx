import {ScrollView, StyleSheet, View} from 'react-native';
import React, {forwardRef, memo, useImperativeHandle} from 'react';
import {Text} from 'react-native-paper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {UIDevice} from '../common/sizes';
import dfStyle from '../common/styles';
import {term} from '../data/term';
import TouchDebounce from './TouchDebounce';
import {useModal} from 'react-native-modalfy';

export type TermModalProps = {};
export type TermModalRef = {};

const TermModal = forwardRef<TermModalRef, TermModalProps>(
  (props, refTermModal) => {
    const {} = props;
    const {closeModal} = useModal();
    useImperativeHandle(refTermModal, () => ({}));
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Điều khoản sử dụng</Text>
        <View style={{height: verticalScale(16)}} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={dfStyle.flexGrow_1}>
          <Text style={styles.term}>{term}</Text>
        </ScrollView>
        <View style={{height: verticalScale(16)}} />
        <Text style={styles.term_1}>
          Bằng việc đăng nhập, bạn đã đồng ý với
        </Text>
        <Text style={styles.term_2}>Điều khoản sử dụng của AoT</Text>
        <View style={{height: verticalScale(16)}} />
        <TouchDebounce
          style={styles.touch}
          onPress={() => {
            console.log('CLICK');
            closeModal('TermModal');
          }}>
          <Text style={styles.touch_text}>Đồng ý</Text>
        </TouchDebounce>
      </View>
    );
  },
);

export default memo(TermModal);

const styles = StyleSheet.create({
  root: {
    marginHorizontal: moderateScale(12),
    width: UIDevice.width - moderateScale(24),
    backgroundColor: '#141414',
    borderRadius: 12,
    padding: scale(16),
    height: UIDevice.height - verticalScale(120),
  },
  title: {
    fontSize: moderateScale(16, 0.3),
    lineHeight: moderateScale(20, 0.3),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: scale(16),
  },
  term: {
    fontSize: moderateScale(14, 0.3),
    lineHeight: moderateScale(24, 0.3),
    color: '#121212',
  },
  term_1: {
    fontSize: moderateScale(10, 0.3),
    lineHeight: moderateScale(18, 0.3),
    color: '#656874',
    textAlign: 'center',
  },
  term_2: {
    fontSize: moderateScale(10, 0.3),
    lineHeight: moderateScale(18, 0.3),
    color: '#FFD130',
    textAlign: 'center',
  },
  touch: {
    height: verticalScale(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D21F3C',
  },
  touch_text: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    lineHeight: moderateScale(21, 0.3),
    color: '#FFFFFF',
  },
});
