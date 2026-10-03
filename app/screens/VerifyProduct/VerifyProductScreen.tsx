import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold, fontGSans } from '@customs/customFont'
import { Product } from 'dummy'
import BlurAndView from 'components/BlurAndView'
import PressableScale from 'components/PressableScale'
import ProductThumb from 'components/ProductThumb'
import AppBackground from 'components/AppBackground'
import { Verdict } from './verdict'

interface Props {
    product: Product
    answers: (boolean | undefined)[]
    verdict: Verdict

    onAnswer: (index: number, value: boolean) => void
    onReset: () => void
    onGoBack: () => void
}

const VERDICTS = {
    pending: { icon: 'shield-outline', color: modules.TEXT_NOTE, bg: modules.SEARCH_BG, title: 'Check each sign', sub: 'Answer every question to verify this product.' },
    authentic: { icon: 'shield-checkmark', color: modules.SUCCESS, bg: modules.SUCCESS_BG, title: 'Verified authentic', sub: 'Every sign matches the genuine product.' },
    fake: { icon: 'alert-circle', color: modules.CAUTION, bg: modules.CAUTION_BG, title: 'Not authentic', sub: 'At least one sign does not match. This product may be counterfeit.' },
} as const

const VerifyProductScreen = (props: Props): React.JSX.Element => {
    const { product, answers } = props
    const safeTop = useSafeAreaInsets().top
    const verdict = VERDICTS[props.verdict]

    return (
        <View style={_styles.containerWhite}>
            <AppBackground />
            <ScrollView contentContainerStyle={[styles.content, { paddingTop: safeTop + 42 + modules.BODY_HORIZONTAL_12 }]}>
                <View style={styles.productRow}>
                    <ProductThumb product={product} size={64} />
                    <View style={_styles.flx1}>
                        <Text style={styles.brand}>{product.brand}</Text>
                        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
                    </View>
                </View>

                <View style={[styles.verdict, { backgroundColor: verdict.bg }]}>
                    <Ionicons name={verdict.icon} size={36} color={verdict.color} />
                    <View style={_styles.flx1}>
                        <Text style={[styles.verdictTitle, { color: verdict.color }]}>{verdict.title}</Text>
                        <Text style={styles.verdictSub}>{verdict.sub}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Does your product match?</Text>
                {product.checks.map((check, index) => (
                    <View key={check} style={styles.check}>
                        <Text style={styles.checkText}>{check}</Text>
                        <View style={styles.answers}>
                            <AnswerButton label="Yes" icon="checkmark" color={modules.SUCCESS} selected={answers[index] === true} onPress={() => props.onAnswer(index, true)} />
                            <AnswerButton label="No" icon="close" color={modules.CAUTION} selected={answers[index] === false} onPress={() => props.onAnswer(index, false)} />
                        </View>
                    </View>
                ))}

                {answers.length > 0 && (
                    <PressableScale style={styles.reset} onPress={props.onReset}>
                        <Text style={styles.resetText}>Start over</Text>
                    </PressableScale>
                )}
            </ScrollView>

            <PressableScale style={[styles.backButton, { top: safeTop + modules.SPACE }]} onPress={props.onGoBack}>
                <BlurAndView tint="light" intensity={60} androidBackground={modules.BACKGROUND_WALL} style={StyleSheet.absoluteFill} />
                <Ionicons name="chevron-back" size={24} color={modules.TEXT} />
            </PressableScale>
        </View>
    )
}

function AnswerButton(props: { label: string; icon: 'checkmark' | 'close'; color: string; selected: boolean; onPress: () => void }): React.JSX.Element {
    return (
        <PressableScale
            haptic
            style={[styles.answer, props.selected && { backgroundColor: props.color, borderColor: props.color }]}
            onPress={props.onPress}
            accessibilityRole="button"
            accessibilityState={{ selected: props.selected }}
        >
            <Ionicons name={props.icon} size={18} color={props.selected ? modules.WHITE : props.color} />
            <Text style={[styles.answerText, { color: props.selected ? modules.WHITE : props.color }]}>{props.label}</Text>
        </PressableScale>
    )
}

export default VerifyProductScreen

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: modules.BODY_HORIZONTAL_18,
        paddingBottom: modules.BODY_HORIZONTAL_ACTION,
    },
    productRow: {
        ..._styles.rows,
        gap: modules.BODY_HORIZONTAL_12,
    },
    brand: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_P,
        color: modules.SUB_TEXT,
    },
    name: {
        ...FontGSansBold,
        fontSize: modules.FONT_H5,
        color: modules.TEXT,
        marginTop: 2,
    },
    verdict: {
        ..._styles.rows,
        gap: modules.BODY_HORIZONTAL_12,
        padding: modules.BODY_HORIZONTAL,
        borderRadius: modules.HOME_CARD_RADIUS,
        marginTop: modules.BODY_HORIZONTAL_24,
    },
    verdictTitle: {
        ...FontGSansBold,
        fontSize: modules.FONT_H4,
    },
    verdictSub: {
        ...fontGSans,
        fontSize: modules.FONT_H7,
        lineHeight: 20,
        color: modules.DARK_TEXT,
        marginTop: 2,
    },
    sectionTitle: {
        ...FontGSansBold,
        fontSize: modules.FONT_H5,
        color: modules.TEXT,
        marginTop: modules.BODY_HORIZONTAL_24,
        marginBottom: modules.SPACE * 2,
    },
    check: {
        paddingVertical: modules.BODY_HORIZONTAL_12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: modules.BORDER_COLOR,
    },
    checkText: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_H6,
        lineHeight: 22,
        color: modules.TEXT,
    },
    answers: {
        flexDirection: 'row',
        gap: modules.GRID_SPACING,
        marginTop: modules.GRID_SPACING,
    },
    answer: {
        ..._styles.rows,
        gap: modules.SPACE,
        height: 38,
        paddingHorizontal: modules.BODY_HORIZONTAL,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: modules.BORDER_COLOR,
    },
    answerText: {
        ...FontGSansBold,
        fontSize: modules.FONT_H7,
    },
    reset: {
        alignSelf: 'center',
        marginTop: modules.BODY_HORIZONTAL_24,
        padding: modules.GRID_SPACING,
    },
    resetText: {
        ...FontGSansSemiBold,
        fontSize: modules.FONT_H6,
        color: modules.PRIMARY,
    },
    backButton: {
        position: 'absolute',
        left: modules.BODY_HORIZONTAL,
        width: 42,
        height: 42,
        borderRadius: 1000,
        overflow: 'hidden',
        ..._styles.center,
    },
})
