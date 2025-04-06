import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  TOKEN_KEY = 'TOKEN';
  REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

  getCredentials(): Promise<string | null> {
    return AsyncStorage.getItem(this.TOKEN_KEY);
  }

  setCredentials(token: string): Promise<void> {
    return AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  removeCredentials(): Promise<void> {
    return AsyncStorage.removeItem(this.TOKEN_KEY);
  }

  getRefreshCredentials(): Promise<string | null> {
    return AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setRefreshCredentials(token: string): Promise<void> {
    return AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  removeRefreshCredentials(): Promise<void> {
    return AsyncStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
  static shared = new AuthService();
}

export default AuthService;
