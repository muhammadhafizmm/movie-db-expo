import { useMemo } from "react"
import { Platform, SafeAreaView, StyleSheet, View } from "react-native"
import { DefaultWidthSize } from "../../ui/token"


const createStyle = () => {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            alignItems: 'center',
        },
        main: {
            flex: 1,
            width: "100%",
            ...Platform.select({
                web: {
                    maxWidth: DefaultWidthSize.mobile
                },
            })
        }
    })
}

type Props = {
    children?: React.ReactNode
}

const RootContainer: React.FC<Props> = ({
    children
}) => {
    const style = useMemo(() => createStyle(), [])
    return (
        <SafeAreaView style={style.safeArea}>
            <View style={style.main}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default RootContainer