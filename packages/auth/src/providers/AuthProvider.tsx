import React from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../contexts/AuthContext';
import AuthService from '../services/AuthService';

enum ActionTypes {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

type Action = {
  type: ActionTypes;
  payload?: any;
};

type State = {
  isLoading: boolean;
  isSignout: boolean;
};

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        isSignout: action.payload,
        isLoading: false,
      };
    case ActionTypes.SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...prevState,
        isSignout: true,
      };
    default:
      return prevState;
  }
};

const AuthProvider = ({
  children,
}: {
  children: (data: State) => React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: true,
    isSignout: false,
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async (
        email: string,
        password: string,
        callback: (status: boolean, data: any) => void,
      ) => {
        try {
          const result = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          const token = await result.user.getIdToken();
          await AuthService.shared.setCredentials(token);
          dispatch({type: ActionTypes.SIGN_IN});
          console.log({result});
          callback(true, result);
        } catch (e) {
          callback(false, e);
        }
      },
      signOut: async (callback: (status: boolean, data: any) => void) => {
        try {
          await auth().signOut();
          await AuthService.shared.removeCredentials();
          dispatch({type: ActionTypes.SIGN_OUT});
          callback(true, {});
        } catch (e) {
          console.error('SignOut error:', e);
          callback(false, e);
        }
      },
      signUp: async (
        email: string,
        password: string,
        callback: (status: boolean, data: any) => void,
      ) => {
        try {
          const result = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          const token = await result.user.getIdToken();
          await AuthService.shared.setCredentials(token);
          dispatch({type: ActionTypes.SIGN_IN});
          callback(true, result);
        } catch (e) {
          console.error('SignUp error:', e);
          callback(false, e);
        }
      },
    }),
    [],
  );
  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        dispatch({type: ActionTypes.RESTORE_TOKEN, payload: false});
      } else {
        dispatch({type: ActionTypes.RESTORE_TOKEN, payload: true});
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {children(state)}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
