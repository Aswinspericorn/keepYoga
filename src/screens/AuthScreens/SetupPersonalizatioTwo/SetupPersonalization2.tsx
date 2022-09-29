import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Questions} from '../../../constants/QuestionsArray';
import {Box, Text, TouchableBox} from '../../../theme/theme';
import GradientBottom from './components/GradientBottom';
import InputTextField from './components/InputTextField';
import OptionalQuestion from './components/OptinalQuestions';
import UserImagePicker from './components/UserImagePicker';

interface Props {
  navigation: any;
  route: any;
}
const SetupPersonalizationTwo = ({navigation, route}: Props) => {
  const [selected, setSelected] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<object>>([]);

  const questionHandler = (opt: string, question: string) => {
    const tempData = currentQuestion + 1;
    setCurrentQuestion(tempData);
    if (tempData > Questions.length - 1) {
      navigation.navigate('AddEmail', {
        PArea: route.params,
        QA: selectedAnswers,
      });
      setCurrentQuestion(0);
    }
    setSelectedAnswers(prev => [...prev, {[question]: opt}]);
    setSelected(opt);
  };
  console.log(selectedAnswers)

  const desideField = () => {
    let x = Questions[currentQuestion].type;
    switch (x) {
      case 'name':
        return <InputTextField type="name" onPress={questionHandler} />;
      case 'age':
        return <InputTextField type="age" onPress={questionHandler} />;
      case 'photo':
        return <UserImagePicker onPress={questionHandler} />;
    }
  };

  return (
    <Box
      flex={1}
      backgroundColor="secondaryBackground"
      justifyContent="space-between"
      paddingTop="xl">
      <Box flex={3} paddingTop="xs" paddingHorizontal="m">
        <Box
          width={'90%'}
          height={4}
          backgroundColor="pointerFill"
          borderRadius="s">
          <Box
            width={`${((currentQuestion + 1) / Questions.length) * 100}%`}
            height={'100%'}
            backgroundColor="blueTitleText"
            borderRadius="s"
          />
        </Box>
        <Box paddingTop="l">
          <Text variant="header" textAlign="left">
            Tell us your goal
          </Text>
        </Box>
        <Box alignItems="flex-start">
          <Text variant="PersonalizationRegular" textAlign="left">
            {Questions[currentQuestion]?.question}
          </Text>
        </Box>
        <Box flex={4} paddingTop="m">
          {Questions[currentQuestion].options ? (
            <OptionalQuestion
              selected={selected}
              questionHandler={questionHandler}
              currentQuestion={currentQuestion}
            />
          ) : (
            <Box flex={1}>{desideField()}</Box>
          )}
        </Box>
      </Box>
      <GradientBottom />
    </Box>
  );
};
export default SetupPersonalizationTwo;