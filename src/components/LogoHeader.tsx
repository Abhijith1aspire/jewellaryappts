import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import ShoppingBagIcon from 'react-native-vector-icons/Feather';
import MenuIcon from 'react-native-vector-icons/Feather';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../props/prop';
import {moderateScale, verticalScale} from '../utils/Metrics';

type CartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CartScreen'
>;

const LogoHeader: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const {width} = Dimensions.get('window');
  const logoWidth = width * 0.2;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MenuIcon
            name="menu"
            size={moderateScale(26)}
            color="#5d1115"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Image
          style={[styles.logo, {width: logoWidth}]}
          source={require('../assets/images/grt.png')}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <StarIcon
            name="star-o"
            size={moderateScale(26)}
            color="#5d1115"
            style={[styles.icon, {marginRight: 8}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
          <AccountIcon
            name="account-outline"
            size={moderateScale(28)}
            color="#5d1115"
            style={[styles.icon, {marginRight: 8}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FavoritesScreen')}>
          <LikeIcon
            name="hearto"
            size={moderateScale(22)}
            color="#5d1115"
            style={[styles.icon, {marginRight: 8}]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <ShoppingBagIcon
            name="shopping-bag"
            size={moderateScale(22)}
            color="#5d1115"
            style={[styles.icon, {marginRight: 8}]}
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
    height: verticalScale(70),
    backgroundColor: 'white',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: moderateScale(70),
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: moderateScale(10),
  },
});
