import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  mantraJaapContainer: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    justifyContent:'center',
    alignItems:'center',
  },
  headerTextStyle:{
    color: colors.whiteColor,
    opacity: 0.9,
    fontSize: scale(15),
    fontWeight: 'bold',
  },
  mantraJaapText: {
    color: colors.whiteColor,
    fontSize: scale(140),
    fontWeight: 'bold',
  },
  exactCountText: {
    marginTop: verticalScale(8),
    color: colors.whiteColor,
    opacity: 0.9,
    fontSize: scale(24),
    fontWeight: '500',
  }
});

export default styles;