import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
export const datePickerStyles = StyleSheet.create({
  today: {
    borderColor: colors.primaryColor,
    borderWidth: 2,
    borderRadius:10,
    color: colors.primaryColor,
    backgroundColor: colors.primaryColor,
  },
  selected: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
    borderWidth: 2,
    borderRadius:10,
  },
  selected_label: {
    color: colors.blackColor,
    fontWeight: 'bold',
  },
  day: {
    fontWeight: '600',
    color: '#222',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  weekDaysText: {
    color: '#90a4ae',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.3,
  },
  day_label:{
    color: colors.blackColor,
  },
  button_next:{
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_next_text:{
    color: colors.blackColor,
    fontWeight: 'bold',
  },
  button_prev:{
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_prev_text:{
    color: colors.blackColor,
    fontWeight: 'bold',
  },
  month_selector_label:{
    color: colors.blackColor,
  },
  year_selector_label:{
    color: colors.blackColor,
  },
});
