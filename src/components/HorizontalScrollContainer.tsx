import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {jewellary} from '../../data/data';

type JewellaryItemProps = {
  image: string;
  title: string;
};

const JewellaryItem: React.FC<JewellaryItemProps> = ({image, title}) => {
  return (
    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.item}>
        <Image
          source={{uri: image}}
          style={{width: 80, height: 80, resizeMode: 'stretch'}}
        />
      </View>
      <Text style={{fontSize: 14, color: '#900', fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const HorizontalScrollContainer: React.FC = () => {
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

export default HorizontalScrollContainer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#900',
    borderWidth: 0.2,
  },
});
