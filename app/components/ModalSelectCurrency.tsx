import React, { forwardRef } from 'react'
import { strings } from 'services/i18n.services'
import { CURRENCIES, useCurrency } from 'services/currency.service'
import ModalSelect from './ModalSelect'
import { SlideModalRef } from './SlideModal'

export const CURRENCY_SYMBOL = { USD: '$', KHR: '៛' }

const ModalSelectCurrency = forwardRef<SlideModalRef, { onBackdropPress: () => void }>((props, ref) => {
  const { currency, setCurrency } = useCurrency()
  return (
    <ModalSelect
      ref={ref}
      title={strings('chooseCurrency')}
      items={CURRENCIES.map(key => ({ key, label: strings(`currency${key}`), symbol: CURRENCY_SYMBOL[key] }))}
      selected={currency}
      onSelect={setCurrency}
      onBackdropPress={props.onBackdropPress}
    />
  )
})

export default ModalSelectCurrency
