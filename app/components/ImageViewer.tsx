import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ImageProps } from 'expo-image'
import { Portal } from 'react-native-portalize'
import ImageView from 'react-native-image-viewing'
import ImageCache from 'components/ImageCache'

// Ported from Khmer-eID FastImageWithViewing: tap the cached image to open it fullscreen (pinch to zoom, swipe down to close).
//
//  <ImageViewer style={styles.img} source="https://..." />

interface Props extends ImageProps {
    source: string | number | { uri: string }
}

function ImageViewer(props: Props): React.JSX.Element {
    const [visible, setVisible] = useState(false)
    const image = typeof props.source === 'string' ? { uri: props.source } : props.source

    return (
        <>
            <TouchableOpacity style={props.style} activeOpacity={0.85} onPress={() => setVisible(true)}>
                <ImageCache {...props} style={{ flex: 1 }} />
            </TouchableOpacity>
            <Portal>
                <ImageView
                    imageIndex={0}
                    visible={visible}
                    presentationStyle="overFullScreen"
                    images={[image]}
                    onRequestClose={() => setVisible(false)}
                />
            </Portal>
        </>
    )
}

export default ImageViewer
