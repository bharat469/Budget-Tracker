import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import SvgIcon from '../svgComponent';
import { COLORS } from '../../utils/colorConstant';
import { moderateScale, verticalScale, scale } from '../../helpers/dimentions';

interface PickerBottomsheetProps {
  _handleOnCancelModal: () => void;
  _handleOpenCamera: () => void;
  _handleOpenGallery: () => void;
}

const PickerBodySheet: React.FC<PickerBottomsheetProps> = ({
  _handleOnCancelModal,
  _handleOpenCamera,
  _handleOpenGallery,
}) => {
  return (
    <View style={styles.pickerBodySheetView}>
      <TouchableWithoutFeedback onPress={_handleOnCancelModal}>
        <Text style={styles.closeText}>X</Text>
      </TouchableWithoutFeedback>
      <View style={styles.innerContainer}>
        <TouchableNativeFeedback onPress={_handleOpenGallery}>
          <View style={styles.iconContainer}>
            <SvgIcon
              name="galleryIcon"
              width={verticalScale(80)}
              height={scale(80)}
            />
            <Text style={styles.iconText}>gallery</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={_handleOpenCamera}>
          <View style={styles.iconContainer}>
            <SvgIcon
              name="cameraIcon"
              width={verticalScale(80)}
              height={scale(80)}
            />
            <Text style={styles.iconText}>Camera</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default PickerBodySheet;

const styles = StyleSheet.create({
  pickerBodySheetView: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: moderateScale(22),
    borderTopRightRadius: moderateScale(22),
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(22),
  },
  closeText: {
    alignSelf: 'flex-end',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.primaryColor,
    marginRight: scale(22),
    marginTop: verticalScale(12),
  },
  iconContainer: {
    alignItems: 'center',
    padding: moderateScale(12),
  },
  iconText: {
    fontSize: moderateScale(16),
    color: COLORS.black,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
