import React, { forwardRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules, { IMAGES } from 'modules'
import { FontGSansBold, FontGSansSemiBold } from '@customs/customFont'
import { langT, strings, useHookLanguage } from 'services/i18n.services'
import SlideModal, { SlideModalRef } from './SlideModal'

interface Props {
  onBackdropPress: () => void
}

const LANGUAGES = [
  { code: langT.kh, name: 'ខ្មែរ', image: IMAGES.KHMER_FLAG },
  { code: langT.en, name: 'English', image: IMAGES.ENGLISH_FLAG },
]

const ModalSelectLanguage = forwardRef<SlideModalRef, Props>((props, ref) => {
  const { language, setLanguage } = useHookLanguage()
  const safeBottom = useSafeAreaInsets().bottom

  return (
    <SlideModal
      ref={ref}
      containerStyle={styles.container}
      style={[styles.modal, { marginBottom: safeBottom + modules.BODY_HORIZONTAL_12 }]}
      onBackdropPress={props.onBackdropPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{strings('chooseLanguage')}</Text>
        <TouchableOpacity onPress={props.onBackdropPress} style={styles.closeButton} accessibilityLabel="Close">
          <Ionicons name="close" size={22} color={modules.TEXT} />
        </TouchableOpacity>
      </View>
      {LANGUAGES.map(item => {
        const isActive = item.code === language
        return (
          <TouchableOpacity
            key={item.code}
            style={[styles.item, isActive && styles.itemActive]}
            accessibilityState={{ selected: isActive }}
            onPress={() => {
              setLanguage(item.code)
              props.onBackdropPress()
            }}
          >
            <Image style={styles.flag} source={item.image} contentFit="cover" />
            <Text style={styles.name}>{item.name}</Text>
            {isActive && <Ionicons name="checkmark" size={22} color={modules.BRAND_TEAL} />}
          </TouchableOpacity>
        )
      })}
    </SlideModal>
  )
})

export default ModalSelectLanguage

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  modal: {
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    paddingBottom: modules.BODY_HORIZONTAL_12,
    overflow: 'hidden',
  },
  header: {
    ..._styles.rows,
    padding: modules.BODY_HORIZONTAL,
  },
  title: {
    ...FontGSansBold,
    flex: 1,
    fontSize: modules.FONT_H4,
    color: modules.TEXT,
  },
  closeButton: {
    width: 35,
    height: 35,
    borderRadius: modules.RADIUS_BUTTON,
    backgroundColor: modules.BACKGROUND_PRIMARY,
    ..._styles.center,
  },
  item: {
    ..._styles.rows,
    gap: modules.BODY_HORIZONTAL,
    paddingVertical: modules.BODY_HORIZONTAL_12 / 2,
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  itemActive: {
    backgroundColor: modules.BACKGROUND_NEW_COLOR,
  },
  flag: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: modules.BACKGROUND_NEW_COLOR,
  },
  name: {
    ...FontGSansSemiBold,
    flex: 1,
    fontSize: modules.FONT_H6 + 1,
    color: modules.TEXT,
  },
})
