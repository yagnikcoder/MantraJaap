import React, { useState } from 'react';
import { Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './headerComponent.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from './datePicker/datePickerComponent';

interface HeaderComponentProps {
  leftIcon?: any;
  showLeftIcon?: boolean;
  leftIconNavigation?: string;
  rightIcon?: any;
  showRightIcon?: boolean;
  rightIconNavigation?: string;
  headerTitle: string;
  headerTextStyle?: any;
  onDateRangeSelect?: (start: Date, end: Date) => void;
}

const HeaderComponent = ({
  leftIcon,
  showLeftIcon = false,
  leftIconNavigation,
  rightIcon,
  showRightIcon = false,
  rightIconNavigation,
  headerTitle,
  headerTextStyle,
  onDateRangeSelect,
}: HeaderComponentProps) => {
  const navigation = useNavigation<any>();
  const [openModal, setOpenModal] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const onPressLeftIcon = () => {
    if (leftIconNavigation) {
      navigation.navigate(leftIconNavigation as never);
    } else {
      try {
        // @ts-ignore
        if (navigation.canGoBack && navigation.canGoBack()) {
          navigation.goBack();
        }
      } catch {}
    }
  };

  const onPressRightIcon = () => {
    // Toggle resetTrigger to reset date picker when modal opens
    setResetTrigger(prev => !prev);
    setOpenModal(true);
  };

  return (
    <SafeAreaView edges={['top']}>
      <StatusBar hidden={true} />

      <View style={styles.container}>
        {showLeftIcon && (
          <TouchableOpacity
            onPress={onPressLeftIcon}
            style={styles.leftIconContainer}
          >
            <Text style={styles.leftIcon}>{leftIcon}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitle}>
          <Text style={headerTextStyle || styles.headerTextStyle}>
            {headerTitle}
          </Text>
        </View>

        {showRightIcon && (
          <TouchableOpacity
            onPress={onPressRightIcon}
            style={styles.leftIconContainer}
          >
            <Text style={styles.rightIcon}>{rightIcon}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <DatePickerComponent
              resetTrigger={resetTrigger}
              onRangeSelect={(start, end) => {
                const fmt = (d: Date) =>
                  `${String(d.getDate()).padStart(2, '0')}-${String(
                    d.getMonth() + 1,
                  ).padStart(2, '0')}-${d.getFullYear()}`;
                if (start) {
                  console.log('Selected Start Date:', fmt(start));
                }
                if (end) {
                  console.log('Selected End Date:', fmt(end));
                }
                onDateRangeSelect?.(start, end);
                setOpenModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HeaderComponent;
