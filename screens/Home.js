import React from 'react';
import {
    View,
    TouchableOpacity,
    Text, 
    FlatList, 
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }
    static navigationOptions() {
        return {
            title: 'Home'
        }
    }
    componentDidMount() {
        this.didFocusSubscription = this.props.navigation.addListener('didFocus', payload=> {
            AsyncStorage.getItem('notes').then((notes) => {
                if (notes != null) {
                    this.setState({
                        notes: JSON.parse(notes)
                    });
                }
            });
        })
    }
    deleteItem(index){
        let notes = this.state.notes;
        notes = notes.filter((item, i)=>{
            return index != i
        });
        this.setState(
            {
                notes: notes
            },
            ()=>{
                AsyncStorage.setItem('notes', JSON.stringify(notes));
            }
        )
    }
    componentWillUnmount(){
        this.didFocusSubscription.remove();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.notes}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    renderItem={({ item, index }) => {
                        console.log(item);
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('addnotes', item)
                                }}
                                style={{
                                    width: '100%',
                                    height: 100,
                                    backgroundColor: 'white',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <View
                                    style={{
                                        flex: 1,
                                        height: '100%'
                                    }}>
                                    <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 20,
                                            overflow: 'hidden'
                                        }}>{item.title}
                                    </Text>
                                    <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={2}
                                        style={{ fontSize: 15 }}>
                                        {item.note}
                                    </Text>
                                </View>
                                <Icon 
                                onPress={()=>{
                                    this.deleteItem(index);
                                }}
                                name='trash' 
                                size={30} 
                                color='black'></Icon>
                            </TouchableOpacity>
                        );
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('addnotes')
                    }}
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: 'purple',
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        borderRadius: 25
                    }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 30,
                        textAlign: 'center'
                    }}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}