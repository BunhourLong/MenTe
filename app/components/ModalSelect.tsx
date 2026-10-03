import React, { forwardRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import _styles from '@styles'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold } from '@customs/customFont'
import SlideModal, { SlideModalRef } from './SlideModal'

// A bottom sheet of options with a checkmark on the selected one. Each option leads with an image (a flag) or a symbol.
export interface SelectItem<K extends string> {
  key: K
  label: string
  image?: number
  symbol?: string
}

interface Props<K extends string> {
  title: string
  items: SelectItem<K>[]
  selected: K
  onSelect: (key: K) => void
  onBackdropPress: () => void
}

function ModalSelect<K extends string>(props: Props<K>, ref: React.ForwardedRef<SlideModalRef>): React.JSX.Element {
  const safeBottom = useSafeAreaInsets().bottom

  return (
    <SlideModal
      ref={ref}
      containerStyle={styles.container}
      style={[styles.modal, { marginBottom: safeBottom + modules.BODY_HORIZONTAL_12 }]}
      onBackdropPress={props.onBackdropPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity onPress={props.onBackdropPress} style={styles.closeButton} accessibilityLabel="Close">
          <Ionicons name="close" size={22} color={modules.TEXT} />
        </TouchableOpacity>
      </View>
      {props.items.map(item => {
        const isActive = item.key === props.selected
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.item, isActive && styles.itemActive]}
            accessibilityState={{ selected: isActive }}
            onPress={() => {
              props.onSelect(item.key)
              props.onBackdropPress()
            }}
          >
            {item.image !== undefined
              ? <Image style={styles.flag} source={item.image} contentFit="cover" />
              : <View style={[styles.flag, _styles.center]}><Text style={styles.symbol}>{item.symbol}</Text></View>}
            <Text style={styles.name}>{item.label}</Text>
            {isActive && <Ionicons name="checkmark" size={22} color={modules.PRIMARY} />}
          </TouchableOpacity>
        )
      })}
    </SlideModal>
  )
}

export default forwardRef(ModalSelect) as <K extends string>(props: Props<K> & { ref?: React.Ref<SlideModalRef> }) => React.JSX.Element

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
  symbol: {
    ...FontGSansBold,
    fontSize: modules.FONT_H4,
    color: modules.PRIMARY,
  },
  name: {
    ...FontGSansSemiBold,
    flex: 1,
    fontSize: modules.FONT_H6 + 1,
    color: modules.TEXT,
  },
})
