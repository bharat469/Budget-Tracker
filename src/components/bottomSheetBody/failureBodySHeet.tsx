import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import SvgIcon from '../svgComponent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import CustomButton from '../customButton';
import { COLORS } from '../../utils/colorConstant';

interface failureBottomBodyProps {
  _handleOnCancelModal?: () => void;
}

const FailureBodySHeet: React.FC<failureBottomBodyProps> = ({
  _handleOnCancelModal,
}) => {
  return (
    <View style={styles.bottomSheetView}>
      <TouchableWithoutFeedback onPress={_handleOnCancelModal}>
        <Text style={styles.closeText}>X</Text>
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        <SvgIcon
          name="errorIcon"
          width={scale(200)}
          height={verticalScale(200)}
        />
        <View style={styles.contentView}>
          <Text style={styles.messageText}>
            {STRING_CONFIG.modalText.errorNetworkModal.headerOne}
          </Text>
          <Text style={styles.messageSubText}>
            {STRING_CONFIG.modalText.errorNetworkModal.passwordFailure}
          </Text>
        </View>
      </View>
      <CustomButton
        btnTitleName={STRING_CONFIG.modalText.errorNetworkModal.btnText}
        customStyle={{ marginVertical: verticalScale(22) }}
        onPress={_handleOnCancelModal}
      />
    </View>
  );
};

export default FailureBodySHeet;

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
  },
  messageSubText: {
    fontSize: moderateScale(20),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '700',
    textAlign: 'center',
  },
  contentView: {
    marginVertical: verticalScale(16),
  },
});
