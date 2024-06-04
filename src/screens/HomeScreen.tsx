import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MarketPriceDetails from '../components/MarketPriceDetails';
import LogoHeader from '../components/LogoHeader';
import Search from '../components/Search';
import HorizontalScrollContainer from '../components/HorizontalScrollContainer';
import Card from '../components/Card';
import Banner from '../components/Banner';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <MarketPriceDetails />
        <LogoHeader />
        <View style={{alignItems: 'center'}}>
          <Search />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Banner />
        <Text
          style={{
            fontSize: 20,
            color: '#900',
            fontWeight: 'bold',
          }}>
          Gold Jewellary
        </Text>
        <HorizontalScrollContainer />
        <Card />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#FDF2F2',
    marginVertical: 15,
    paddingBottom: 20,
  },
});
