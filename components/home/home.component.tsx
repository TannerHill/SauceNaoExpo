import { ParamListBase } from '@react-navigation/routers';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Routes from '../../navigation.json';
import SearchForm from './searchForm.component';

interface HomeProps extends StackScreenProps<ParamListBase,'Home'> {

}

const Home : React.FC<HomeProps> = (props) => {
    return(
        <View style={styles.container}>
            <SearchForm {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
});

export default Home;