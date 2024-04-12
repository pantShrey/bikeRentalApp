import { View, Text, Button, Image, TouchableOpacity,  } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { Firebase_Auth } from '../../firebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}
const Home = ({navigation}: RouterProps) => {
  return (
    <View className="flex justify-center items-center h-full" style={{backgroundColor: 'bg-gray-100'}}>
      <View className="absolute top-9 right-5 bg-blue-200 border-2 border-white rounded-full p-1 shadow-lg">
        <Button onPress={()=>{Firebase_Auth.signOut()}} title='Logout'/>
      </View>
      <View className="flex flex-col items-center space-y-10">
        <TouchableOpacity className="flex flex-col items-center w-80 p-5 bg-blue-500 rounded-lg" onPress={()=> navigation.navigate('RentBike')}>
          <Image className="h-24 w-24 mb-5" source={require('../../assets/redbike.jpeg')}/>
          <Text className="text-white font-bold text-2xl">Rent a Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-col items-center w-80 p-5 bg-blue-500 rounded-lg" onPress={()=> navigation.navigate('ListStore')}>
          <Image className="h-24 w-24 mb-5" source={require('../../assets/store.jpeg')}/>
          <Text className="text-white font-bold text-2xl">List Your Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

