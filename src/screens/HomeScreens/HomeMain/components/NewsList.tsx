import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import HomeTile from '../../../../components/HomeTile';
import {Box, Text, TouchableBox} from '../../../../theme/theme';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

interface Props {
  currentTopic: number;
}
const NewsList = ({currentTopic}: Props) => {
  const [news, setNews] = useState<
    Array<{content: [{image: string; describe: string; title: string}]}>
  >([
    {
      content: [
        {
          image:
            'https://static.vecteezy.com/system/resources/previews/004/639/580/non_2x/waiting-loading-icon-illustration-isolated-on-white-background-vector.jpg',
          describe: '',
          title: '',
        },
      ],
    },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    const checkIsNewUser = async () => {
      const newsData = await firestore()
        .collection('news')
        .doc('Zm1gMrC4QajdmYpz0hsj')
        .get();
      setNews(newsData._data.data);
    };
    checkIsNewUser();
  }, []);
  return (
    <Box paddingHorizontal="m">
      <TouchableBox
        onPress={() => {
          // navigation.navigate('DetailNews', news[currentTopic].content[0]);
          navigation.navigate('Home', {
            screen: 'DetailNews',
            params: news[currentTopic].content[0],
          });
        }}>
        <Box paddingTop="xs" paddingBottom="s">
          <Box justifyContent="center" alignItems="center">
            <Image
              source={{uri: news[currentTopic].content[0].image}}
              style={styles.Image}
            />
          </Box>
          <Box paddingVertical="xs">
            <Text variant="buttonTitle" lineHeight={24}>
              {news[currentTopic].content[0].title}
            </Text>
            <Text
              variant="TextButtonTitle"
              color="buttonSetupGrey"
              paddingVertical="xs"
              fontSize={12}>
              {news[currentTopic].content[0].describe}
            </Text>
          </Box>
        </Box>
      </TouchableBox>
      <Box>
        {news[currentTopic].content.map((item, index) => (
          <TouchableBox
            key={index}
            onPress={() => {
              // navigation.navigate('DetailNews', news[currentTopic].content[0]);
              navigation.navigate('Home', {
                screen: 'DetailNews',
                params: news[currentTopic].content[index],
              });
            }}>
            <HomeTile
              title={item.title}
              describe={item.describe}
              image={item.image}
            />
          </TouchableBox>
        ))}
      </Box>
    </Box>
  );
};
export default NewsList;
const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: 200,
  },
});
