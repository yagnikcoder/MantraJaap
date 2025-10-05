import React, { useState, useEffect } from 'react';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { View } from 'react-native';
import { datePickerStyles } from './datePickerComponent.style';
import dayjs from 'dayjs';
import { colors } from '../../themes/colors';

interface DatePickerComponentProps {
  onRangeSelect?: (start: Date, end: Date) => void;
  resetTrigger?: boolean; // Changes trigger reset of picker
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onRangeSelect,
  resetTrigger,
}) => {
  // Start with no pre-selected range
  const [startDate, setStartDate] = useState<DateType>();
  const [endDate, setEndDate] = useState<DateType>();
  const [hasInteracted, setHasInteracted] = useState(false);
  const defaultStyles = useDefaultStyles();

  // Reset to default dates whenever resetTrigger changes
  useEffect(() => {
    // Clear any selected dates on reset
    setStartDate(undefined);
    setEndDate(undefined);
    setHasInteracted(false);
  }, [resetTrigger]);

  // Fire onRangeSelect callback only after user interaction
  useEffect(() => {
    if (hasInteracted && startDate && endDate && onRangeSelect) {
      onRangeSelect(dayjs(startDate).toDate(), dayjs(endDate).toDate());
    }
  }, [hasInteracted, startDate, endDate, onRangeSelect]);

  return (
    <View>
      <DateTimePicker
        key={resetTrigger ? 'reset-true' : 'reset-false'} 
        mode="range"
        startDate={startDate}
        endDate={endDate}
        onChange={({ startDate, endDate }) => {
          setHasInteracted(true);
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        styles={{ ...defaultStyles, ...datePickerStyles, }}
        containerHeight={340}
        monthsFormat="short"
        weekdaysFormat="short"
        showOutsideDays={false}
        navigationPosition="right"
      />
    </View>
  );
};

export default DatePickerComponent;
