import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {AdditionalField, TabItem} from '../screens/HomeScreen/HomeScreenModal';
import BannerButtons from './BannerButtons';
import {placeHolderImage} from '../constants/constants';

type OnlineOffersTabSliderProps = {
  headerTitle: string | null;
  tabItems?: TabItem[] | undefined;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - 66;

const CuratedClassicsTabSlider: React.FC<OnlineOffersTabSliderProps> = ({
  headerTitle,
  tabItems,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const renderItem = ({item}: {item: AdditionalField}) => {
    const imageHeight = height * 0.16;

    return (
      <View style={styles.slide}>
        {item.image ? (
          <Image
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={[styles.image, {height: imageHeight}]}
          />
        ) : (
          <Image
            source={{
              uri: placeHolderImage,
            }}
            style={[styles.image, {height: imageHeight}]}
            resizeMode="contain"
          />
        )}
        {item.title && <Text style={styles.title}>{item.title}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginBottom: 20, paddingHorizontal: 8}}>
        <BannerButtons
          onSelectItem={(selectedItem: string | null) => {
            console.log('Selected item:', selectedItem);
            setSelectedItem(selectedItem);
          }}
        />
      </ScrollView>
      <FlatList
        data={
          selectedItem
            ? (tabItems &&
                tabItems.find(item => item.tabTitle === selectedItem)
                  ?.additionalFields) ??
              []
            : []
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth * 2 + 20}
        decelerationRate="fast"
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items to display</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 12,
    height: height * 0.41,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    color: '#5d1115',
    paddingHorizontal: 40,
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    color: '#5d1115',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width / 2 - 80,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});

export default CuratedClassicsTabSlider;
