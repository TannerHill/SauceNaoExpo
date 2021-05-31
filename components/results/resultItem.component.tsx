import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import * as Linking from 'expo-linking';
import Clipboard from 'expo-clipboard';

interface ResultItemProps {
    item: SearchResult
}

const ResultItem : React.FC<ResultItemProps> = (props) => {
    const { item } = props;

    const getDescriptionText = (result : SearchResult) => {
        return `Similarity: ${result.header.similarity}%`;
    }

    const openLink = (url : string) => {
        if(Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }

    const copyLink = (url : string) => {
        Clipboard.setString(url);
    }

    return(
        <TouchableOpacity onLongPress={() => copyLink(item.data.ext_urls[0])} onPress={() => openLink(item.data.ext_urls[0])}>
            <List.Item
                title={item.data.title ?? item.header.index_name}
                description={getDescriptionText(item)}
                left={_ => <Image style={styles.image} source={{uri: item.header.thumbnail}} />} />
            <Divider />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 15
    }
})

export default ResultItem;