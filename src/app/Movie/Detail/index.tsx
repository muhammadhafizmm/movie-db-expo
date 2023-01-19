import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { RootStackParamList } from "../../../../App"
import { getTVItem } from "../../../api"
import { imagePath } from "../../../api/http-common"
import { PopulerTV, Season } from "../types"

import { Ionicons } from '@expo/vector-icons';
import { Font, Spacing, TextSize } from "../../../ui/token"
import Shimmer from "../../../ui/common/Shimmer";
import SeasonItem from "./SeasonItem"

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        width: "100%",
        height: 300,
    },
    bannerImage: {
        flex: 1,
        position: 'relative',
        zIndex: 3,
    },
    backButton: {
        position: 'absolute',
        zIndex: 4,
        top: 20,
        left: 15,
    },
    shimmer: {
        position: 'absolute',
    },
    content: {
        flex: 1,
        margin: Spacing.small
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: Spacing.small
    },
    title: {
        fontFamily: Font.Black,
        fontSize: TextSize.h4,
        marginBottom: Spacing.xsmall
    },
    bodyTitle: {
        fontFamily: Font.Black,
        fontSize: TextSize.h5,
        marginBottom: Spacing.tiny
    },
})

interface Props extends NativeStackScreenProps<RootStackParamList, "movie-detail"> {}
const DetailMovie: React.FC<Props> = ({ route, navigation }) => {
    const [itemTVData, setItemTVData] = useState<PopulerTV>({} as PopulerTV)
    const [bannerLoading, setBannerLoading] = useState<Boolean>(true)
    const [bannerError, setBennerError] = useState<Boolean>(false)

    useEffect(() => {
        if (route.params?.movieId) {
            getTVItem(route.params?.movieId).then((itemTVFetch) => {
                setItemTVData(itemTVFetch.data)
            })
        }
    }, [route.params?.movieId])

    return (
        <View style={style.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={style.banner}>
                    <Image
                        style={style.bannerImage}
                        source={{
                            uri: itemTVData.backdrop_path &&
                                imagePath(
                                    itemTVData.backdrop_path, 'original'
                                ),
                        }}
                        onLoadEnd={() => {setBannerLoading(false)}}
                        onPartialLoad={() => setBannerLoading(false)} // ios only
                    />
                    {bannerLoading && 
                    <View style={style.shimmer}>
                        <Shimmer width={Dimensions.get('screen').width} height={300}/>
                    </View>
                    }
                    <TouchableOpacity style={style.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={style.content}>
                    <View style={style.header}>
                        <Text style={style.title}>{itemTVData?.name}</Text>
                        <Text>{itemTVData?.overview}</Text>
                    </View>
                    <View>
                        <Text style={style.bodyTitle}>Seasons</Text>
                        <>
                            {
                                itemTVData.seasons && 
                                itemTVData.seasons.map((season, idx) => {
                                    return <SeasonItem season={season} key={idx}></SeasonItem>
                                })
                            }
                        </>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailMovie