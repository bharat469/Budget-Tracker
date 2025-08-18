import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '../../utils/colorConstant';
import SvgIcon, { IconNameType } from '../svgComponent';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../headerComponent';
import BottomSheetComponent from '../bottomSheetComponent';

interface authWrapperProps {
  isSvgShow: boolean;
  children: ReactNode;
  svgIconName?: IconNameType;
  headingText?: string;
  svgContainerStyle?: any;
  isShowHeading?: boolean;
  showHeader?: boolean;
}

const AuthWrappers: React.FC<authWrapperProps> = ({
  isSvgShow = false,
  children,
  svgIconName = 'loginSvgIcon',
  headingText = STRING_CONFIG.authScreenString.headingOne,
  svgContainerStyle,
  isShowHeading = true,
  showHeader = false,
}) => {
  return (
    <KeyboardAwareScrollView
      style={styles.wrapperView}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
    >
      {showHeader && (
        <HeaderComponent
          headerTiltle={STRING_CONFIG.forgetPasswordString.header}
        />
      )}
      <View style={[styles.svgIconView, svgContainerStyle]}>
        {isSvgShow && (
          <SvgIcon
            name={svgIconName}
            width={scale(260)}
            height={verticalScale(260)}
          />
        )}
        {isShowHeading && <Text style={styles.headingText}>{headingText}</Text>}
      </View>
      <View style={styles.childrenView}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default AuthWrappers;

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  svgIconView: {
    alignItems: 'center',
  },
  headingText: {
    fontSize: moderateScale(26),
    fontWeight: '600',
    color: COLORS.primaryColor,
    marginBottom: verticalScale(22),
    marginHorizontal: moderateScale(12),
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  childrenView: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
