import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MarketPriceDetails from '../../components/MarketPriceDetails';
import LogoHeader from '../../components/LogoHeader';
import Search from '../../components/Search';
import HorizontalScrollContainer from '../../components/HorizontalScrollContainer';
import Card from '../../components/Card';
import {data} from '../../../data/data';
import BannerSlider from '../../components/BannerSlider';
import OffersSlider from '../../components/OffersSlider';
import {fetchData} from './actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {HomePageBannerData} from './HomeScreenModal';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const [bannerDataResponse, setBannerDataResponse] = useState<HomePageBannerData>([]);
  const scrollRef = useRef();

  const bannerDataFromRedux = useSelector(
    (state: any) => state.bannerData?.bannerData,
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchData());
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, [dispatch]),
  );

  useEffect(() => {
    if (bannerDataFromRedux) {
      setBannerDataResponse(bannerDataFromRedux);
    }
  }, [bannerDataFromRedux]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[1]}
        ref={scrollRef}>
        <MarketPriceDetails />
        <View style={styles.headerContainer}>
          <LogoHeader />
          <View style={{alignItems: 'center'}}>
            <Search onSearch={setSearchText} />
          </View>
        </View>
        <BannerSlider
          backgroundColor={
            bannerDataResponse?.data?.getTemplateList.items[0]?.backgroundColor
          }
          data={
            bannerDataResponse?.data?.getTemplateList?.items[0]
              ?.additionalFields
          }
        />
        <OffersSlider
          backgroundImage={
            bannerDataResponse?.data?.getTemplateList?.items[1]?.backgroundImage
          }
          data={
            bannerDataResponse?.data?.getTemplateList?.items[1]
              ?.additionalFields
          }
        />
        <Text style={styles.sectionTitle}>Gold Jewellery</Text>
        <HorizontalScrollContainer />
        <Card searchText={searchText} data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    zIndex: 10,
    paddingHorizontal: 14,
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#FDF2F2',
    paddingBottom: 20,
  },
  marketPriceDetailsContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#900',
    fontWeight: '400',
    marginVertical: 10,
  },
});
