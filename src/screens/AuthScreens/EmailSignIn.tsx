import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Pressable, StyleSheet} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {Box, Text, TextInput, TouchableBox} from '../../theme/theme';
import auth from '@react-native-firebase/auth';
import {changeAuthStatus} from '../../store/redux/AuthStatus';
import {useDispatch} from 'react-redux';
import {EmailValidation} from '../../utils/regex';

const EmailSignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const signInAccount = () => {
    const emailIsValid = EmailValidation(email);
    if (!emailIsValid) {
      setEmailError(true);
    }
    if (password.length < 6) {
      setPasswordError(true);
    }
    if (!emailError && password.length > 5) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoading(false);
          dispatch(changeAuthStatus(true));
        })
        .catch(error => {
          setIsLoading(false);
          if (error.code === 'auth/user-not-found') {
            Alert.alert('No user found');
            return;
          }
          if (error.code === 'auth/wrong-password') {
            Alert.alert('The password is invalid');
            return;
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
            return;
          }

          Alert.alert(error);
          return;
        });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <Box
        flex={1}
        backgroundColor="secondaryBackground"
        paddingHorizontal="m"
        paddingTop="l">
        <Box height={200} justifyContent="center" paddingTop="l">
          <Box
            flexDirection="row"
            borderWidth={1}
            borderColor={emailError ? 'errorColor' : 'pointerFill'}
            height={48}
            borderRadius="xs"
            marginVertical="s"
            alignItems="center">
            <TextInput
              placeholderTextColor="#6C7072"
              style={styles.width}
              paddingHorizontal="s"
              variant="TextButtonTitle"
              placeholder="Email"
              onChangeText={value => {
                setEmailError(false);
                setEmail(value);
              }}
            />
          </Box>
          <Box
            flexDirection="row"
            borderWidth={1}
            borderColor={passwordError ? 'errorColor' : 'pointerFill'}
            height={48}
            borderRadius="xs"
            alignItems="center">
            <TextInput
              placeholderTextColor="#6C7072"
              style={styles.width}
              paddingLeft="s"
              variant="TextButtonTitle"
              placeholder="Password"
              textContentType="password"
              onChangeText={value => {
                setPasswordError(false);
                setPassword(value);
              }}
            />
          </Box>
          <Box>
            <TouchableBox paddingTop="xs">
              <Text variant="interMedium">Forgot password?</Text>
            </TouchableBox>
          </Box>
        </Box>
        <Box flex={3} justifyContent="flex-end">
          <Box paddingBottom="s">
            <Box paddingHorizontal="xs" alignItems="flex-start">
              <Box flexDirection="row">
                <Text variant="TextButtonTitle" fontSize={12}>
                  By continuing, you agree to our {''}
                </Text>
                <Pressable onPress={() => {}}>
                  <Text
                    variant="TextButtonTitle"
                    fontSize={12}
                    color="blueTitleText">
                    Terms of Service {''}
                  </Text>
                </Pressable>
                <Text variant="TextButtonTitle" fontSize={12}>
                  and {''}
                </Text>
              </Box>
              <Pressable onPress={() => {}}>
                <Text
                  textAlign="center"
                  variant="TextButtonTitle"
                  fontSize={12}
                  color="blueTitleText">
                  Privacy Policy.
                </Text>
              </Pressable>
            </Box>
          </Box>
          <Box paddingBottom="m">
            <PrimaryButton
              disabled={isLoading}
              title="Sign in"
              onPress={signInAccount}
            />
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};
export default EmailSignIn;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  width: {
    width: '100%',
  },
});
