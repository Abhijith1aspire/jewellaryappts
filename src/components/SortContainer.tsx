import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Filter from './Filter';
import Sort from './Sort';
import BestSellerPin from './BestSellerPin';
import QuickDeliveryPin from './QuickDeliveryPin';
import NewArrivalsPin from './NewArrivalsPin';

const SortContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.filterSortContainer}>
        <Filter />
        <Text style={styles.itemCountText}>2334 Items</Text>
        <Sort />
      </View>
      <View style={styles.pinsContainer}>
        <BestSellerPin />
        <QuickDeliveryPin />
        <NewArrivalsPin />
      </View>
    </View>
  );
};

export default SortContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 100,
    marginHorizontal: 20,
  },
  filterSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  itemCountText: {
    color: '#900',
    fontSize: 14,
    textAlign: 'center',
    height: 30,
    width: 105,
  },
  pinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
});
