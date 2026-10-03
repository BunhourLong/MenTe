import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import _styles from '@styles';
import modules from 'modules';
import PressableScale from 'components/PressableScale';

interface Props extends React.PropsWithChildren {
    onPress: () => void;
    disabled?: boolean;
    secondary?: boolean;
    style?: StyleProp<ViewStyle>
    noShadow?: boolean;
}


const ButtonPrimary = React.memo((props: Props) => {
    const isDisabled = props.disabled || !props.onPress
    return (
        <PressableScale
            style={[
                styles.headerBox,
                props.style,
                !props.noShadow && _styles.shadowSmall,
                props.secondary && styles.secondary,
                isDisabled && styles.disabled,
            ]}
            onPress={props.onPress}
            disabled={isDisabled}
        >
            {props.children}
        </PressableScale>
    );
});

export default ButtonPrimary;

const styles = StyleSheet.create({
    headerBox: {
        padding: 1,
        minHeight: 42,
        borderRadius: 999,
        height: 48,
        width: 48,
        borderWidth: .5,
        borderColor: modules.WHITE,
        ..._styles.center,
        backgroundColor: modules.LINK,
    },

    secondary: {
        borderColor: modules.WHITE,
        backgroundColor: modules.BACKGROUND_WALL,
    },
    disabled: {
        opacity: 0.4,
    }
});
