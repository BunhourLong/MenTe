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
import { SlideModalRef } from 'components/SlideModal'
import { strings } from 'services/i18n.services'

interface Props {
    modalRef: React.RefObject<SlideModalRef | null>

    onPressLanguage: () => void
    onCloseLanguage: () => void
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

            <ModalSelectLanguage ref={props.modalRef} onBackdropPress={props.onCloseLanguage} />
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
    buttonText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H6,
        color: modules.WHITE,
    },
})
