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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../props/prop';
import {moderateScale, verticalScale} from '../utils/Metrics';

type CartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CartScreen'
>;

const LogoHeader: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const {width, height} = Dimensions.get('window');
  const logoWidth = width * 0.25;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <MenuIcon
            name="menu"
            size={moderateScale(25)}
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
            size={moderateScale(23)}
            color="#5d1115"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
          <AccountIcon
            name="account-outline"
            size={moderateScale(26)}
            color="#5d1115"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FavoritesScreen')}>
          <LikeIcon
            name="hearto"
            size={moderateScale(22)}
            color="#5d1115"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <ShoppingBagIcon
            name="shopping-bag"
            size={moderateScale(22)}
            color="#5d1115"
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
    flex: 1,
    height: verticalScale(70),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: moderateScale(10),
  },
});
