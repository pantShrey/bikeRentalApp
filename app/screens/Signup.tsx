import { View, Text, ImageBackground, KeyboardAvoidingView, TextInput, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Firebase_Auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = Firebase_Auth;
    const signUp = async () => {

        setLoading(true);
        setErrorMessage('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Accessing the User object from UserCredential
            setLoading(false);
            console.log(user);
            sendEmailVerification(user).then(()=>{
                alert('Check your Email to Verify it')
            }).catch((error)=>{
                console.log(error);
                setErrorMessage('Failed to send verification email. Please try again');
            })
        } catch (error) {
            setLoading(false);
            console.log(error);
            setErrorMessage('Signup failed');
        }
    }
  return (
    <>
    <View className=" bg-white h-full w-full">
    <ImageBackground source={require('../../assets/background.png')} className = 'h-full w-full absolute'>
    
    <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
            <Text className="text-white font-bold tracking-wider text-5xl">
                SignUp
            </Text>
        </View>
    <KeyboardAvoidingView behavior='padding' >
    <View className="flex items-center mx-4 space-y-4">
        <View className="bg-black/5 p-5 rounded-2xl w-full">
      <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}/>
      </View>
      <View className="bg-black/5 p-5 rounded-2xl w-full mb-3" >
      <TextInput  secureTextEntry={true} placeholder='Password' value={password} onChangeText={(text) => setPassword(text)}/>
      </View>
      </View>
        {loading ? (<ActivityIndicator size="large" color = "#0000ff"/> 
        ):( <>
        <View className="flex items-center mx-4 space-y-4">
        <View className = "w-full">
            <TouchableOpacity className=" bg-sky-400 p-3 rounded-2xl mb-3" onPress={signUp}>
            <Text className="text-xl font-bold text-white text-center">SignUp</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className=" text-sky-600">Login</Text> 
            </TouchableOpacity>
        </View>
        </View>
        </> 
        )}
         {errorMessage && (<View className="flex justify-center">
      <Text className="text-red-500  text-center">{errorMessage}</Text>
      </View>)}
    </KeyboardAvoidingView>

    </View>  

  
    </ImageBackground>
    </View>
    </>
  )
}

export default Signup