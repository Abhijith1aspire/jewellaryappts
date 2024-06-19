import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Buttons = ({title, isSelected, onPress}) => {
  const buttonColor = isSelected ? '#5d1115' : '#fef7f7';
  const textColor = isSelected ? '#fef7f7' : '#5d1115';

  const width = Math.max(80, title.length * 10 + 10);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          width: width,
          backgroundColor: buttonColor,
        },
      ]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const BannerButtons = ({onSelectItem, buttonData}) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    buttonData[0],
  );

  const handlePress = (title: string) => {
    setSelectedButton(selectedButton === title ? null : title);
    onSelectItem(title);
  };

  return (
    <View style={styles.container}>
      {buttonData.map((item, index) => (
        <Buttons
          key={index.toString()}
          title={item}
          isSelected={item === selectedButton}
          onPress={() => handlePress(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    height: 28,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {textAlign: 'center'},
});

export default BannerButtons;
