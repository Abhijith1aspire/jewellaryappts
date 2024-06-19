import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {jewellary} from '../../data/data';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {dummyData} from '../../data/data';
import {RootStackParamList} from '../../props/prop';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Metrics';

type JewellaryItemProps = {
  image: string;
  title: string;
};

type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

const {width, height} = Dimensions.get('window');

const JewellaryItem: React.FC<JewellaryItemProps> = ({image, title}) => {
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={{justifyContent: 'center', alignItems: 'center'}}
      onPress={() => {
        navigation.navigate('ProductDetailsScreen', dummyData[title]);
      }}>
      <View style={styles.item}>
        <Image
          source={{uri: image}}
          style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        />
      </View>
      <Text
        style={{
          fontSize: moderateScale(14),
          color: '#681016',
          fontWeight: '500',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const HorizontalScrollMenu: React.FC = () => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {jewellary.map((item, index) => {
        return (
          <JewellaryItem
            key={index.toString()}
            image={item.image}
            title={item.title}
          />
        );
      })}
    </ScrollView>
  );
};

export default HorizontalScrollMenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  item: {
    width: width * 0.2,
    height: height * 0.1,
    backgroundColor: '#fbf5ea',
    marginHorizontal: horizontalScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
});
