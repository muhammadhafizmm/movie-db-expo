import { useEffect, useMemo, useState } from "react"
import { FlatList, Image, ListRenderItem, Platform, StyleSheet, Text, View } from "react-native"
import { getPopuler } from "../../../api"
import { Font, Spacing, TextSize } from "../../../ui/token"

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Devider from "../../../ui/common/Devider";
import { imagePath } from "../../../api/http-common";

import moment from 'moment';


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
            width: "90%",
            marginTop: Spacing.small
        },
        populerTVContainer: {
            width: "100%",
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
            fontFamily: Font.Bold,
            fontSize: TextSize.title
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
            borderRadius: Spacing.extratiny
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
                    marginBottom: Spacing.xlarge * 2.5
                }
            })
        }
    })
}

type PopulerTV = {
    name: string
    vote_average: string
    first_air_date: string
    backdrop_path: string
    poster_path: string
}

const List: React.FC<{}> = () => {
    const [populerTVData, setPopulerTVData] = useState<PopulerTV[]>([])
    const style = useMemo(() => createStyle(), [])
    useEffect(() => {
        getPopuler().then((populerTVFetch) => {
            setPopulerTVData(populerTVFetch.data.results)
        })
    }, [])

    const renderPopulerTVItems: ListRenderItem<PopulerTV> = ({ item }) => {
        const relaseDate = new Date(item.first_air_date)
        const formattedDate = moment(relaseDate).format('MMMM DD, YYYY')

        return (
            <View style={style.populerTVContainer}>
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
                        <View style={style.populerTVRatingContainer}>
                            <Text style={style.populerTVRating}>{item.vote_average}</Text>
                            <MaterialIcons name="star-rate" size={16} color="black" />
                        </View>
                    </View>
                    <Text>{formattedDate}</Text>
                </View>
            </View>
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
                <FlatList
                    data={populerTVData}
                    renderItem={renderPopulerTVItems}
                    ItemSeparatorComponent={() => <Devider spacing={1} color={'#e7e7e7'}></Devider>}
                    ListFooterComponent={<View style={style.footerMargin}></View>}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default List