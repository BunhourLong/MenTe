import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, ImageProps } from 'expo-image'

// Ported from Khmer-eID FastImageFireCache, minus the Firebase thumb/download layer (no Firebase here).
//
//  <ImageCache style={styles.img} source={{ uri: 'https://...' }} />

const blurhash = 'eDD-nVxt05E7?D^$M~IX-mM~059d~R~RNI0Us.-mIqxYD-?D-m0PIq'

const ImageCache = React.memo(({ style, ...props }: ImageProps) => {
    return (
        <View style={[style, styles.overflow]}>
            <Image placeholder={blurhash} transition={0} cachePolicy="memory-disk" {...props} style={styles.img} />
        </View>
    )
})

export default ImageCache

const styles = StyleSheet.create({
    overflow: { overflow: 'hidden' },
    img: { width: '100%', height: '100%' },
})
