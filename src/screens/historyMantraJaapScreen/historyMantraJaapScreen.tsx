import React, { useState, useMemo } from 'react';
import { Text, View, FlatList } from 'react-native';

import styles from './historyMantraJaapScreen.style';
import HeaderComponent from '../../components/headerComponent';
import { constKeyword } from '../../utility/constKeyword';
import { useAppSelector } from '../../hooks';
import { colors } from '../../themes/colors';
import { BackArrowIcon, BirthdayCalendarIcon } from '../../utility/SvgIcons';

const HistoryMantraJaapScreen = () => {
  // ---------------------------------------------------
  // Utility function: Format a JS Date object into "DD-MM-YYYY"
  // Example: 2025-09-13 → "13-09-2025"
  // ---------------------------------------------------
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}-${String(
      d.getMonth() + 1,
    ).padStart(2, '0')}-${d.getFullYear()}`;

  // ---------------------------------------------------
  // Default range setup → Today to +6 days (7-day window)
  // ---------------------------------------------------
  const today = new Date();

  // Start = today at midnight (ignore hours, minutes, seconds)
  const defaultStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  // End = 6 days after start
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultStart.getDate() + 6);

  // Store the selected range in state
  // - When screen loads → default 7 days
  // - When user picks new dates → update this
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: defaultStart, end: defaultEnd });

  // Human-readable text of the selected range
  // Shown above the list
  const [selectedRangeText, setSelectedRangeText] = useState<string>(
    `${fmt(defaultStart)} to ${fmt(defaultEnd)}`,
  );

  // ---------------------------------------------------
  // Get Redux state → byDate
  // Shape example:
  // {
  //   "13-09-2025": { "10:00 AM": 5, "11:00 AM": 50 },
  //   "14-09-2025": { "09:00 AM": 2 }
  // }
  // ---------------------------------------------------
  const byDate = useAppSelector((state) => state.counter.byDate);

  // ---------------------------------------------------
  // Transform Redux object into array & filter by selected range
  // ---------------------------------------------------
  const dataForFlatList = useMemo(() => {
    // Step 1: Convert object into array → easier for FlatList
    // Example: { "13-09-2025": {...} } → [ { date: "13-09-2025", hours: {...} } ]
    const entries = Object.entries(byDate).map(([date, hours]) => ({
      date,
      hours,
    }));

    // Step 2: If no date range is selected → return everything
    if (!selectedRange.start && !selectedRange.end) return entries;

    // Convert Date objects into milliseconds (timestamps) for comparison
    const startTime = selectedRange.start?.getTime() ?? null;
    const endTime = selectedRange.end?.getTime() ?? startTime;

    // Step 3: Filter entries by range
    return entries.filter((item) => {
      // Parse item.date string ("DD-MM-YYYY") back into a JS Date
      const [dd, mm, yyyy] = item.date.split('-').map(Number);
      const itemDate = new Date(yyyy, mm - 1, dd).getTime();

      // Case A: Both start & end exist → keep if in range
      // Example: 13-09-2025 (item) between 10-09-2025 and 20-09-2025 → keep
      if (startTime && endTime) {
        return itemDate >= startTime && itemDate <= endTime;
      }

      // Case B: Only start exists (single-day selection)
      // Example: user selected "15-09-2025" only
      else if (startTime) {
        return itemDate === startTime;
      }

      // Case C: Nothing selected → keep all (already handled above)
      return true;
    });
  }, [byDate, selectedRange]);

  // ---------------------------------------------------
  // Helper: Sum all counts for a day
  // Example: { "10:00 AM": 5, "11:00 AM": 2 } → 7
  // ---------------------------------------------------
  const getDailyTotal = (hours: Record<string, number>) =>
    Object.values(hours).reduce((sum, count) => sum + count, 0);

  // ---------------------------------------------------
  // Render all hours within a day
  // Example: Show each "hour: count" row
  // ---------------------------------------------------
  const renderHours = (hours: Record<string, number>) => {
    // Only include entries like "10:00 AM", skip special keys
    const hourEntries = Object.entries(hours).filter(([key]) =>
      key.includes(':'),
    );

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

  // ---------------------------------------------------
  // Render one date section
  // Includes:
  // - Date text
  // - Total for the day
  // - Hour breakdown
  // ---------------------------------------------------
  const renderItem = ({
    item,
  }: {
    item: { date: string; hours: Record<string, number> };
  }) => {
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

  // ---------------------------------------------------
  // Component JSX
  // ---------------------------------------------------
  return (
    <View style={styles.container}>
      {/* Header with Back (left) and Calendar (right) */}
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
        // This callback runs when user selects a date or date range in the calendar
        onDateRangeSelect={(start, end) => {
          // Save the new range in state
          setSelectedRange({ start, end });

          // Update the label text
          if (start && end) {
            setSelectedRangeText(`${fmt(start)} to ${fmt(end)}`);
          } else if (start) {
            setSelectedRangeText(fmt(start));
          }
        }}
      />

      {/* Display selected range above the list */}
      <Text style={styles.selectedRangeText}>{selectedRangeText}</Text>

      {/* List of history entries */}
      <FlatList
        data={dataForFlatList} // already filtered
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No history available</Text>
        }
      />
    </View>
  );
};

export default HistoryMantraJaapScreen;
