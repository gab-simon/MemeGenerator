import {
  Box,
  ButtonText,
  Center,
  HStack,
  Image,
  Text,
} from '@gluestack-ui/themed';
import IButton from '../components/Button';
import { navigationAll } from '../route/navigation';
import { Button } from '@gluestack-ui/themed';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const Apresentation = () => {
  const navigation = navigationAll();

  return (
    <Box flex={1} bg="$backgroundDark950">
      <Header title="Apresentação" />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />
      <Image
        w="$full"
        h="$2/3"
        source={require('../assets/background-start.png')}
        alt="background-start"
      />
      <Box px="$10">
        <HStack mt={-20} space="xs" alignItems="center">
          <Image
            size="xs"
            rounded="$full"
            source={require('../assets/logo.png')}
            alt="logo"
          />
          <Text color="$coolGray100" fontWeight="bold">
            MEME GENERATOR
          </Text>
        </HStack>
        <Text mt="$2" color="$coolGray200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          pellentesque, libero ut blandit pellentesque, eros est commodo neque.
        </Text>

        <Button
          mt="$5"
          size="md"
          variant="solid"
          action="primary"
          bg="$purple900"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => navigation.navigate('Home')}>
          <ButtonText>COMEÇAR </ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default Apresentation;
