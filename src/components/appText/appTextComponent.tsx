import React from 'react';
import styles from './appTextComponent.style';
import { Text, View } from 'react-native';

interface AppTextComponentProps {
  text: string;
  style?: any;
}

const AppTextComponent = ({ text, style }: AppTextComponentProps) => {
  return (
      <Text style={style || styles.textStyle}>{text}</Text>
  );
};

export default AppTextComponent;
