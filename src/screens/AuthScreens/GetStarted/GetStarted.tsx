import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Box, Text, TouchableBox} from '../../../theme/theme';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {changeAuthStatus} from '../../../store/redux/AuthStatus';
import requestUserPermission, {
  NotificationLIsterner,
} from '../../../helper/PushNotification.helper';

interface Props {
  navigation: any;
}
export const GetStarted = ({navigation}: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth().currentUser?.uid) {
      dispatch(changeAuthStatus(true));
    }
  });

  useEffect(() => {
    requestUserPermission();
    NotificationLIsterner(navigation);
  }, []);

  return (
    <Box flex={1}>
      <Box
        flex={1}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center">
        <Box paddingBottom="s" paddingTop="l">
          <Text variant="body">keepyoga</Text>
        </Box>
        <Box>
          <Text variant="header" textAlign="center">
            Practice yoga
          </Text>
          <Text variant="header" textAlign="center">
            whenever you want.
          </Text>
        </Box>
      </Box>
      <Box flex={3}>
        <ImageBackground
          source={require('../../../assets/images/getStarted.png')}
          style={styles.background}>
          <TouchableBox
            justifyContent="center"
            backgroundColor="secondaryBackground"
            borderRadius="xl"
            paddingVertical="s"
            marginBottom="s"
            width="90%"
            onPress={() => navigation.navigate('YouLearn')}>
            <Text variant="buttonTitle" textAlign="center">
              Get Started
            </Text>
          </TouchableBox>
        </ImageBackground>
      </Box>
    </Box>
  );
};
export default GetStarted;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
