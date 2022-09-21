import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Pressable, StyleSheet} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {Box, Text, TextInput} from '../../theme/theme';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {changeAuthStatus} from '../../store/redux/AuthStatus';

const EmailSignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const createAccount = () => {
    if (email && password) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoading(false);
          dispatch(changeAuthStatus(true));
        })
        .catch(error => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
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
        <Box flex={1} justifyContent="center" paddingTop="m">
          <Box
            flexDirection="row"
            borderWidth={1}
            borderColor="pointerFill"
            height={48}
            borderRadius="xs"
            marginVertical="s"
            alignItems="center">
            <TextInput
              width="100%"
              paddingHorizontal="s"
              variant="TextButtonTitle"
              placeholder="Email"
              onChangeText={value => setEmail(value)}
            />
          </Box>
          <Box
            flexDirection="row"
            borderWidth={1}
            borderColor="pointerFill"
            height={48}
            borderRadius="xs"
            alignItems="center">
            <TextInput
              width="100%"
              paddingHorizontal="s"
              variant="TextButtonTitle"
              placeholder="Password"
              textContentType="password"
              onChangeText={value => setPassword(value)}
            />
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
              title="Sign Up"
              onPress={createAccount}
            />
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};
export default EmailSignUp;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
