import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import UserItemCard from '../../components/ItemCard';
import {fetchData} from './action';
import {useDispatch, useSelector} from 'react-redux';
import {User} from './UserScreenModal';

const UserScreen = () => {
  const dispatch = useDispatch();
  const [userDataResponse, setuserDataResponse] = useState<User[]>([]);

  const userDataFromRedux = useSelector(
    (state: any) => state.userData?.userData,
  );

  useEffect(() => {
    if (userDataFromRedux?.length === 0) {
      dispatch(fetchData());
    } else {
      setuserDataResponse(userDataFromRedux);
    }
  }, [userDataFromRedux, dispatch]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingVertical: 20}}>
        {userDataResponse &&
          userDataResponse?.results?.map((item: User, index: number) => (
            <UserItemCard
              key={index.toString()}
              firstName={item.name?.first}
              lastName={item.name?.last}
              title={item.name?.title}
              profilePic={item.picture?.thumbnail}
              city={item.location?.city}
              country={item.location?.city}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;
