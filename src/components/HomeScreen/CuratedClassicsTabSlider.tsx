import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  AdditionalField,
  TabItem,
} from '../../screens/HomeScreen/HomeScreenModal';
import BannerButtons from '../HomeScreen/BannerButtons';
import {placeHolderImage} from '../../constants/constants';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/Metrics';
import FastImage from 'react-native-fast-image';

type OnlineOffersTabSliderProps = {
  headerTitle: string | null;
  tabItems?: TabItem[] | undefined;
  backgroundImage?: string | undefined;
  backgroundColor?: string | undefined;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - horizontalScale(33);

const CuratedClassicsTabSlider: React.FC<OnlineOffersTabSliderProps> = ({
  headerTitle,
  tabItems,
  backgroundImage,
  backgroundColor,
}) => {
  const tabData = tabItems?.map(item => item.tabTitle) || [];
  const [selectedItem, setSelectedItem] = useState<string | null>(tabData[0]);

  const renderItem = ({item}: {item: AdditionalField}) => {
    const imageHeight = height * 0.24;

    return (
      <View style={styles.slide}>
        <View style={{width: '100%', height: imageHeight}}>
          {item.image ? (
            <FastImage
              source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
              style={[styles.image, {height: imageHeight}]}
            />
          ) : (
            <FastImage
              source={{uri: placeHolderImage}}
              style={[styles.image, {height: imageHeight}]}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        {item.title && <Text style={styles.title}>{item.title}</Text>}
      </View>
    );
  };

  const renderFlatList = () => {
    return (
      <>
        {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}>
          <BannerButtons
            onSelectItem={(selectedItem: string | null) => {
              setSelectedItem(selectedItem);
            }}
            buttonData={tabData}
          />
        </ScrollView>
        <View style={{flex: 1, alignItems: 'center'}}>
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
      </>
    );
  };
  return (
    <>
      {backgroundImage && backgroundImage.trim().length > 0 ? (
        <ImageBackground
          source={{uri: `https://media-demo.grtjewels.com/${backgroundImage}`}}
          style={[styles.container, styles.backgroundImage]}
          resizeMode="cover">
          {renderFlatList()}
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.container,
            styles.backgroundView,
            {
              backgroundColor:
                backgroundColor && backgroundColor.trim().length > 0
                  ? backgroundColor
                  : 'white',
            },
          ]}>
          {renderFlatList()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(12),
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backgroundView: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: moderateScale(22),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(20),
    color: '#5d1115',
  },
  slide: {
    width: itemWidth,
    alignItems: 'center',
    marginHorizontal: horizontalScale(6),
    borderRadius: horizontalScale(5),
    marginTop: verticalScale(20),
  },
  image: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: verticalScale(10),
    borderRadius: horizontalScale(5),
  },
  title: {
    fontSize: verticalScale(14),
    fontWeight: '600',
    marginTop: verticalScale(10),
    color: '#5d1115',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: verticalScale(14),
    color: '#5d1115',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: width * 0.9,
    marginBottom: verticalScale(20),
  },
});

export default CuratedClassicsTabSlider;
