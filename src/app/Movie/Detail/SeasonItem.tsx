import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { imagePath } from "../../../api/http-common"

import { Font, Spacing, TextSize } from "../../../ui/token"
import Devider from "../../../ui/common/Devider"
import Shimmer from "../../../ui/common/Shimmer";
import { Season } from "../types";
import { useState } from "react";

const style = StyleSheet.create({
    season: {
        display: "flex",
        flexDirection: "row"
    },
    seasonPoster: {
        width: 120,
        height: 160,
        position: 'relative'
    },
    seasonPosterImage: {
        flex: 1,
        position: 'relative',
        zIndex: 10,
    },
    shimmer: {
        position: 'absolute'
    },
    seasonBody: {
        flex: 1,
        marginHorizontal: Spacing.small
    },
    seasonTitle: {
        fontFamily: Font.Black,
        fontSize: TextSize.title,
        marginBottom: Spacing.tiny
    },
    seasonInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.extratiny
    },
    seasonYear: {
        fontFamily: Font.Bold
    },
    verticalDevider: {
        width: 1.5,
        height: Spacing.small,
        backgroundColor: "black",
        marginHorizontal: Spacing.extratiny
    },
    seasonNumberOfEpisode: {
        fontFamily: Font.Bold
    },

})

type Props = {
    season: Season
}

const SeasonItem: React.FC<Props> = ({
    season,
}) => {
    if (!season.air_date) return null

    const [posterLoading, setPosterLoading] = useState<Boolean>(true)
    const seasonYear = season.air_date.split("-")[0]

    return (
        <View>
            <View style={style.season}>
                <View style={style.seasonPoster}>
                    <Image
                        style={style.seasonPosterImage}
                        source={{
                            uri: season.poster_path && 
                            imagePath(
                                season.poster_path, 'w200'
                            ),
                        }}
                        onLoadEnd={() => {
                            setPosterLoading(false)
                        }}
                    />
                    {posterLoading && 
                        <View style={style.shimmer}>
                            <Shimmer width={120} height={160}/>
                        </View>
                    }
                </View>
                <View style={style.seasonBody}>
                    <Text style={style.seasonTitle}>{season.name}</Text>
                    <View style={style.seasonInfo}>
                        <Text style={style.seasonYear}>{seasonYear}</Text>
                        <View style={style.verticalDevider}></View>
                        <Text style={style.seasonNumberOfEpisode}>
                            {season.episode_count} Episodes
                        </Text>
                    </View>
                    <Text>
                        {season.overview}
                    </Text>
                </View>
            </View>
            <Devider spacing={1} color={'#e7e7e7'}></Devider>
        </View>
    )
}

export default SeasonItem