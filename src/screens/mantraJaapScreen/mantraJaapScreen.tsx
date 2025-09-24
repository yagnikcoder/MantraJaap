import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './mantraJaapScreen.style';
import HeaderComponent from '../../components/headerComponent';
import AppTextComponent from '../../components/appText/appTextComponent';
import {
  formatCount,
  getDynamicFontSize,
  formatExactIndian,
} from '../../utility/commonFunctions';
import { increment, storeDailyCount } from '../../Slice/mantraJaapCounterSlice';
import { useAppDispatch } from '../../ hooks';
import { HistoryIcon } from '../../utility/SvgIcons';
import { colors } from '../../themes/colors';

const STORAGE_KEYS = {
  LAST_DATE: 'last_count_date',
  LOCAL_COUNT: 'local_count',
};

const MantraJaapScreen = () => {
  const dispatch = useAppDispatch();
  const [localCount, setLocalCount] = useState(0);
  const [lastCountDate, setLastCountDate] = useState<string | null>(null);

  const getTodayDateKey = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Load saved count and date on mount
  useEffect(() => {
    (async () => {
      try {
        const storedDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_DATE);
        const storedCount = await AsyncStorage.getItem(
          STORAGE_KEYS.LOCAL_COUNT,
        );
        const todayKey = getTodayDateKey();

        if (storedDate && storedDate !== todayKey) {
          // Day changed, push stored count to Redux before resetting
          dispatch(
            storeDailyCount({
              date: storedDate,
              count: Number(storedCount) || 0,
            }),
          );

          setLocalCount(0);
          await AsyncStorage.setItem(STORAGE_KEYS.LOCAL_COUNT, '0');
          await AsyncStorage.setItem(STORAGE_KEYS.LAST_DATE, todayKey);
          setLastCountDate(todayKey);
        } else {
          // Same day, load stored local count
          setLocalCount(Number(storedCount) || 0);
          setLastCountDate(storedDate || todayKey);
        }
      } catch (e) {
        // handle error, e.g., first time or AsyncStorage failure
        setLocalCount(0);
        setLastCountDate(getTodayDateKey());
      }
    })();
  }, [dispatch]);

  // Increment handler
  const onPressMantraJaap = async () => {
    try {
      const todayKey = getTodayDateKey();

      if (lastCountDate && lastCountDate !== todayKey) {
        // Store previous day count to Redux
        dispatch(storeDailyCount({ date: lastCountDate, count: localCount }));

        // Reset local count for new day
        setLocalCount(1);
        await AsyncStorage.setItem(STORAGE_KEYS.LOCAL_COUNT, '1');
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_DATE, todayKey);
        setLastCountDate(todayKey);
      } else {
        // Same day, increment local count
        const newCount = localCount + 1;
        setLocalCount(newCount);
        await AsyncStorage.setItem(
          STORAGE_KEYS.LOCAL_COUNT,
          newCount.toString(),
        );
        if (!lastCountDate) {
          await AsyncStorage.setItem(STORAGE_KEYS.LAST_DATE, todayKey);
          setLastCountDate(todayKey);
        }
      }

      // Also update Redux total count immediately if needed
      dispatch(increment());
    } catch (e) {
      // handle AsyncStorage errors if required
    }
  };

  const formattedCount = formatCount(localCount);
  const dynamicFontSize = getDynamicFontSize(localCount);
  const showExact = localCount >= 10000; // when compact format may apply
  const exactCount = formatExactIndian(localCount);

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftIcon={<HistoryIcon size={20} color={colors.lightPrimaryColor} />}
        leftIconNavigation="HistoryMantraJaapScreen"
        showLeftIcon={true}
        headerTitle="MantraJaap"
        headerTextStyle={styles.headerTextStyle}
      />
      <TouchableOpacity
        style={styles.mantraJaapContainer}
        onPress={onPressMantraJaap}
      >
        <AppTextComponent
          text={formattedCount}
          style={[styles.mantraJaapText, { fontSize: dynamicFontSize }]}
        />
        {showExact && (
          <AppTextComponent text={exactCount} style={styles.exactCountText} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MantraJaapScreen;
