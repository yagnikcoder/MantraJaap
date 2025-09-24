import React, { useState } from "react";
import {
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "../themes/colors";
import { useNavigation } from "@react-navigation/native";
import headerStyles from "./headerComponent.style";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerComponent from "./datePicker/datePickerComponent";

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
    setResetTrigger((prev) => !prev);
    setOpenModal(true);
  };

  return (
    <SafeAreaView edges={["top"]}>
      <StatusBar hidden={true} />

      <View style={headerStyles.container}>
        {showLeftIcon && (
          <TouchableOpacity
            onPress={onPressLeftIcon}
            style={headerStyles.leftIconContainer}
          >
            <Text style={headerStyles.leftIcon}>{leftIcon}</Text>
          </TouchableOpacity>
        )}
        <View style={headerStyles.headerTitle}>
          <Text style={headerTextStyle || headerStyles.headerTextStyle}>
            {headerTitle}
          </Text>
        </View>

        {showRightIcon && (
          <TouchableOpacity
            onPress={onPressRightIcon}
            style={headerStyles.leftIconContainer}
          >
            <Text style={headerStyles.rightIcon}>{rightIcon}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <View style={headerStyles.modalOverlay}>
          <View style={[headerStyles.modalContainer, { paddingBottom: 20 }]}>
            <DatePickerComponent
              resetTrigger={resetTrigger}
              onRangeSelect={(start, end) => {
                const fmt = (d: Date) =>
                  `${String(d.getDate()).padStart(2, "0")}-${String(
                    d.getMonth() + 1
                  ).padStart(2, "0")}-${d.getFullYear()}`;
                if (start) {
                  console.log("Selected Start Date:", fmt(start));
                }
                if (end) {
                  console.log("Selected End Date:", fmt(end));
                }
                onDateRangeSelect?.(start, end);
                setOpenModal(false);
              }}
            />
            {/* Close button at the top right */}
            <TouchableOpacity
              style={headerStyles.closeButton}
              onPress={() => setOpenModal(false)}
              activeOpacity={0.7}
            >
              <Text style={headerStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HeaderComponent;
