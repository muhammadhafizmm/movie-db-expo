import { useMemo } from "react"
import { StyleSheet, View } from "react-native"
import { Spacing } from "../token"

const createStyle = (
    spacing: number,
    color: string
) => {
    return StyleSheet.create({
        devider: {
            padding: spacing,
            marginVertical: Spacing.tiny,
            backgroundColor: color
        },
    })
}

type Props = {
    spacing: number
    color: string
}

const Devider: React.FC<Props> = ({ spacing, color }) => {
    const style = useMemo(() => createStyle(spacing, color), [spacing, color])
    return (
        <View style={style.devider}></View>
    )
}

export default Devider