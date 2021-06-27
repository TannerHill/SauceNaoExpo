import { useDispatch } from "react-redux";
import { error as ErrorActions } from '../../redux/actionTypes.json';
import { Button, Divider, Headline, Modal, Paragraph, Subheading, useTheme, Card } from "react-native-paper";
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface ErrorModalProps {
    message?: string,
    isVisible: boolean
}

export const ErrorModal : React.FC<ErrorModalProps> = ({ message, isVisible }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const dismiss = () => {
        dispatch({
            type: ErrorActions.DISMISS_ERROR
        });
    }

    const themeStyles : StyleProp<ViewStyle> = {
        backgroundColor: theme.colors.surface
    }

    return(
        <Modal dismissable={false} visible={isVisible} onDismiss={dismiss} contentContainerStyle={modalStyle.modal}>
            <Card elevation={0} style={modalStyle.card}>
                <Card.Title title="Error" subtitle="An error has been encountered" />
                <Card.Content>
                    <Paragraph>{message}</Paragraph>
                </Card.Content>
                <Card.Actions style={modalStyle.cardActions}>
                    <Button mode="outlined" onPress={() => dismiss()}>Dismiss</Button>
                </Card.Actions>
            </Card>
        </Modal>
    )
}

const modalStyle = StyleSheet.create({
    modal: {
        margin: 15
    },
    card: {
        borderWidth: 1
    },
    cardActions: {
        justifyContent: "flex-end"
    }
})