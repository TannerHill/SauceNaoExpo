import { ParamListBase } from '@react-navigation/routers';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Routes from '../navigation.json';

interface HomeProps extends StackScreenProps<ParamListBase,'Home'> {

}

const Home : React.FC<HomeProps> = (props) => {
    return(
        <View style={styles.container}>
            <Text onPress={() => props.navigation.navigate(Routes.Results)}>Open up App.tsx to start working on your app!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;