import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PrimaryButton from '../../../components/PrimaryButton';
import {PracticeArea} from '../../../constants/QuestionsArray';
import {Box, Text, TouchableBox} from '../../../theme/theme';
import {useTranslation} from 'react-i18next';

interface Props {
  navigation: any;
}
const SetupPersonalizationOne = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState<Array<object>>([]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Box
          flexDirection="row"
          paddingVertical="xs"
          justifyContent="center"
          alignItems="center">
          <Box
            marginRight="xs"
            width={7}
            height={7}
            borderRadius="xxl"
            backgroundColor="pointerFill"
          />
          <Box
            marginRight="xs"
            width={7}
            height={7}
            borderRadius="xxl"
            backgroundColor="blueTitleText"
          />
          <Box
            marginRight="xs"
            width={7}
            height={7}
            borderRadius="xxl"
            backgroundColor="pointerFill"
          />
        </Box>
      ),
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableBox
          onPress={() =>
            navigation.navigate('SetupPersonalizationTwo', selected)
          }>
          <Text
            variant="interMedium"
            fontSize={18}
            lineHeight={18}
            color="buttonSetupGrey">
            Skip
          </Text>
        </TouchableBox>
      ),
    });
  });

  const checkItem = (data: any) => {
    if (data.name == 'None') {
      setSelected([]);
      return;
    }
    if (selected.includes(data)) {
      setSelected(current =>
        current.filter((item: any) => item.name !== data.name),
      );
    } else {
      setSelected(prev => {
        return [...prev, data];
      });
    }
  };

  return (
    <Box
      flex={1}
      backgroundColor="secondaryBackground"
      paddingHorizontal="m"
      justifyContent="space-between"
      paddingTop="xl">
      <Box flex={1} alignItems="center">
        <Box justifyContent="center" paddingTop="l" paddingHorizontal="xs">
          <Text lineHeight={40} variant="header">{t('SetupPersonalizOne.PracticeArea')}</Text>
        </Box>
        <Box alignItems="flex-start">
          <Text
            lineHeight={20}
            variant="PersonalizationRegular"
            textAlign="center"
            color="buttonSetupGrey">
            {t('SetupPersonalizOne.SoWeCanRecommendExercises')}
          </Text>
        </Box>
      </Box>
      <Box flex={4}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}>
          {PracticeArea.map((item: {name: string}, index: number) => (
            <TouchableBox
              key={index}
              onPress={() => {
                checkItem(item);
              }}
              borderRadius="xs"
              height={40}
              justifyContent="center"
              backgroundColor={
                selected.includes(item)
                  ? 'SelectedPracticeAreaBg'
                  : 'PracticAreaBg'
              }
              marginVertical="xs">
              <Text
                variant="TextButtonTitle"
                textAlign="center"
                color={
                  selected.includes(item) ? 'blueTitleText' : 'primaryTitleText'
                }>
                {item.name}
              </Text>
            </TouchableBox>
          ))}
        </ScrollView>
      </Box>
      <Box justifyContent="flex-end" flex={1}>
        <PrimaryButton
          title= {t('SetupPersonalizOne.Select')}
          onPress={() => {
            navigation.navigate('SetupPersonalizationTwo', selected);
          }}
        />
      </Box>
    </Box>
  );
};
export default SetupPersonalizationOne;
