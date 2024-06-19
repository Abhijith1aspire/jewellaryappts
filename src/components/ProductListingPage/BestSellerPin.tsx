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

const BestSellerPin: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="staro" size={20} color="#5d1115" />
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
        BESTSELLER
      </Text>
    </TouchableOpacity>
  );
};

export default BestSellerPin;

const styles = StyleSheet.create({
  container: {
    height: height * 0.038,
    width: width * 0.27,
    backgroundColor: '#fed0bc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(2),
    paddingHorizontal: horizontalScale(5),
  },
  text: {
    color: '#681016',
    fontSize: fontScale(12, width * 0.9),
    textAlign: 'center',
    marginLeft: horizontalScale(5),
    fontWeight: '500',
    flexShrink: moderateScale(1),
  },
});
