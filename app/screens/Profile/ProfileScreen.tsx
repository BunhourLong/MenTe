import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold } from '@customs/customFont'
import ButtonPrimary from 'components/ButtonPrimary'
import AppBackground from 'components/AppBackground'
import ModalSelectLanguage from 'components/ModalSelectLanguage'
import ModalSelectCurrency, { CURRENCY_SYMBOL } from 'components/ModalSelectCurrency'
import { Currency } from 'services/format.service'
import { SlideModalRef } from 'components/SlideModal'
import { strings } from 'services/i18n.services'

interface Props {
    modalRef: React.RefObject<SlideModalRef | null>

    onPressLanguage: () => void
    onCloseLanguage: () => void

    currency: Currency
    currencyModalRef: React.RefObject<SlideModalRef | null>
    onPressCurrency: () => void
    onCloseCurrency: () => void
}

function ProfileScreen(props: Props): React.JSX.Element {
    return (
        <SafeAreaView edges={['top']} style={_styles.containerWhite}>
            <AppBackground />
            <Text style={styles.title}>{strings('profile')}</Text>

            <ButtonPrimary style={styles.button} onPress={props.onPressLanguage}>
                <Ionicons name="language" size={20} color={modules.WHITE} />
                <Text style={styles.buttonText}>{`${strings('language')}: ${strings('languageName')}`}</Text>
            </ButtonPrimary>

            <ButtonPrimary style={[styles.button, styles.buttonGap]} onPress={props.onPressCurrency}>
                <Ionicons name="cash-outline" size={20} color={modules.WHITE} />
                <Text style={styles.buttonText}>{`${strings('currency')}: ${strings(`currency${props.currency}`)} (${CURRENCY_SYMBOL[props.currency]})`}</Text>
            </ButtonPrimary>

            <ModalSelectLanguage ref={props.modalRef} onBackdropPress={props.onCloseLanguage} />
            <ModalSelectCurrency ref={props.currencyModalRef} onBackdropPress={props.onCloseCurrency} />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    title: {
        ...FontGSansBold,
        color: modules.TEXT,
        fontSize: modules.FONT_H1,
        marginHorizontal: modules.BODY_HORIZONTAL_18,
        marginVertical: modules.BODY_HORIZONTAL_12,
    },
    button: {
        ..._styles.rows,
        justifyContent: 'center',
        gap: modules.GRID_SPACING,
        width: undefined,
        height: 52,
        borderRadius: modules.CARD_RADIUS,
        marginHorizontal: modules.BODY_HORIZONTAL_18,
    },
    buttonGap: {
        marginTop: modules.BODY_HORIZONTAL_12,
    },
    buttonText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.WHITE,
    },
})
