import { Platform, StyleSheet, View } from "react-native";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Devider from "../../../ui/common/Devider";
import Shimmer from "../../../ui/common/Shimmer";
import { Spacing, TextSize } from "../../../ui/token";

const style = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: "row"
    },
    image: {
        width: 100,
        height: 60,
        marginRight: Spacing.tiny,
    },
    body: {
        flex: 1,
        display: "flex",
        paddingLeft: Spacing.tiny,
    },
    infoHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Spacing.tiny
    },
    title: {
        flex: 0.8,
        height: TextSize.h6,
    },
    rating: {
        height: TextSize.h5,
        borderRadius: Spacing.extratiny,
        width: 45
    },
    date: {
        width: Spacing.large * 2,
        height: TextSize.body
    }


})

export const ListLoadingItem: React.FC<{}> = () => {
    return (
        <View>
            <View style={style.container}>
                <Shimmer width={100} height={60} />
                <View style={style.body}>
                    <View style={style.infoHeader}>
                        <Shimmer width={Platform.OS === 'web' ? 250 : 200} height={TextSize.h5} />
                        <Shimmer width={45} height={Spacing.base} />
                    </View>
                    <Shimmer width={Platform.OS === 'web' ? 250 : 150} height={TextSize.caption} />
                </View>
            </View>
            <Devider spacing={1} color={'#e7e7e7'} />
        </View>
    )
}


const ListLoading: React.FC<{}> = () => {
    const renderItem = []
    for (const key of Array(7).keys()) {
        renderItem.push(<ListLoadingItem key={key}/>)
    }
    return (
        <View style={style.listContainer}>
            {renderItem}
        </View>
    )
}

export default ListLoading