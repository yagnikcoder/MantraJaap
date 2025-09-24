import React, { useState, useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import styles from './historyMantraJaapScreen.style';
import HeaderComponent from '../../components/headerComponent';
import { constKeyword } from '../../utility/constKeyword';
import { useAppSelector } from '../../ hooks';
import { colors } from '../../themes/colors';
import { BackArrowIcon, BirthdayCalendarIcon } from '../../utility/SvgIcons';

const HistoryMantraJaapScreen = () => {
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}-${String(
      d.getMonth() + 1,
    ).padStart(2, '0')}-${d.getFullYear()}`;

  // Default 7-day range: today to +6 days
  const today = new Date();
  const defaultStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultStart.getDate() + 6);
  const [selectedRangeText, setSelectedRangeText] = useState<string>(
    `${fmt(defaultStart)} to ${fmt(defaultEnd)}`,
  );

  // Select the byDate data from Redux
  const byDate = useAppSelector((state) => state.counter.byDate);

  // Transform byDate object into array for FlatList
  const dataForFlatList = useMemo(() => {
    return Object.entries(byDate).map(([date, hours]) => ({
      date,
      hours,
    }));
  }, [byDate]);

  // Calculate total count for a day by summing all hour entries
  const getDailyTotal = (hours: Record<string, number>) => {
    return Object.values(hours).reduce((sum, count) => sum + count, 0);
  };

  // Render function for each hour entry per date
  const renderHours = (hours: Record<string, number>) => {
    // Filter out any non-hour entries (in case they exist)
    const hourEntries = Object.entries(hours).filter(([key]) => key.includes(':'));
    
    return (
      <View>
        {hourEntries.map(([hour, count]) => (
          <View key={hour} style={styles.hourRow}>
            <Text style={styles.hourText}>{hour}</Text>
            <Text style={styles.countText}>{count}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render function for each date item in FlatList
  const renderItem = ({ item }: { item: { date: string; hours: Record<string, number> } }) => {
    const dailyTotal = getDailyTotal(item.hours);
    
    return (
      <View style={styles.dateSection}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.dailyTotal}>Total: {dailyTotal}</Text>
        </View>
        {renderHours(item.hours)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftIcon={
          <BackArrowIcon size={24} color={colors.lightPrimaryColor} />
        }
        showLeftIcon={true}
        headerTitle="History"
        headerTextStyle={styles.headerTextStyle}
        rightIcon={
          <BirthdayCalendarIcon size={24} color={colors.lightPrimaryColor} />
        }
        showRightIcon={true}
        rightIconNavigation={constKeyword.CALENDER}
        onDateRangeSelect={(start, end) => {
          if (start && end) {
            setSelectedRangeText(`${fmt(start)} to ${fmt(end)}`);
          } else if (start) {
            setSelectedRangeText(fmt(start));
          }
        }}
      />

      <Text style={styles.selectedRangeText}>{selectedRangeText}</Text>

      <FlatList
        data={dataForFlatList}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No history available</Text>}
      />
    </View>
  );
};

export default HistoryMantraJaapScreen;
