import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MarketPriceDetails from '../../components/MarketPriceDetails';
import LogoHeader from '../../components/LogoHeader';
import Search from '../../components/Search';
import CarouselSlider from '../../components/HomeScreen/CarouselSlider';
import OnlineOffersHalfSliderButton from '../../components/HomeScreen/OnlineOffersHalfSliderButton';
import {fetchData} from './actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import LatestClassicsSlider from '../../components/HomeScreen/LatestClassicsSlider';
import OurBrandsStaticBannersButton from '../../components/HomeScreen/OurBrandsStaticBanners';
import GiftsHalfStaticButton from '../../components/HomeScreen/GiftsHalfStaticButton';
import StaticBannerSliderButton from '../../components/HomeScreen/StaticBannerSliderButton';
import FullSlider from '../../components/HomeScreen/FullSlider';
import AboutGRTHaldSliderButton from '../../components/HomeScreen/AboutGRTHalfSliderButton';
import LocationStaticBanners from '../../components/HomeScreen/LocationStaticBanner';
import VirtualShoppingHalfStaticBannerButton from '../../components/HomeScreen/VirtualShoppingHalfStaticBannerButton';
import CuratedClassicsTabSlider from '../../components/HomeScreen/CuratedClassicsTabSlider';
import JewellaryCustomizationStaticbanner from '../../components/HomeScreen/JewellaryCustomizationStaticbanner';
import {verticalScale} from '../../utils/Metrics';
import BottomTabs from '../../components/HomeScreen/BottomTabs';

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

  const renderComponent = (item: any, index: number) => {
    switch (item.type) {
      case 'carousel':
        return (
          <CarouselSlider
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            backgroundImage={item.backgroundImage}
          />
        );
      case 'half-slider-button':
        if (item.title === 'Checkout our online offers') {
          return (
            <OnlineOffersHalfSliderButton
              key={index}
              backgroundImage={item.backgroundImage}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={item.backgroundColor}
            />
          );
        }
        if (item.title === 'About GRT') {
          return (
            <AboutGRTHaldSliderButton
              key={index}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={''}
              backgroundImage={item.backgroundImage}
            />
          );
        }
        break;
      case 'slider':
        return (
          <LatestClassicsSlider
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundImage={item.backgroundImage}
          />
        );
      case 'tab':
        return (
          <CuratedClassicsTabSlider
            key={index}
            headerTitle={item.title}
            tabItems={item.tabItems}
          />
        );
      case 'static-banners-button':
        if (item.title === 'Our Brands') {
          return (
            <OurBrandsStaticBannersButton
              key={index}
              backgroundColor={item.backgroundColor}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundImage={item.backgroundImage}
            />
          );
        }
        if (
          item.title === 'Jewellery Customisation' ||
          item.title === 'Save big! With our Jewellery Savings Schemes'
        ) {
          return (
            <JewellaryCustomizationStaticbanner
              key={index}
              backgroundColor={item.backgroundColor}
              data={item.additionalFields}
              headerTitle={item.title}
              cssClass={item.cssClass}
              backgroundImage={item.backgroundImage}
            />
          );
        }
        break;
      case 'half-static-banners-button':
        if (item.title === 'Gifting your loved ones just got easier') {
          return (
            <GiftsHalfStaticButton
              key={index}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={item.backgroundColor}
              backgroundImage={item.backgroundImage}
            />
          );
        }
        if (item.title === 'Virtual Shopping') {
          return (
            <VirtualShoppingHalfStaticBannerButton
              key={index}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={item.backgroundColor}
              backgroundImage={item.backgroundImage}
            />
          );
        }
        break;
      case 'static-banner-slider-button':
        return (
          <StaticBannerSliderButton
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
          />
        );
      case 'full-slider':
        return (
          <FullSlider
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
          />
        );
      case 'static-banners':
        if (item.title === 'Come visit us at any of our store') {
          return (
            <LocationStaticBanners
              key={index}
              backgroundColor={item.backgroundColor}
              data={item.additionalFields}
              headerTitle={item.title}
            />
          );
        }
        break;
      default:
        return null;
    }
  };

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
          bannerDataResponse?.data?.getTemplateList?.items?.map(
            (item: any, index: number) => renderComponent(item, index),
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
