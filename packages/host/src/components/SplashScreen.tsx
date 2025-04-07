import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ProgressBar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="cloud-download"
        size={56}
        color={'#D21F3C'}
        style={styles.icon}
      />
      <Text style={styles.text}>
        Ứng dụng AoT đang tải, Vui lòng đợi trong giây lát...
      </Text>
      <ProgressBar style={styles.progress} indeterminate color={'#D21F3C'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  icon: {
    textAlign: 'center',
  },
  text: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progress: {
    marginVertical: 16,
    marginHorizontal: 32,
    borderRadius: 8,
  },
});

export default SplashScreen;
