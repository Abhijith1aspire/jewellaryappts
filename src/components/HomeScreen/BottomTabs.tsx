import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CategoryIcon from 'react-native-vector-icons/AntDesign';
import WishListIcon from 'react-native-vector-icons/Fontisto';
import CartIcon from 'react-native-vector-icons/SimpleLineIcons';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fontScale, moderateScale, verticalScale} from '../../utils/Metrics';

const {width, height} = Dimensions.get('window');

const BottomTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState('HomeScreen');

  console.log(route);

  const tabItems = [
    {
      name: 'HomeScreen',
      displayName: 'Home',
      IconComponent: Icon,
      iconName: 'home',
      iconSize: moderateScale(28),
    },
    {
      name: 'ProductListingPage',
      displayName: 'Categories',
      IconComponent: CategoryIcon,
      iconName: 'appstore-o',
      iconSize: moderateScale(28),
    },
    {
      name: 'Wishlist',
      displayName: 'Wishlist',
      IconComponent: WishListIcon,
      iconName: 'heart-alt',
      iconSize: moderateScale(26),
    },
    {
      name: 'CartScreen',
      displayName: 'Cart',
      IconComponent: CartIcon,
      iconName: 'bag',
      iconSize: moderateScale(26),
    },
    {
      name: 'UserScreen',
      displayName: 'Profile',
      IconComponent: AccountIcon,
      iconName: 'account-outline',
      iconSize: moderateScale(35),
    },
  ];

  const handleTabPress = (tabName: string) => {
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.container}>
      {tabItems.map((item, index) => {
        const IconComponent = item.IconComponent;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(item.name)}>
            <View style={[styles.tabItem, {opacity: 0.8}]}>
              <IconComponent
                name={item.iconName}
                size={item.iconSize}
                color={item.name === selectedTab ? '#5e0006' : '#9f9f9f'}
              />
              <Text
                style={{
                  color: item.name === selectedTab ? '#5e0006' : '#9f9f9f',
                  fontSize: fontScale(12),
                  fontWeight: '500',
                  marginTop: verticalScale(4),
                }}>
                {item.displayName}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.08,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
});
