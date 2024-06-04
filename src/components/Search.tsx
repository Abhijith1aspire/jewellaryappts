import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import CameraIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MicIcon from 'react-native-vector-icons/Feather';

const Search: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <SearchIcon name="search" size={24} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <CameraIcon name="camera-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MicIcon name="mic" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FDF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
