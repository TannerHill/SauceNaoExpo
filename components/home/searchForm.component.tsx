import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Surface, Paragraph, Headline, Button, Text, TextInput, Divider } from 'react-native-paper';
import { search } from '../../redux/actions/searchActions';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/routers';
import * as Routes from '../../navigation.json';
import Loading from '../loading.component';
import { useNavigation } from '@react-navigation/core';

interface SearchFormProps extends StackScreenProps<ParamListBase,'Home'> {
    search: (uri: string, isFile?: boolean) => Promise<boolean>
}

const SearchForm : React.FC<SearchFormProps> = (props) => {
    const nav = useNavigation();
    const [url,setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onFocus = () => {
        setIsLoading(false);
    }

    useEffect(() => {
        const unsubscribe = nav.addListener('focus', onFocus);
        return () => unsubscribe();
    }, [props.navigation]);

    const launchImagePicker = async () => {
        let permissionStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permissionStatus.granted) {
            Alert.alert('Media Library Permissions Required', 'An image cannot be selected to search unless media library permissions are granted.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if(!result.cancelled) {
            setIsLoading(true);
            if(await props.search(result.uri, true)) {
                props.navigation.navigate(Routes.Results);
            }
        }
    }

    const searchByUrl = async () => {
        if(!url) {
            Alert.alert('Url Cannot be Empty', 'You must provide a valid, direct image url in order to search.');
            return;
        }
        setIsLoading(true);
        if(await props.search(url)) {
            props.navigation.navigate(Routes.Results);
        }
    }

    return(
        <Surface style={formStyles.formSurface}>
            <View>
                <Headline>Search</Headline>
                <Paragraph>Search for the source of a given image file or url</Paragraph>
            </View>
            <Divider style={{marginVertical: 15}} />
            <View>
            {
                !isLoading
                ?
                <>
                    <Button mode="outlined" icon="file" onPress={() => launchImagePicker()}>Choose Image</Button>
                    <Text style={formStyles.orText}>OR</Text>
                    <View>
                        <TextInput keyboardType={'url'} style={formStyles.urlInput} mode="outlined" label="Url" placeholder="Enter the url of the image" value={url} onChangeText={setUrl} />
                        <Button mode="outlined" icon="search-web" onPress={() => searchByUrl()}>Search By URL</Button>
                    </View>
                </>
                :
                <Loading />
            }
            </View>
        </Surface>
    )
}

const formStyles = StyleSheet.create({
    formSurface: {
        margin: 15,
        padding: 15,
        elevation: 6
    },
    orText: {
        textAlign: 'center',
        marginVertical: 15,
        width: '100%'
    },
    urlInput: {
        marginBottom: 15
    }
});

export default connect(null, { search })(SearchForm);