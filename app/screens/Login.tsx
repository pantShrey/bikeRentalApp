import { View, Text , TextInput, ActivityIndicator, KeyboardAvoidingView,  ImageBackground, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'

import { Firebase_Auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const auth = Firebase_Auth;

    const signIn = async () =>{
        setLoading(true);
        setErrorMessage('');
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            console.log(user);
        } catch (error) {
            setLoading(false);
            console.log(error);
            setErrorMessage('Login failed');
        }
    }

    const forgotPassword = async () =>{
        setLoading(true);
        setErrorMessage('');
        try {
            await sendPasswordResetEmail(auth, email)
            setLoading(false);
            alert('Check your Email')
        } catch (error) {
            setLoading(false);
            console.log(error);
            setErrorMessage('Failed to send reset password email');
        }
    }
  return (
    <>
    <View className="bg-white h-full w-full">
    <ImageBackground source={require('../../assets/background.png')} className = 'h-full w-full absolute'>
    
    <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
            <Text className="text-white font-bold tracking-wider text-5xl">
                Login
            </Text>
        </View>
    <KeyboardAvoidingView behavior='padding' >
    <View className="flex items-center mx-4 space-y-4">
        <View className="bg-black/5 p-5 rounded-2xl w-full">
      <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} className="w-full"/>
      </View>
      <View className="bg-black/5 p-5 rounded-2xl w-full mb-3" >
      <TextInput  secureTextEntry={true} placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} className="w-full"/>
      </View>
      </View>
        {loading ? (<ActivityIndicator size="large" color = "#0000ff"/> 
        ):( <>
        <View className="flex items-center mx-4 space-y-4">
        <View className = "w-full">
            <TouchableOpacity className=" bg-sky-400 p-3 rounded-2xl mb-3" onPress={signIn}>
            <Text className="text-xl font-bold text-white text-center">Login</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className=" text-sky-600">SignUP</Text> 
            </TouchableOpacity>
        </View>
        </View>
        </> 
        )}
      {errorMessage && (<View className="flex justify-center">
      <Text className="text-red-500 text-xl  text-center">{errorMessage}</Text>
      </View>)}
    </KeyboardAvoidingView>

    </View>  

  
    </ImageBackground>
    </View>
    </>
  )
}

export default Login

