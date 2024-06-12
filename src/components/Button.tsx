import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  minWidth?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  width?: number;
  textColor?: string;
  height?: number;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  color,
  minWidth,
  borderRadius,
  paddingVertical,
  paddingHorizontal,
  width,
  textColor,
  height,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          minWidth: minWidth,
          borderRadius: borderRadius,
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
          width: width,
          height: height,
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    minWidth: 100,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});
