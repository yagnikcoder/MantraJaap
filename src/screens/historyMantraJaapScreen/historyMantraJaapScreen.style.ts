import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.backgroundColor
  },
  headerTextStyle: {
    color: colors.blackColor,
    opacity: 0.9,
    fontSize: scale(15),
    fontWeight: 'bold',
  },
  mantraJaapText: {
    color: colors.blackColor,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  selectedRangeText: {
    fontSize: scale(14),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    color: colors.blackColor || 'gray',
    textAlign: 'center',
  },
  listContentContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20),
  },
  dateSection: {
    marginVertical: verticalScale(8),
    backgroundColor: colors.primaryColor,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    borderRadius: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  dailyTotal: {
    fontSize: scale(16),
    fontWeight: '600',
    color: colors.blackColor,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: 12,
  },
  dateText: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(4),
    color: colors.blackColor,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    backgroundColor: colors.whiteColor,
    marginVertical: verticalScale(5),
    borderRadius: 10,
  },
  hourText: {
    fontSize: scale(16),
    color: colors.blackColor,
  },
  countText: {
    fontSize: scale(16),
    color: colors.blackColor,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: colors.blackColor || 'gray',
  },
});

export default styles;
