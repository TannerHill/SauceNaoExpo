import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import * as strings from '../strings.json';

interface HeaderProps extends StackHeaderProps {
    title: string
}

const Header : React.FC<HeaderProps> = (props) => {
    return(
        <Appbar.Header>
            {
                props.navigation.canGoBack()
                ?
                <Appbar.BackAction onPress={() => props.navigation.pop()} />
                :
                null
            }
            <Appbar.Content title={strings.AppTitle} subtitle={props.title} />
        </Appbar.Header>
    )
}

export default Header;