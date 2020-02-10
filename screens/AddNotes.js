import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Button, AsyncStorage } from 'react-native';

export default class AddNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.navigation.getParam('title', ''),
            note: this.props.navigation.getParam('note', '')
        }
    }
    static navigationOptions() {
        return {
            title: 'Add New Note'
        }
    }
    async saveNote() {
        let prevNotes = await AsyncStorage.getItem('notes');
        let notesArray = [];
        if (prevNotes != null) {
            notesArray = JSON.parse(prevNotes);
        }
        let foundIndex = notesArray.findIndex((obj)=>{
            return (
                obj.id == this.props.navigation.getParam('id', '')
            );
        });
        if(foundIndex > -1) {
            notesArray[foundIndex].title = this.state.title;
            notesArray[foundIndex].note = this.state.note;
        }
        let note = {
            id: new Date().getTime(),
            title: this.state.title,
            note: this.state.note
        }
        notesArray.push(note);
        return AsyncStorage.setItem('notes', JSON.stringify(notesArray));
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    defaultValue={this.state.title}
                    onChangeText={text => {
                        this.setState({
                            title: text
                        });
                    }}
                    placeholder='Title'
                    style={{
                        height: 60,
                        fontSize: 25
                    }}>
                </TextInput>
                <TextInput
                    defaultValue={this.state.note}
                    onChangeText={text => {
                        this.setState({
                            note: text
                        });
                    }}
                    textAlignVertical='top'
                    multiline={true}
                    placeholder='Write note here'
                    style={{
                        flex: 1,
                        height: 70,
                        fontSize: 20
                    }}>
                </TextInput>
                <Button
                    color='purple'
                    title='Save'
                    onPress={() => {
                        this.saveNote().then(() => {
                            this.props.navigation.goBack();
                        })
                    }}>
                </Button>
            </View>
        )
    }
}

//s