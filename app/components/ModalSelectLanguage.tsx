import React, { forwardRef } from 'react'
import { IMAGES } from 'modules'
import { langT, strings, useHookLanguage } from 'services/i18n.services'
import ModalSelect from './ModalSelect'
import { SlideModalRef } from './SlideModal'

const LANGUAGES = [
  { key: langT.kh, label: 'ខ្មែរ', image: IMAGES.KHMER_FLAG },
  { key: langT.en, label: 'English', image: IMAGES.ENGLISH_FLAG },
]

const ModalSelectLanguage = forwardRef<SlideModalRef, { onBackdropPress: () => void }>((props, ref) => {
  const { language, setLanguage } = useHookLanguage()
  return (
    <ModalSelect
      ref={ref}
      title={strings('chooseLanguage')}
      items={LANGUAGES}
      selected={language}
      onSelect={setLanguage}
      onBackdropPress={props.onBackdropPress}
    />
  )
})

export default ModalSelectLanguage
