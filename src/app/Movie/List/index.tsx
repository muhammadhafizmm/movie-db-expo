import { useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Font, TextSize } from "../../../ui/token"

const createStyle = () => {
    return StyleSheet.create({
        listContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        exampleText: {
            fontFamily: Font.Black,
            color: '#ff7f50',
            fontSize: TextSize.h2,
            textAlign: 'center'
        }
    })
}

const List: React.FC<{}> = () => {
    const style = useMemo(() => createStyle(), [])
    return (
        <View style={style.listContainer}>
            <Text style={style.exampleText}>Cool, you create your first apps!</Text>
        </View>
    )
}

export default List