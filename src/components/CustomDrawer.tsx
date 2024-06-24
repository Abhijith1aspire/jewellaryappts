import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const CustomDrawer = props => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = section => {
    setExpandedSections(prevExpandedSections =>
      prevExpandedSections.includes(section)
        ? prevExpandedSections.filter(prev => prev !== section)
        : [...prevExpandedSections, section],
    );
  };

  const sections = [
    {
      title: 'DIAMOND JEWELLERY',
      subItems: [
        'Rings',
        'Earrings',
        'Pendants',
        'Necklaces',
        'Bangles & Bracelets',
        'Chains',
        'Mangalsutra',
        'Nosepin',
      ],
    },
    {
      title: 'GOLD JEWELLERY',
      subItems: ['Rings', 'Earrings', 'Pendants', 'Necklaces'],
    },
    {
      title: 'SILVER JEWELLERY',
      subItems: ['Rings', 'Earrings', 'Pendants', 'Necklaces'],
    },
    {
      title: 'GOLD COINS',
      subItems: ['Rings', 'Earrings', 'Pendants', 'Necklaces'],
    },
    {
      title: 'SILVER ARTICLES',
      subItems: ['Rings', 'Earrings', 'Pendants', 'Necklaces'],
    },
    {
      title: 'COLLECTION',
      subItems: ['Rings', 'Earrings', 'Pendants', 'Necklaces'],
    },
    {
      title: 'GRT LIVE',
      subItems: ['Rings', 'Earrings', 'Pendants', 'Necklaces'],
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AccountIcon
            name="account-circle-outline"
            size={70}
            color="#5e0006"
          />
          <Text style={styles.userName}>PREM</Text>
        </View>
        <Image
          style={styles.logo}
          source={require('../assets/images/grt.png')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.map(section => (
          <View key={section.title}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.title)}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
              <Icon
                name={
                  expandedSections.includes(section.title)
                    ? 'expand-less'
                    : 'expand-more'
                }
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            {expandedSections.includes(section.title) && (
              <View style={styles.sectionContent}>
                {section.subItems.map(subItem => (
                  <TouchableOpacity
                    key={subItem}
                    style={styles.sectionContentItem}
                    onPress={() => console.log(`${subItem} pressed`)}>
                    <Text style={styles.sectionContentItemText}>{subItem}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: height * 0.15,
    justifyContent: 'space-between',
  },
  logo: {
    height: '80%',
    resizeMode: 'contain',
    marginLeft: 20,
  },
  userName: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#e6e5ea',
    marginVertical: 3,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionContent: {
    backgroundColor: 'white',
  },
  sectionContentItem: {
    paddingVertical: 14,
    borderTopWidth: 0.2,
    borderTopColor: 'black',
  },
  sectionContentItemText: {
    fontSize: 14,
    marginLeft: 20,
    color: 'black',
  },
});

export default CustomDrawer;
