import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {fontScale, horizontalScale, moderateScale} from '../../utils/Metrics';

const {width, height} = Dimensions.get('window');

const NewArrivalsPin: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="tags" size={20} color="#172b85" />
      <Text style={styles.text} numberOfLines={1}>
        NEW ARRIVALS
      </Text>
    </TouchableOpacity>
  );
};

export default NewArrivalsPin;

const styles = StyleSheet.create({
  container: {
    height: height * 0.038,
    width: width * 0.3,
    backgroundColor: '#cfd7f4',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(2),
    paddingHorizontal: horizontalScale(5),
  },
  text: {
    color: '#172b85',
    fontSize: fontScale(12, width * 0.9),
    textAlign: 'center',
    marginLeft: horizontalScale(1),
    fontWeight: '500',
    flexShrink: moderateScale(1),
  },
});
