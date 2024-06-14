import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MarketPriceDetails from '../../components/MarketPriceDetails';
import LogoHeader from '../../components/LogoHeader';
import Search from '../../components/Search';
import CarouselSlider from '../../components/CarouselSlider';
import OnlineOffersHalfSliderButton from '../../components/OnlineOffersHalfSliderButton';
import {fetchData} from './actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {HomePageBannerData} from './HomeScreenModal';
import Slider from '../../components/LatestClassicsSlider';
import OurBrandsStaticBannersButton from '../../components/OurBrandsStaticBanners';
import GiftsHalfStaticButton from '../../components/GiftsHalfStaticButton';
import StaticBannerSliderButton from '../../components/StaticBannerSliderButton';
import FullSlider from '../../components/FullSlider';
import AboutGRTHaldSliderButton from '../../components/AboutGRTHalfSliderButton';
import LocationStaticBanners from '../../components/LocationStaticBanner';
import VirtualShoppingHalfStaticBannerButton from '../../components/VirtualShoppingHalfStaticBannerButton';
import LatestClassicsSlider from '../../components/LatestClassicsSlider';
import CuratedClassicsTabSlider from '../../components/CuratedClassicsTabSlider';
import JewellaryCustomizationStaticbanner from '../../components/JewellaryCustomizationStaticbanner';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const [bannerDataResponse, setBannerDataResponse] =
    useState<HomePageBannerData>([]);
  const scrollRef = useRef<ScrollView>(null);

  const bannerDataFromRedux = useSelector(
    (state: any) => state.bannerData?.bannerData,
  );
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

  const renderComponent = (item, index) => {
    switch (item.type) {
      case 'carousel':
        return item.additionalFields ? (
          <CarouselSlider
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            backgroundImage={item.backgroundImage}
          />
        ) : null;
      case 'half-slider-button':
        if (item.title === 'Checkout our online offers') {
          return item.additionalFields ? (
            <OnlineOffersHalfSliderButton
              key={index}
              backgroundImage={item.backgroundImage}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={item.backgroundColor}
            />
          ) : null;
        }
        if (item.title === 'About GRT') {
          return item.additionalFields ? (
            <AboutGRTHaldSliderButton
              key={index}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={''}
              backgroundImage={item.backgroundImage}
            />
          ) : null;
        }

        break;
      case 'slider':
        return item.additionalFields ? (
          <LatestClassicsSlider
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundImage={item.backgroundImage}
          />
        ) : null;
      case 'tab':
        return item.tabItems ? (
          <CuratedClassicsTabSlider
            key={index}
            headerTitle={item.title}
            tabItems={item.tabItems}
          />
        ) : null;
      case 'static-banners-button':
        if (item.title === 'Our Brands') {
          return item.additionalFields ? (
            <OurBrandsStaticBannersButton
              key={index}
              backgroundColor={item.backgroundColor}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundImage={item.backgroundImage}
            />
          ) : null;
        }
        if (
          item.title === 'Jewellery Customisation' ||
          item.title === 'Save big! With our Jewellery Savings Schemes'
        ) {
          return item.additionalFields ? (
            <JewellaryCustomizationStaticbanner
              key={index}
              backgroundColor={item.backgroundColor}
              data={item.additionalFields}
              headerTitle={item.title}
              cssClass={item.cssClass}
              backgroundImage={item.backgroundImage}
            />
          ) : null;
        }
        break;
      case 'half-static-banners-button':
        if (item.title === 'Gifting your loved ones just got easier') {
          return item.additionalFields ? (
            <GiftsHalfStaticButton
              key={index}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={item.backgroundColor}
              backgroundImage={item.backgroundImage}
            />
          ) : null;
        }
        if (item.title === 'Virtual Shopping') {
          return item.additionalFields ? (
            <VirtualShoppingHalfStaticBannerButton
              key={index}
              data={item.additionalFields}
              headerTitle={item.title}
              backgroundColor={item.backgroundColor}
              backgroundImage={item.backgroundImage}
            />
          ) : null;
        }
        break;
      case 'static-banner-slider-button':
        return item.additionalFields ? (
          <StaticBannerSliderButton
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
          />
        ) : null;
      case 'full-slider':
        return item.additionalFields ? (
          <FullSlider
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
          />
        ) : null;
      case 'static-banners':
        if (item.title === 'Come visit us at any of our store') {
          return item.additionalFields ? (
            <LocationStaticBanners
              key={index}
              backgroundColor={item.backgroundColor}
              data={item.additionalFields}
              headerTitle={item.title}
            />
          ) : null;
        }
        break;
      default:
        return null;
    }
  };

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
        <Text>{bannerDataResponse?.error}</Text>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          bannerDataResponse?.data?.getTemplateList.items?.map(renderComponent)
        )}
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
    color: '#5d1115',
    fontWeight: '400',
    marginVertical: 10,
  },
});
