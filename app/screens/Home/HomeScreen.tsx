import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import _styles from '@styles'
import modules, { IMAGES } from 'modules'
import { FontGSansBold, fontGSans, fontGeorgiaBold } from '@customs/customFont'
import { Store } from 'dummy'
import { strings } from 'services/i18n.services'
import AppBackground from 'components/AppBackground'
import { APP_TAB_HEIGHT } from 'routes/TabBar'
import StoreCard from './components/StoreCard'

interface Props {
  stores: (Store & { distance?: number })[]
  onPressStore: (store: Store) => void
}

const PADDING = modules.BODY_HORIZONTAL_18
const GAP = modules.BODY_HORIZONTAL_12

function HomeScreen(props: Props): React.JSX.Element {
  return (
    <SafeAreaView edges={['top']} style={_styles.containerWhite}>
      <AppBackground />
      <FlatList
        data={props.stores}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.brand}>
              <Image source={IMAGES.LOGO} style={styles.logo} contentFit="contain" />
              <Text style={styles.brandName} numberOfLines={1}>Men<Text style={styles.brandAccent}>Te</Text></Text>
            </View>

            <Text style={styles.motto}>
              {strings('mottoLead')} <Text style={styles.mottoAccent}>{strings('mottoAccent')}</Text>
            </Text>
            <Text style={styles.mottoSub}>{strings('mottoSub')}</Text>

            <Text style={styles.sectionTitle}>{strings('trustedStores')}</Text>
          </>
        }
        renderItem={({ item }) => <StoreCard store={item} distance={item.distance} onPress={() => props.onPressStore(item)} />}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  content: {
    gap: GAP,
    paddingBottom: APP_TAB_HEIGHT + GAP,
  },
  brand: {
    ..._styles.rows,
    gap: modules.BODY_HORIZONTAL_12 / 2,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    marginTop: modules.BODY_HORIZONTAL / 3,
  },
  logo: {
    width: 60,
    height: 60,
  },
  brandName: {
    ...fontGeorgiaBold,
    flexShrink: 1,
    fontStyle: 'italic',
    color: modules.TEXT,
    fontSize: modules.FONT_H3,
  },
  brandAccent: {
    color: modules.BRAND_TEAL,
  },
  motto: {
    ...fontGSans,
    fontSize: modules.FONT_BIG,
    lineHeight: 40,
    color: modules.BRAND_DEEP,
    marginHorizontal: PADDING,
    marginTop: modules.BODY_HORIZONTAL_12,
  },
  mottoAccent: {
    ...FontGSansBold,
    color: modules.PRIMARY,
  },
  mottoSub: {
    ...fontGSans,
    fontSize: modules.FONT_H7,
    lineHeight: 20,
    color: modules.SUB_TEXT,
    marginHorizontal: PADDING,
    marginTop: modules.GRID_SPACING,
  },
  sectionTitle: {
    ...FontGSansBold,
    fontSize: modules.FONT_H4,
    color: modules.TEXT,
    marginHorizontal: PADDING,
    marginTop: modules.BODY_HORIZONTAL_24,
  },
})
