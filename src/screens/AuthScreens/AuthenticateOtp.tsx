import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, LogBox, StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Box, Text} from '../../theme/theme';
// import auth from '@react-native-firebase/auth';
import {changeAuthStatus} from '../../store/redux/AuthStatus';
import RNOtpVerify from 'react-native-otp-verify';
import PrimaryButton from '../../components/PrimaryButton';

interface Props {
  route: any;
}
const AuthenticateOtp = ({route}: Props) => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const AuthData = route.params;
  const dispatch = useDispatch();

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    RNOtpVerify.getHash().then(console.log).catch(console.log);

    RNOtpVerify.getOtp()
      .then(() => RNOtpVerify.addListener(otpHandler))
      .catch();
  }, []);

  const otpHandler = (message: string = '000000') => {
    if (message.includes('Error')) {
      return;
    }
    let otp = '';
    if (message.length > 0) {
      // otp = /(d{6})/g.exec(message)[1];
      otp = message.replace(/^\D+/g, '');
    }
    setCode(otp);
    RNOtpVerify.removeListener();
  };

  // function onAuthStateChanged(userr: any) {
  //   if (userr) {
  //     setUser(userr);
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  async function confirmCode() {
    setIsLoading(true);
    console.log(AuthData.data.confirm);
    await AuthData.data
      .confirm(code)
      .then(() => {
        setIsLoading(false);
        dispatch(changeAuthStatus(true));
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        if (err.code === 'auth/invalid-verification-code') {
          Alert.alert('Invalid otp');
          return;
        }
        if (err.code === 'auth/session-expired') {
          Alert.alert('The sms code has expired');
          return;
        }
      });
  }
  return (
    <Box
      flex={1}
      backgroundColor="secondaryBackground"
      paddingHorizontal="m"
      paddingTop="xl">
      <Box justifyContent="center" paddingTop="l" paddingHorizontal="xs">
        <Text variant="subHeader">Enter authentication code</Text>
      </Box>
      <Box paddingTop="xs" alignItems="flex-start">
        <Text variant="TextButtonTitle" lineHeight={24} textAlign="center">
          Enter the 4-digit that we have sent via the{'\n'}
          phone number +91 {AuthData.phno}
        </Text>
      </Box>
      <Box flex={1} paddingTop="s">
        <OTPInputView
          style={styles.OTPInput}
          pinCount={6}
          code={code}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={value => {
            setCode(value);
          }}
        />
      </Box>
      <Box>
        <PrimaryButton
          disabled={isLoading}
          title={isLoading ? 'Sending...' : 'Continue'}
          onPress={confirmCode}
        />
      </Box>
    </Box>
  );
};
export default AuthenticateOtp;
const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 48,
    borderRadius: 64,
    height: 48,
    borderWidth: 1,
    color: 'black',
    borderColor: '#E3E5E5',
  },
  opacity: {
    opacity: 0.5,
  },

  underlineStyleHighLighted: {
    borderColor: '#6B4EFF',
    width: 50,
    borderRadius: 64,
    height: 50,
  },
  OTPInput: {height: 100, width: '100%', backgroundColor: 'transparent'},
});
