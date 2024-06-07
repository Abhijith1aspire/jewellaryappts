import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import ShoppingBagIcon from 'react-native-vector-icons/Feather';
import MenuIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../props/prop';

type CartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CartScreen'
>;

const LogoHeader: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <MenuIcon
            name="menu"
            size={25}
            color="#900"
            style={[styles.icon, {marginLeft: 0}]}
          />
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../assets/images/grt.png')}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <StarIcon name="star-o" size={23} color="#900" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserScreen');
          }}>
          <AccountIcon
            name="account-outline"
            size={26}
            color="#900"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FavoritesScreen')}>
          <LikeIcon name="hearto" size={22} color="#900" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <ShoppingBagIcon
            name="shopping-bag"
            size={22}
            color="#900"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});
