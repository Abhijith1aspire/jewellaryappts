import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MarketPriceDetails from '../../components/MarketPriceDetails';
import LogoHeader from '../../components/LogoHeader';
import Search from '../../components/Search';
import {fetchData} from './actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {verticalScale} from '../../utils/Metrics';
import ComponentFactory from '../../components/HomeScreen/ComponentFactory';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const [bannerDataResponse, setBannerDataResponse] = useState<any>({});
  const scrollRef = useRef<ScrollView>(null);

  const bannerDataFromRedux = useSelector(
    (state: any) => state.bannerData?.bannerData,
  );
  const errorNoDataFound = useSelector((state: any) => state.bannerData?.error);
  const isLoading = useSelector((state: any) => state.bannerData?.isLoading);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchData());
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }, [dispatch]),
  );

  useEffect(() => {
    if (bannerDataFromRedux) {
      setBannerDataResponse(bannerDataFromRedux);
    }
  }, [bannerDataFromRedux]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[1]}
        ref={scrollRef}>
        <MarketPriceDetails />
        <View style={styles.headerContainer}>
          <LogoHeader />
          <View style={styles.search}>
            <Search onSearch={setSearchText} />
          </View>
        </View>
        <Text>{errorNoDataFound}</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          bannerDataResponse &&
          bannerDataResponse?.data?.getTemplateList?.items?.map(
            (item: any, index: number) => ComponentFactory(item, index),
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    zIndex: 10,
  },
  search: {
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#fdefe9',
    paddingBottom: verticalScale(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
