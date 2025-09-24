import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
export const datePickerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 8,
  },
  today: {
    borderColor: colors.primaryColor,
    borderWidth: 2,
    borderRadius:10
  },
  selected: {
    backgroundColor: colors.primaryColor,
    borderWidth: 2,
    borderRadius:10
  },
  selected_label: {
    color: '#fff',
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
});
