import { ParamListBase } from '@react-navigation/routers';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Headline, Paragraph, Portal, Surface, useTheme } from 'react-native-paper';
import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { ErrorState } from '../../redux/reducers/error';
import { ErrorModal } from '../utility/errorModal.component';
import SearchForm from './searchForm.component';

interface HomeProps extends StackScreenProps<ParamListBase,'Home'> {

}

const Home : React.FC<HomeProps> = (props) => {
    const errorState = useSelector<AppState,ErrorState>(s => s.error, shallowEqual);
    const theme = useTheme();
    const viewStyle : StyleProp<ViewStyle> = {
        backgroundColor: theme.colors.background
    };
    return(
        <>
            <Portal>
                <ErrorModal message={errorState.message} isVisible={errorState.message ? true : false} />
            </Portal>
            <View style={StyleSheet.flatten([styles.container,viewStyle])}>
                <SearchForm {...props} />
                <View style={styles.textContainer}>
                    <Headline>What is this?</Headline>
                    <Paragraph>
                        SauceNao is a free reverse-image search tool made to help you find the original source of images (mainly digital artowrk).
                    </Paragraph>
                    <Paragraph>
                        Did you see some artwork posted without a source or watermark? Upload the image here or paste its URL.
                    </Paragraph>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    textContainer: {
        padding: 15,
        margin: 15
    }
});

export default Home;