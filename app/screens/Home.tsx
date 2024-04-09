import { View, Text, Button,StyleSheet} from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Firebase_Auth } from '../../firebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const Home = ({navigation}: RouterProps) => {
  return (
    <View >
      <Text style = {styles.container}>Home</Text>
      <Button onPress={()=>{Firebase_Auth.signOut()}} title='Logout'/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
        
    }
});