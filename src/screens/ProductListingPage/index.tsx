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
import Banner from '../../components/ProductListingPage/Banner';
import HorizontalScrollMenu from '../../components/ProductListingPage/HorizontalScrollMenu';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import Filter from '../../components/ProductListingPage/Filter';
import Sort from '../../components/ProductListingPage/Sort';
import BestSellerPin from '../../components/ProductListingPage/BestSellerPin';
import QuickDeliveryPin from '../../components/ProductListingPage/QuickDeliveryPin';
import NewArrivalsPin from '../../components/ProductListingPage/NewArrivalsPin';
import Card from '../../components/Card';
import {placeHolderImage} from '../../constants/constants';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPLPData} from './actions';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ProductListingPage: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const dispatch = useDispatch();
  const [plpDataResponse, setPlpDataResponse] = useState<any>({});
  const errorNoDataFound = useSelector(
    (state: any) => state.productData?.error,
  );
  const isLoading = useSelector((state: any) => state.productData?.isLoading);

  const productListDataFromRedux = useSelector(
    (state: any) => state.productData?.productData,
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchPLPData());
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }, [dispatch]),
  );

  useEffect(() => {
    if (productListDataFromRedux) {
      setPlpDataResponse(productListDataFromRedux);
    }
  }, [productListDataFromRedux]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[1]}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        <MarketPriceDetails />
        <View style={styles.headerContainer}>
          <LogoHeader />
          <View style={styles.search}>
            <Search onSearch={() => {}} />
          </View>
        </View>
        <Banner />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gold Jewellery</Text>
          <HorizontalScrollMenu />
        </View>
        <View style={styles.content}>
          <View style={styles.filterSortContainer}>
            <Filter />
            {plpDataResponse && (
              <Text style={styles.itemCountText}>
                {plpDataResponse?.plp_total_count || 0} Items
              </Text>
            )}
            <Sort />
          </View>
          <View style={styles.pinsContainer}>
            <BestSellerPin />
            <QuickDeliveryPin />
            <NewArrivalsPin />
          </View>
        </View>
        <Text>{errorNoDataFound}</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={{flex: 1}}>
            {plpDataResponse && <Card data={plpDataResponse} type={2} />}
          </View>
        )}
        <View style={styles.imageContainer}>
          <FastImage
            source={{uri: placeHolderImage}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    backgroundColor: 'white',
    width: '100%',
    zIndex: 10,
  },
  search: {
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#681016',
    marginBottom: verticalScale(10),
  },
  content: {
    flex: 1,
    paddingVertical: verticalScale(20),
    backgroundColor: '#fbf5ec',
  },
  filterSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
    width: '100%',
    marginTop: verticalScale(18),
    marginBottom: verticalScale(8),
  },
  itemCountText: {
    color: '#681016',
    fontSize: 15,
    fontWeight: '500',
  },
  pinsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    width: '100%',
    marginTop: verticalScale(8),
  },
  imageContainer: {
    width: width * 0.92,
    height: height * 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#fdefe9',
    paddingBottom: verticalScale(100),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListingPage;
