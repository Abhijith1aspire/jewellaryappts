import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  minWidth?: number;
};

const Button: React.FC<ButtonProps> = ({title, onPress, color, minWidth}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color, minWidth: minWidth}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: 180,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
