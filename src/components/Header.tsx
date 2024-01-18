import {Box, HStack, Image} from '@gluestack-ui/themed';
import { navigationAll } from '../route/navigation';
import { Pressable } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps): JSX.Element => {
  const navigation = navigationAll();
  return (
    <HStack
      px="$5"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      h="8%"
      bg="$red900"
      opacity={0.5}
      >
        <Image
        source={require('../assets/logo.png')}
        alt="Logo UniCidadao"
        resizeMode="contain"
        size="xs"
        rounded="$full"
      />
      <Box justifyContent="space-between">
        <Pressable onPress={navigation.goBack}>
          {/* <Icon
            as={<MaterialCommunityIcons name={'arrow-left'} />}
            size={5}
            mr="2"
            color="gray.50"
          /> */}
        </Pressable>
        <Text color="$coolGray100">{title}</Text>
      </Box>
    </HStack>
  );
};

export default Header;
