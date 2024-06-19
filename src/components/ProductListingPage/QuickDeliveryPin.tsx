import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {fontScale, horizontalScale, moderateScale} from '../../utils/Metrics';

const {width, height} = Dimensions.get('window');

const QuickDeliveryPin: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="truck" size={20} color="#b08f42" />
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
        QUICK DELIVERY
      </Text>
    </TouchableOpacity>
  );
};

export default QuickDeliveryPin;

const styles = StyleSheet.create({
  container: {
    height: height * 0.038,
    width: width * 0.35,
    backgroundColor: '#fee6ae',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(2),
    paddingHorizontal: horizontalScale(5),
  },
  text: {
    color: '#b08f42',
    fontSize: fontScale(12, width * 0.9),
    textAlign: 'center',
    marginLeft: horizontalScale(5),
    fontWeight: '500',
    flexShrink: moderateScale(1),
  },
});
