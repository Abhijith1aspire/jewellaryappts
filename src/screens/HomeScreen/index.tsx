import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MarketPriceDetails from '../../components/MarketPriceDetails';
import LogoHeader from '../../components/LogoHeader';
import Search from '../../components/Search';
import HorizontalScrollContainer from '../../components/HorizontalScrollContainer';
import Card from '../../components/Card';
import Banner from '../../components/Banner';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  console.log(searchText);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[1]}>
        <View style={styles.marketPriceDetailsContainer}>
          <MarketPriceDetails />
        </View>
        <View style={styles.headerContainer}>
          <LogoHeader />
          <View style={{alignItems: 'center'}}>
            <Search onSearch={setSearchText} />
          </View>
        </View>
        <Banner />
        <Text style={styles.sectionTitle}>Gold Jewellery</Text>
        <HorizontalScrollContainer />
        <Card searchText={searchText} />
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
