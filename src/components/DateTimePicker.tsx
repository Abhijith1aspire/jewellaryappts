import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

type DateTimePickerProps = {
  openDateTimePicker: boolean;
  setOpenDateTimePicker: () => {};
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  openDateTimePicker,
  setOpenDateTimePicker,
}) => {
  const [date, setDate] = useState<any>(new Date());
  console.log('Selected Date', date);
  return (
    <View>
      <Text>DatePicker</Text>
      <DatePicker
        modal
        open={openDateTimePicker}
        date={date}
        onConfirm={date => {
          setOpenDateTimePicker();
          setDate(date);
        }}
        onCancel={() => {
          setOpenDateTimePicker();
        }}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
