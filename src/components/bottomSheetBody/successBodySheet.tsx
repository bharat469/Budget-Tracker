import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import SvgIcon from '../svgComponent';
import { STRING_CONFIG } from '../../utils/stringConfig';
import CustomButton from '../customButton';
import { COLORS } from '../../utils/colorConstant';

interface successBottomBodyProps {
  _handleLoginButton?: () => void;
}

const SuccessBodySheet: React.FC<successBottomBodyProps> = ({
  _handleLoginButton,
}) => {
  return (
    <View style={styles.bottomSheetView}>
      <View style={styles.content}>
        <SvgIcon
          name="successIcon"
          width={scale(200)}
          height={verticalScale(200)}
        />
        <View style={styles.contentView}>
          <Text style={styles.messageText}>
            {STRING_CONFIG.modalText.errorNetworkModal.successHeader}
          </Text>
          <Text style={styles.messageSubText}>
            {STRING_CONFIG.modalText.errorNetworkModal.successFooter}
          </Text>
        </View>
      </View>
      <CustomButton
        btnTitleName={STRING_CONFIG.genricString.login}
        customStyle={{ marginVertical: verticalScale(22) }}
        onPress={_handleLoginButton}
      />
    </View>
  );
};

export default SuccessBodySheet;

const styles = StyleSheet.create({
  bottomSheetView: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(20),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeText: {
    alignSelf: 'flex-end',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.primaryColor,
  },
  content: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  messageSubText: {
    fontSize: moderateScale(20),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  contentView: {
    marginVertical: verticalScale(16),
  },
});
