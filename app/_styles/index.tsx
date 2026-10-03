import { StyleSheet } from 'react-native'
import modules from 'modules'
import { FontGSansBold, HanumanBold } from '@customs/customFont'

const _styles = StyleSheet.create({
  containerNewBg: {
    flex: 1,
    backgroundColor: modules.BACKGROUND_NEW_COLOR,
  },
  btnTextPrimary: {
    ...HanumanBold,
    fontSize: modules.FONT_H6,
    color: modules.BTN_LABEL_26,
  },
  filter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(200,200,200,.2)',
  },
  circleShadow: {
    boxShadow: '0 2px 5px rgba(207, 204, 220, 0.3)',
    elevation: 2,
  },
  full: {
    width: '100%',
    height: '100%',
  },
  half_top: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '60%',
    position: 'absolute',
  },
  full_absolute: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: modules.WHITE,
  },
  border: {
    borderBottomColor: modules.BORDER_COLOR,
    borderBottomWidth: 0.5,
  },
  borderTop: {
    borderTopColor: modules.BORDER_COLOR,
    borderTopWidth: 1,
  },
  borderItem: {
    backgroundColor: modules.BORDER,
    height: 0.8,
  },
  borderTab: {
    borderBottomColor: modules.BORDER,
    borderBottomWidth: 1,
    width: '100%',
    height: 1,
    zIndex: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  containItems: {
    paddingTop: modules.BODY_HORIZONTAL,
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: modules.BORDER_COLOR,
  },
  contentModal: {
    backgroundColor: 'white',
    padding: modules.BODY_HORIZONTAL,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  imgFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flx2: {
    flex: 2,
  },
  column: {
    justifyContent: 'center',
  },
  org: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: modules.BODY_HORIZONTAL,
  },
  avatar: {
    width: 50,
    height: 50,
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderRadius: 50 / 2,
  },
  fake: {
    height: 80,
  },
  fakeWidth: {
    width: 80,
  },
  fake168: {
    height: 168,
  },
  iconTabContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: modules.SPACE,
  },
  TopTabActive: {
    color: modules.WHITE,
    fontSize: 15,
  },
  TopTab: {
    fontSize: 15,
    color: modules.WHITE_SUB,
  },
  labelTabActive: {
    color: modules.PRIMARY,
    fontSize: 11,
  },
  labelTab: {
    fontSize: 11,
    color: modules.PRIMARY_TAB,
  },
  body: {
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  bodyIcon: {
    paddingHorizontal: modules.BODY_HORIZONTAL - 10,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: modules.WHITE,
  },
  bgWhite: {
    backgroundColor: modules.WHITE,
  },
  topTab: {
    backgroundColor: modules.WHITE,
    flexDirection: 'column',
    flex: 1,
  },
  containModal: {
    backgroundColor: '#FFF',
    paddingVertical: modules.BODY_HORIZONTAL / 2,
  },
  containerPrimary: {
    flex: 1,
    backgroundColor: modules.BACKGROUND_WALL,
  },
  containerColorPrimary: {
    flex: 1,
    backgroundColor: modules.BACKGROUND_COLOR,
  },
  flx1: {
    flex: 1,
  },
  flx3: {
    flex: 3,
  },
  flx_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerMode: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: modules.BODY_HORIZONTAL,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  },
  shadowBlackSmall: {
    boxShadow: '0 8px 16px rgba(0,0,0,0.005)',
  },
  cardCppShadow: {
    boxShadow: '4px 10px 8px rgba(0,0,0,0.1)',
  },
  cardCppTapShadow: {
    boxShadow: '2px 4px 4px rgba(0,0,0,0.1)',
  },
  shadowTop: {
    boxShadow: '10px 0px 20px rgba(0,0,0,0.15)',
  },
  shadowBottom: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  },
  cardShadow: {
    boxShadow: '0 15px 40px rgba(207,204,220,0.65)',
  },
  shadowSmall: {
    boxShadow: '0 8px 16px rgba(207,204,220,0.5)',
  },
  shadowSection: {
    boxShadow: '0 3px 6px rgba(207,204,220,0.5)',
  },
  statisticContainer: {
    backgroundColor: modules.WHITE,
    marginBottom: modules.BODY_HORIZONTAL / 2,
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  dark_shadow: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  },
  bar_shadow: {
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
  },
  homeCardShadow: {
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  menuShadow: {
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  },
  appleShadowTop: {
    boxShadow: '0 -8px 40px rgba(0,0,0,0.08)',
  },

  super_dark_shadow: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
  },
  tabletModalContainer: {
    margin: 0,
    justifyContent: 'center',
  },
  tabletModal: {
    width: '100%',
    maxHeight: 500,
    alignSelf: 'center',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
  },
  tabletSection: {
    overflow: 'hidden',
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  tabletCard: {
    overflow: 'hidden',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginVertical: modules.BODY_HORIZONTAL_12,
  },
  tabletBgCard: {
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  shadow_facebook: {
    boxShadow: '0 1px 2.82px rgba(0,0,0,0.06)',
  },
  newShadow: {
    boxShadow: '1px 0px 6px rgba(0,0,0,0.15)',
  },
  shadow_facebook2: {
    boxShadow: '0 3px 0px rgba(0,0,0,0.09)',
  },
  absoluteTop: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  topShadow: {
    boxShadow: '0 -5px 7.68px rgba(0,0,0,0.3)',
  },
  shadowDark: {
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  },
  shadowDarkToLow: {
    boxShadow: '0 15px 30px rgba(0,0,0,0.35)',
  },
  card: {
    overflow: 'hidden',
    boxShadow: '0 1px 2.82px rgba(0,0,0,0.06)',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  floatButtonShadow: {
    boxShadow: '0 3px 10px rgba(0,0,0,0.175)',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    marginHorizontal: 2,
    backgroundColor: modules.LINK
  },
  section: {
    boxShadow: '0 15px 40px rgba(207,204,220,0.65)',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginTop: modules.BODY_HORIZONTAL_12,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  sectionBox: {
    overflow: 'hidden',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: modules.BODY_HORIZONTAL_12,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
  },
  sectionLabel: {
    flex: 1,
    ...HanumanBold,
    color: modules.ACTIVE_LABEL,
    fontSize: modules.FONT_H5,
  },
  sectionTitle: {
    ...HanumanBold,
    fontSize: modules.FONT_H4,
    color: modules.ACTIVE_LABEL,
  },
  sectionSubTitle: {
    ...HanumanBold,
    fontSize: modules.FONT_H6,
    color: modules.ORANGE_RED,
  },
  sectionIcon: {
    fontSize: modules.FONT_H4,
    color: modules.ORANGE_RED,
    marginRight: modules.BODY_HORIZONTAL_12 / 2,
    transform: [{ translateY: -2 }],
  },
  loadingMargin: {
    margin: modules.BODY_HORIZONTAL
  },
  star: {
    color: modules.ORANGE_RED,
    fontSize: modules.FONT_H4,
  },
  list: {
    flex: 1,
    width: '100%',
    height: '100%',
    minWidth: 100,
    minHeight: 100,
  },
  shadow_light: {
    boxShadow: '2px 2px 5px rgba(255,255,255,0.25)',
  },
  shadow_bar: {
    boxShadow: '2px 2px 5px rgba(1,1,1,.1)',
  },
  text_light_shadow: {
    textShadowRadius: .5,
    textShadowOffset: { width: .5, height: .5 },
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
  },
  modal_shadow: {
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
  },
  text_dark_shadow: {
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'rgba(0, 0, 0, 1)',
  },
  transparent: {
    backgroundColor: "transparent"
  },
  rightLeftBottomTopZero: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },
  medium_dark_shadow: {
    boxShadow: '8.8px 8.8px 16px rgba(0,0,0,0.08)',
  },
  language: {
    height: 30,
    borderRadius: 100,
    aspectRatio: 1 / 1,
  },
  padding15: {
    paddingHorizontal: modules.BODY_HORIZONTAL,
    paddingVertical: modules.BODY_HORIZONTAL
  },
  form_label: {
    flex: 1,
    ...FontGSansBold,
    color: modules.ACTIVE_LABEL,
    fontSize: modules.FONT_H5 + 1,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
  },
  bookShadow: {
    boxShadow: '3px 8px 24px rgba(0,0,0,0.24)',
  },
})

export default _styles
