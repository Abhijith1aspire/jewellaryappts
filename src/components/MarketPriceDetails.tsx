import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from './DateTimePicker';
import {RootStackParamList} from '../props/prop';
import {verticalScale, moderateScale} from '../utils/Metrics';

type Item = {
  title: string;
  price: string;
  icon: string;
};

const items: Item[] = [
  {
    title: 'Gold 22k/1g',
    price: '5810',
    icon: 'gold',
  },
  {
    title: 'Silver 1g',
    price: '99',
    icon: 'silverware-clean',
  },
  {
    title: 'Platinum 1g',
    price: '2832',
    icon: 'diamond',
  },
];

type MapScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MapScreen'
>;
const {width} = Dimensions.get('window');
const dropdownButtonWidth = width * 0.5;

const MarketPriceDetails: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item>(items[0]);
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [openDateTimePicker, setOpenDateTimePicker] = useState<boolean>(false);

  const handleDateTimePicker = () => {
    setOpenDateTimePicker(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={items}
        defaultValue={selectedItem}
        onSelect={(selectedItem, index) => {
          setSelectedItem(selectedItem);
        }}
        renderButton={(selectedItem, isOpen) => (
          <View
            style={[styles.dropdownButtonStyle, {width: dropdownButtonWidth}]}>
            {selectedItem && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
              />
            )}
            <Text style={styles.dropdownButtonTxtStyle}>
              {selectedItem
                ? `${selectedItem.title} Rs ${selectedItem.price}`
                : 'Select an item'}
            </Text>
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <TouchableOpacity
            onPress={() => setSelectedItem(item)}
            style={[
              styles.dropdownItemStyle,
              isSelected && styles.dropdownItemSelectedStyle,
            ]}>
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>
              {`${item.title} Rs ${item.price}`}
            </Text>
          </TouchableOpacity>
        )}
        dropdownStyle={styles.dropdownMenuStyle}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
          <Icon
            name="google-maps"
            size={moderateScale(30)}
            style={styles.additionalIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDateTimePicker}>
          <Icon
            name="calendar-month"
            size={moderateScale(30)}
            style={styles.additionalIcon}
          />
        </TouchableOpacity>
        <DateTimePicker
          openDateTimePicker={openDateTimePicker}
          setOpenDateTimePicker={handleDateTimePicker}
        />
      </View>
    </View>
  );
};

export default MarketPriceDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FDF2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(60),
  },
  dropdownButtonStyle: {
    height: 40,
    backgroundColor: '#FDF2F2',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  dropdownButtonTxtStyle: {
    fontSize: width * 0.037,
    fontWeight: '500',
    color: '#5C1A1A',
    marginLeft: moderateScale(10),
  },
  dropdownButtonArrowStyle: {
    fontSize: width * 0.037,
    color: '#5C1A1A',
  },
  dropdownButtonIconStyle: {
    fontSize: width * 0.037,
    color: '#5C1A1A',
  },
  dropdownMenuStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 4,
    width: dropdownButtonWidth,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: moderateScale(4),
  },
  dropdownItemSelectedStyle: {
    backgroundColor: '#f0f0f0',
  },
  dropdownItemTxtStyle: {
    fontSize: width * 0.037,
    color: '#5C1A1A',
    marginLeft: moderateScale(10),
  },
  dropdownItemIconStyle: {
    fontSize: width * 0.037,
    color: '#5C1A1A',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
  },
  additionalIcon: {
    marginRight: moderateScale(10),
  },
});
