import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {Location, Name, User, Picture} from '../UsersScreen/UserScreenModal';

type ProfileDetailsProp = {
  firstName: Name['first'];
  lastName: Name['last'];
  city: Location['city'];
  state: Location['state'];
  country: Location['country'];
  email: User['email'];
  mobileNumber: User['phone'];
  dob: User['dob'];
  gender: User['gender'];
  profilePic: Picture['thumbnail'];
};
const ProfileDetailsScreen: React.FC<ProfileDetailsProp> = () => {
  return (
    <View>
      <Text>ProfileDetailsScreen</Text>
    </View>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({});
