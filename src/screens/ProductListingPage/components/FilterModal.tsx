import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal as RNModal,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFilters} from '../actions';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  verticalScale,
  horizontalScale,
  fontScale,
  moderateScale,
} from '../../../utils/Metrics';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const FilterModal = ({visible, closeModal}) => {
  const dispatch = useDispatch();
  const filterDataFromRedux = useSelector(state => state.productData?.filters);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchFilters());
    }, [dispatch]),
  );

  useEffect(() => {
    if (filterDataFromRedux && filterDataFromRedux.length > 0) {
      setFilters(filterDataFromRedux);
      const initialFilter = filterDataFromRedux[0];
      setSelectedFilter(initialFilter.filter_field);
      setSelectedOptions(initialFilter.filter_options);
    }
  }, [filterDataFromRedux]);

  const handleCheckBoxChange = (category, value) => {
    setSelectedFilters(prevState => {
      const newFilters = {...prevState};
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      const index = newFilters[category].indexOf(value);
      if (index !== -1) {
        newFilters[category].splice(index, 1);
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  const handleFilterSelect = filterField => {
    setSelectedFilter(filterField);
    const filter = filters.find(cur => cur.filter_field === filterField);
    setSelectedOptions(filter ? filter.filter_options : []);
  };

  const renderFilterOptions = (options, category) => {
    if (!options) return null;
    return options.map((option, index) => {
      const isSelected = selectedFilters[category]?.includes(
        option.filter_value,
      );
      const isFirst = index === 0;
      const isLast = index === options.length - 1;

      const optionStyle = [
        styles.filterSection,
        isSelected && styles.selectedFilter,
        isSelected && isFirst && styles.selectedFilterTop,
        isSelected && isLast && styles.selectedFilterBottom,
      ];

      return (
        <TouchableOpacity
          key={index}
          style={optionStyle}
          onPress={() => handleCheckBoxChange(category, option.filter_value)}>
          <Text style={styles.filterLabel}>{option.filter_label}</Text>
          <Text style={styles.filterCount}>({option.filter_count})</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon name="close" size={18} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={['#FDECCF', '#F6EBD6']}
          start={{x: -0.65, y: 0.5}}
          end={{x: 1.02, y: 0.5}}
          style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.windowContainer}>
              <View
                style={[
                  styles.leftWindow,
                  {height: verticalScale(48) * filters.length},
                ]}>
                <ScrollView>
                  {filters &&
                    filters.length > 0 &&
                    filters.map((filter, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.filterSection,
                          selectedFilter === filter.filter_field &&
                            styles.selectedLeftFilter,
                        ]}
                        onPress={() => {
                          filter.filter_field &&
                            handleFilterSelect(filter.filter_field);
                        }}>
                        {filter.filter_title && (
                          <Text style={styles.filterTitle}>
                            {filter.filter_title}
                          </Text>
                        )}
                        {selectedFilter === filter.filter_field && (
                          <LinearGradient
                            colors={['#EEB1B5', '#F2BFA2']}
                            start={{x: 0, y: 0.008}}
                            end={{x: 1, y: 0.9928}}
                            style={[
                              styles.selectedIndicator,
                              index === 0 && styles.selectedIndicatorTop,
                              index === filters.length - 1 &&
                                styles.selectedIndicatorBottom,
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
              <View
                style={[
                  styles.rightWindow,
                  {height: verticalScale(48) * selectedOptions.length},
                ]}>
                <ScrollView>
                  {selectedOptions.length > 0 &&
                    renderFilterOptions(selectedOptions, selectedFilter)}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('Apply filter');
              }}>
              <Text style={styles.buttonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
  },
  windowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(10),
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(48),
    paddingLeft: horizontalScale(10),
    borderBottomWidth: moderateScale(0.8),
    borderBottomColor: '#EDEAE5',
    position: 'relative',
  },
  filterTitle: {
    fontSize: fontScale(12),
    fontWeight: '400',
    color: '#681016',
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    marginVertical: verticalScale(10),
    height: verticalScale(50),
    width: width,
    paddingHorizontal: horizontalScale(10),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  button: {
    height: '100%',
    width: '40%',
    backgroundColor: '#681017', // solid color for the button
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    marginHorizontal: horizontalScale(5),
  },
  buttonText: {
    color: '#fff',
  },
  leftWindow: {
    width: width * 0.4,
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
  },
  rightWindow: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
  },
  selectedIndicator: {
    position: 'absolute',
    left: horizontalScale(0),
    top: verticalScale(0),
    bottom: verticalScale(0),
    width: '5%',
  },
  selectedIndicatorTop: {
    position: 'absolute',
    left: horizontalScale(0),
    top: verticalScale(0),
    bottom: verticalScale(0),
    width: '5%',
    borderTopLeftRadius: 15,
  },
  selectedIndicatorBottom: {
    position: 'absolute',
    left: horizontalScale(0),
    top: verticalScale(0),
    bottom: verticalScale(0),
    width: '5%',
    borderBottomLeftRadius: 15,
  },
  filterLabel: {
    fontSize: fontScale(10),
    fontWeight: '700',
    color: '#681016',
  },
  filterCount: {
    fontSize: fontScale(10),
    fontWeight: '400',
    color: '#BDA2A4',
    marginLeft: horizontalScale(15),
  },
  selectedFilter: {
    backgroundColor: '#FFF2F3',
  },
  selectedFilterTop: {
    backgroundColor: '#FFF2F3',
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
  selectedFilterBottom: {
    backgroundColor: '#FFF2F3',
    borderBottomRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginRight: horizontalScale(15),
    marginBottom: verticalScale(10),
  },
  closeButton: {
    backgroundColor: '#f8ebd5',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
  },
  closeIcon: {
    color: '#681017',
  },
});

export default FilterModal;
