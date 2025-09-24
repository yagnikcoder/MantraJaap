import { StyleSheet } from 'react-native';
import { colors } from '../themes/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    minHeight: 50, 
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1, 
  },
  headerTextStyle:{
    color: colors.whiteColor,
    opacity: 0.9,
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.grayTransparent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: colors.whiteColor,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.blackColor,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: 340, // same as the calendar
  },
  leftIconContainer: {
    backgroundColor: colors.whiteColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftIcon: {
    fontSize: 20,
    color: colors.blackColor,
  },
  rightIcon: {
    fontSize: 20,
    color: colors.blackColor,
  },
});

export default styles;
