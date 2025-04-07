import React from 'react';
import dfStyle from './src/common/styles';
import ErrorBoundary from './src/components/ErrorBoundary';
import SplashScreen from './src/components/SplashScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/navigation';
// @ts-ignore
const AuthProvider = React.lazy(() => import('auth/AuthProvider'));
// @ts-ignore
const SignInScreen = React.lazy(() => import('auth/SignInScreen'));

const App = () => {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <GestureHandlerRootView style={dfStyle.flex_1}>
          <ErrorBoundary name="AuthProvider">
            <React.Suspense fallback={<SplashScreen />}>
              <AuthProvider>
                {(
                  authData: {isSignout: boolean; isLoading: boolean},
                  _signOut: (
                    callback: (status: boolean, data: any) => void,
                  ) => void,
                ) => {
                  if (authData.isLoading) {
                    return <SplashScreen />;
                  }

                  if (authData.isSignout) {
                    return (
                      <React.Suspense fallback={<SplashScreen />}>
                        <SignInScreen />
                      </React.Suspense>
                    );
                  }

                  return <Navigator />;
                }}
              </AuthProvider>
            </React.Suspense>
          </ErrorBoundary>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;
