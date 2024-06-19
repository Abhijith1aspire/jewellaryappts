import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../props/prop';
import {useNavigation} from '@react-navigation/native';

type ProfileDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

type UserItemCardProps = {
  firstName: string;
  lastName: string;
  title: string;
  profilePic: string;
  city: string;
  country: string;
};

const UserItemCard: React.FC<UserItemCardProps> = ({
  firstName,
  lastName,
  title,
  profilePic,
  city,
  country,
}) => {
  const navigation = useNavigation<ProfileDetailScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ProfileDetailsScreen')}>
      <Image source={{uri: profilePic}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{`${title} ${firstName} ${lastName}`}</Text>
        <Text style={styles.locationText}>
          {`${city}, `}
          <Text style={styles.countryText}>{country}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    borderRadius: 12,
    marginTop: 18,
    backgroundColor: '#fef7f7',
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#555',
  },
  countryText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default UserItemCard;
