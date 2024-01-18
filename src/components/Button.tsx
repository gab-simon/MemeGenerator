import {Button, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const IButton = ({children, onClick}: ButtonProps): JSX.Element => {
 return (
   <Button onPress={onClick} title={children} />
 );
};

export default IButton;
