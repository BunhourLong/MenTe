import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import _styles from '@styles'
import modules, { IMAGES } from 'modules'
import { FontGSansBold, fontGSans, fontGeorgiaBold } from '@customs/customFont'
import ButtonPrimary from 'components/ButtonPrimary'
import { strings } from 'services/i18n.services'

interface Props {
    onGetStarted: () => void
}

const WelcomeScreen = (props: Props): React.JSX.Element => {
    return (
        <SafeAreaView style={_styles.containerWhite}>
            <View style={styles.content}>
                <View style={styles.brand}>
                    <Text style={styles.title}>Men<Text style={styles.titleAccent}>Te</Text></Text>
                    <Image source={IMAGES.LOGO} style={styles.logo} contentFit="contain" />
                </View>
                <Text style={styles.subtitle}>{strings('welcomeMessage')}</Text>
            </View>

            <ButtonPrimary style={styles.button} onPress={props.onGetStarted}>
                <Text style={styles.buttonText}>{strings('getStarted')}</Text>
            </ButtonPrimary>
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    content: {
        ..._styles.flx_center,
        paddingHorizontal: modules.BODY_HORIZONTAL_24,
    },
    brand: {
        ..._styles.rows,
        gap: modules.GRID_SPACING,
    },
    title: {
        ...fontGeorgiaBold,
        fontStyle: 'italic',
        color: modules.TEXT,
        fontSize: modules.FONT_BIG + 8,
    },
    titleAccent: {
        color: modules.BRAND_TEAL,
    },
    logo: {
        width: 60,
        height: 60,
    },
    subtitle: {
        ...fontGSans,
        textAlign: 'center',
        color: modules.SUB_TEXT,
        fontSize: modules.FONT_H5,
        lineHeight: 24,
        marginTop: modules.BODY_HORIZONTAL_12,
    },
    button: {
        alignSelf: 'stretch',
        width: undefined,
        height: 52,
        borderRadius: modules.CARD_RADIUS,
        marginHorizontal: modules.BODY_HORIZONTAL_24,
        marginBottom: modules.BODY_HORIZONTAL_24,
    },
    buttonText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.WHITE,
    },
})
