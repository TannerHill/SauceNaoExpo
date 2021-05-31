import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, StyleProp, TextStyle } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Loading : React.FC = () => {
    const rotationValue = useRef(new Animated.Value(0)).current;

    const startSpin = () => {
        Animated.loop(
            Animated.timing(rotationValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false
            })
        ).start();
    }

    useEffect(() => {
        startSpin();
    }, []);

    const spin = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return(
        <View style={styles.container}>
            <Animated.Text
                style={{transform:[{rotate: spin}]}}>
                    <MaterialCommunityIcons name='loading' size={72} />
                </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Loading;