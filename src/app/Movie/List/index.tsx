import { useCallback, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, Image, ListRenderItem, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getPopuler } from "../../../api"
import { Font, Spacing, TextSize } from "../../../ui/token"

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Devider from "../../../ui/common/Devider";
import { imagePath } from "../../../api/http-common";

import moment from 'moment';
import ListLoading, { ListLoadingItem } from "./ListLoading";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { PopulerTV } from "../types";


const createStyle = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
        header: {
            width: "100%",
            marginBottom: Spacing.small,
            display: "flex",
            alignItems: "center"
        },
        titleContainer: {
            paddingVertical: Spacing.large / 2,
            display: "flex",
            alignItems: "center"
        },
        title: {
            fontFamily: Font.Bold,
            fontSize: TextSize.h6
        },
        searchBar: {
            width: "90%",
            display: "flex",
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: Spacing.extratiny,
            padding: Spacing.tiny,
            backgroundColor: '#e7e7e7',
        },
        placeholder: {
            color: 'grey',
            marginLeft: Spacing.extratiny
        },
        listContainer: {
            flex: 1,
            width: "90%",
            marginTop: Spacing.small
        },
        populerTVContainer: {
            flex: 1,
            display: "flex",
            flexDirection: 'row',
        },
        populerTVImageContainer: {
            width: 100,
            height: 60,
            marginRight: Spacing.tiny,
        },
        populerTVImage: {
            width: "100%",
            height: "100%",
        },
        populerTVInfo: {
            display: "flex",
            flex: 1,
        },
        populerTVTitle: {
            flex: 0.7,
            fontFamily: Font.Bold,
            fontSize: TextSize.title,
        },
        populerTVRating: {
            fontFamily: Font.Bold,
            marginRight: Spacing.extratiny
        },
        populerTVRatingContainer: {
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFEC4D',
            padding: Spacing.extratiny,
            borderRadius: Spacing.extratiny,
            justifyContent: 'space-between',
            ...Platform.select({
                web: {
                    minWidth: 48,
                },
                native: {
                    minWidth: 45
                }
            })
        },
        populerTVHeader: {
            display: "flex",
            flexDirection: 'row',
            justifyContent: "space-between",
            marginBottom: Spacing.extratiny
        },
        footerMargin: {
            ...Platform.select({
                web: {
                    marginBottom: Spacing.xlarge
                },
                native: {
                    marginBottom: Spacing.xlarge * 0.5
                }
            })
        }
    })
}

interface Props extends NativeStackScreenProps<RootStackParamList, "movie-db-list"> {}

const ListMovie: React.FC<Props> = ({ navigation }) => {
    const [populerTVData, setPopulerTVData] = useState<PopulerTV[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [pages, setPages] = useState<number>(1)
    const [lastPage, setLastPage] = useState<number>(0)
    const style = useMemo(() => createStyle(), [])

    useEffect(() => {
        getPopuler(pages).then((populerTVFetch) => {
            setPopulerTVData((prevData) => [...prevData, ...populerTVFetch.data.results])
            setLastPage(populerTVFetch.data.total_pages)
            setIsLoading(false)
        })
    }, [pages])

    // implement handleOnReachEnd
    const handleOnReachEnd = useCallback(() => {
        if (!isLoading && pages <= lastPage) {
            setIsLoading(true)
            setPages((prevPages) => prevPages + 1)
        }
    }, [isLoading, pages])


    const renderPopulerTVItems: ListRenderItem<PopulerTV> = ({ item }) => {
        const relaseDate = new Date(item.first_air_date)
        const formattedDate = moment(relaseDate).format('MMMM DD, YYYY')

        const formatedVote = `${item.vote_average}`.length < 2 ? `${item.vote_average}.0` : item.vote_average
        // not rendering populer tv items if item not have image
        if (!item.backdrop_path || formattedDate === 'Invalid date') {
            return null
        }
        return (
            <TouchableOpacity 
                style={style.populerTVContainer}
                onPress={() => {
                    navigation.navigate("movie-detail", {
                        movieId: item.id
                    })
                }}
            >
                <View style={style.populerTVImageContainer}>
                    <Image
                        style={style.populerTVImage}
                        source={{
                            uri: imagePath(item.backdrop_path),
                        }}
                    />
                </View>
                <View style={style.populerTVInfo}>
                    <View style={style.populerTVHeader}>
                        <Text style={style.populerTVTitle}>{item.name}</Text>
                        <View>
                            <View style={style.populerTVRatingContainer}>
                                <Text style={style.populerTVRating}>{formatedVote}</Text>
                                <MaterialIcons name="star-rate" size={16} color="black" />
                            </View>
                        </View>
                    </View>
                    <Text>{formattedDate}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View style={style.titleContainer}>
                    <Text style={style.title}>TV Shows</Text>
                </View>
                <View style={style.searchBar}>
                    <Ionicons name="search" size={20} color="gray" />
                    <Text style={style.placeholder}>Search TV Show</Text>
                </View>
            </View>
            <View style={style.listContainer}>
                {/* If Loading and populer tv data empty return shimmer list */}
                { isLoading && populerTVData.length === 0 &&
                    <View>
                        <ListLoading/>
                    </View>
                }
                <FlatList
                    data={populerTVData}
                    renderItem={renderPopulerTVItems}
                    ItemSeparatorComponent={(item) => {
                        // not rendering devider if item not have image
                        if (
                            !item.leadingItem.backdrop_path || 
                            !item.leadingItem.first_air_date
                        ) {
                            return null
                        }
                        return <Devider spacing={1} color={'#e7e7e7'}></Devider>
                    }}
                    ListFooterComponent={
                        // implement shimmer for end of list if next page exist
                        pages <= lastPage ? 
                        <>
                            <Devider spacing={1} color={'#e7e7e7'}></Devider>
                            <ListLoadingItem/>
                            <ActivityIndicator/>
                            <View style={style.footerMargin}></View>
                        </> :
                        <View style={style.footerMargin}></View>}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.01}
                    onEndReached={handleOnReachEnd}
                />
            </View>
        </View>
    )
}

export default ListMovie