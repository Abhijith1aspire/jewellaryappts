import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import CameraIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MicIcon from 'react-native-vector-icons/Feather';

type SearchProps = {
  onSearch: (text: string) => void;
};

const Search: React.FC<SearchProps> = ({onSearch}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <SearchIcon name="search" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />
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
    width: '100%',
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FDF2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
