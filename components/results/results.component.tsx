import React from 'react';
import { StyleSheet, View } from 'react-native';
import ResultItem from './resultItem.component';
import { Headline, Subheading, Text, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

const Results : React.FC = () => {
    const results = useSelector<AppState,SearchResult[]>(state => state.search.results);
    return(
        <View style={styles.container}>
            <List.Subheader style={{textAlign: 'center'}}>Tap to visit; Hold to copy link</List.Subheader>
            <List.Section style={styles.list}>
                {
                    results.map((item,i) => <ResultItem key={i} item={item} />)
                }
            </List.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        overflow: 'scroll'
    }
});

export default Results;