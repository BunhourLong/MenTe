import React from 'react'
import { NavigationV5Props } from 'interfaces/route.interface'
import { SlideModalRef } from 'components/SlideModal'
import { useHookLanguage } from 'services/i18n.services'
import ProfileScreen from './ProfileScreen'

interface Props extends NavigationV5Props { }

const ProfileContainer = (_props: Props): React.JSX.Element => {
    // Reading the context re-renders the screen when the language changes.
    useHookLanguage()
    const modalRef = React.useRef<SlideModalRef>(null)

    return (
        <ProfileScreen
            modalRef={modalRef}
            onPressLanguage={() => modalRef.current?.open()}
            onCloseLanguage={() => modalRef.current?.close()}
        />
    )
}

export default ProfileContainer
