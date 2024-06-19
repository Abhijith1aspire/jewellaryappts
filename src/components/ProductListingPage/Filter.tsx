import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Metrics';

const {width, height} = Dimensions.get('window');

const Filter: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="tune-variant" size={20} color="#681016" />
      <Text style={styles.text} numberOfLines={1}>
        Filters
      </Text>
      <View style={styles.dot}></View>
    </TouchableOpacity>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    height: height * 0.05,
    width: width * 0.3,
    backgroundColor: '#ffedea',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(0.5),
    borderColor: '#681016',
    flexDirection: 'row',
    borderRadius: moderateScale(2),
  },
  text: {
    color: '#681016',
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginLeft: horizontalScale(5),
    fontWeight: '500',
    flexShrink: moderateScale(1),
  },
  dot: {
    width: horizontalScale(8),
    height: verticalScale(8),
    backgroundColor: '#dea25c',
    borderRadius: moderateScale(4),
    marginLeft: horizontalScale(8),
  },
});
