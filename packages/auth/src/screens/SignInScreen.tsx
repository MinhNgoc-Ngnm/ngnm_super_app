import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import InputBorder from '../components/InputBorder';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import dfStyle from '../common/styles';
import TouchDebounce from '../components/TouchDebounce';
import TermModal from '../components/TermModal';
import {createModalStack, ModalProvider, modalfy} from 'react-native-modalfy';
import {Formik, FormikProps} from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng không để trống!')
    .email('Email không đúng định dạng'),
  password: yup.string().required('Vui lòng không để trống!'),
});

type FormType = {
  email: string;
  password: string;
};

const modalConfig = {TermModal};
const defaultOptions = {backdropOpacity: 0.6};
const stack = createModalStack(modalConfig, defaultOptions);
const {openModal} = modalfy();
const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const {signIn} = useAuth();
  const ref = useRef<FormikProps<FormType>>(null);
  const [err, setErr] = useState('');
  const initialValues: FormType = {email: '', password: ''};
  return (
    <ModalProvider stack={stack}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bottomOffset={verticalScale(40)}
          bounces={false}
          style={[dfStyle.flex_1]}
          contentContainerStyle={dfStyle.flexGrow_1}>
          <Formik
            innerRef={ref}
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnMount={false}
            validateOnChange={false}
            onSubmit={async ({email, password}) => {
              signIn(email, password, (status, data) => {
                if (!status) {
                  setErr(JSON.stringify(data));
                }
              });
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => {
              return (
                <View
                  style={[
                    styles.container,
                    {
                      paddingTop: insets.top + verticalScale(32),
                      paddingBottom: insets.bottom + verticalScale(10),
                    },
                  ]}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                  <View style={{height: verticalScale(16)}} />
                  <Text style={styles.welcomeHeadline}>Đăng nhập</Text>
                  <Text style={styles.welcomeHeadline}>
                    SUPER APP và trải nghiệm
                  </Text>
                  <View style={{height: verticalScale(32)}} />
                  <InputBorder
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={!!errors?.email}
                    errorMsg={errors?.email}
                    placeholder="Tài khoản"
                    placeholderTextColor="#8A8B93"
                    label="Tài khoản"
                    style={styles.inputStyle}
                    textColor="#FFFFFF"
                    outlineColor="transparent"
                    activeOutlineColor="#FFFFFF"
                    outlineStyle={styles.outlineStyle}
                  />
                  <View style={{height: verticalScale(16)}} />
                  <InputBorder
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={!!errors?.password}
                    errorMsg={errors?.password}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#8A8B93"
                    label="Mật khẩu"
                    style={styles.inputStyle}
                    textColor="#FFFFFF"
                    outlineColor="transparent"
                    activeOutlineColor="#FFFFFF"
                    outlineStyle={styles.outlineStyle}
                    secureTextEntry
                  />
                  <View style={{height: verticalScale(16)}} />
                  {err && <Text style={styles.err_text}>{err}</Text>}
                  <TouchDebounce
                    style={styles.touchSignin}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={styles.touchSignin_text}>Đăng nhập</Text>
                  </TouchDebounce>
                  <View style={{height: verticalScale(24)}} />
                  <Text style={styles.or}>hoặc đăng nhập bằng</Text>
                  <View style={{height: verticalScale(24)}} />
                  <View
                    style={[
                      dfStyle.row,
                      dfStyle.justifyAround,
                      dfStyle.alignItemsCenter,
                    ]}>
                    <TouchDebounce style={styles.touch_icon}>
                      <Image
                        source={require('../assets/images/ap.png')}
                        style={styles.icon}
                      />
                    </TouchDebounce>
                    <TouchDebounce style={styles.touch_icon}>
                      <Image
                        source={require('../assets/images/gg.png')}
                        style={styles.icon}
                      />
                    </TouchDebounce>
                    <TouchDebounce style={styles.touch_icon}>
                      <Image
                        source={require('../assets/images/fb.png')}
                        style={styles.icon}
                      />
                    </TouchDebounce>
                  </View>
                  <View style={styles.forgot_container}>
                    <Text style={styles.forgot_text} onPress={() => {}}>
                      Đăng ký / Quên mật khẩu
                    </Text>
                  </View>
                  <Text style={styles.term_1}>
                    Bằng việc đăng nhập, bạn đã đồng ý với
                  </Text>
                  <Text
                    style={styles.term_2}
                    onPress={() => {
                      openModal('TermModal');
                    }}>
                    Điều khoản sử dụng của SUPER APP
                  </Text>
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </ModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    paddingHorizontal: moderateScale(16),
  },
  logo: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(22),
    alignSelf: 'center',
  },
  welcomeHeadline: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    lineHeight: moderateScale(24, 0.3),
    fontWeight: 'bold',
  },
  inputStyle: {
    fontSize: moderateScale(14, 0.3),
    height: verticalScale(40),
    backgroundColor: '#141414',
  },
  outlineStyle: {
    borderRadius: 12,
  },
  touchSignin: {
    height: verticalScale(40),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D21F3C',
  },
  touchSignin_text: {
    fontSize: moderateScale(16, 0.3),
    fontWeight: '700',
    lineHeight: moderateScale(21, 0.3),
    color: '#FFFFFF',
  },
  or: {
    fontSize: moderateScale(14, 0.3),
    lineHeight: moderateScale(20, 0.3),
    color: '#B0B0B8',
    textAlign: 'center',
  },
  touch_icon: {
    borderRadius: scale(40),
  },
  icon: {
    width: scale(40),
    height: scale(40),
  },
  forgot_container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: verticalScale(16),
  },
  forgot_text: {
    fontSize: moderateScale(14, 0.3),
    lineHeight: moderateScale(20, 0.3),
    color: '#D21F3C',
    fontWeight: '700',
    textAlign: 'center',
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
  err_text: {
    fontSize: moderateScale(12, 0.3),
    lineHeight: moderateScale(18, 0.3),
    color: '#FF3B30',
  },
});

export default SignInScreen;
