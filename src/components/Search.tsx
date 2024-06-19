import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import CameraIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MicIcon from 'react-native-vector-icons/Feather';
import {verticalScale, moderateScale, horizontalScale} from '../utils/Metrics';

type SearchProps = {
  onSearch: (text: string) => void;
};

const {width, height} = Dimensions.get('window');

const Search: React.FC<SearchProps> = ({onSearch}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <SearchIcon
          name="search"
          size={moderateScale(24)}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <CameraIcon
            name="camera-outline"
            size={moderateScale(24)}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MicIcon name="mic" size={moderateScale(24)} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: verticalScale(40),
    borderRadius: 5,
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#fef7f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
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
    marginHorizontal: moderateScale(5),
  },
  input: {
    flex: 1,
    fontSize: width * 0.037,
    marginLeft: moderateScale(10),
  },
});
