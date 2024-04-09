import { View, Text ,StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Alert, ImageBackground} from 'react-native'
import React, { useState } from 'react'

import { Firebase_Auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
const Login = () => {
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
    <ImageBackground source={require('../../assets/background.png')} style={{width:'100%',height:'100%'}} resizeMode='cover'>
    <View style={styles.container}>
        
    <KeyboardAvoidingView behavior='padding' style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <TextInput style={styles.inputRounded} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}/>
      <TextInput style={styles.inputRounded} secureTextEntry={true} placeholder='Password' value={password} onChangeText={(text) => setPassword(text)}/>
        {loading ? (<ActivityIndicator size="large" color = "#0000ff"/> 
        ):( <>
        <Button title='Login' onPress={signIn} />
        <Button title='Create Account' onPress={signUp} />
        <Button title='Forgot Password' onPress={forgotPassword} />
        </> 
        )}
      {errorMessage && (<Text style={styles.errorMessage}>{errorMessage}</Text>)}
    </KeyboardAvoidingView>

        

    </View>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputRounded: {
        width: 300,
        height: 50,
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginVertical: 4
    },
    button:{
        marginVertical: 4,
        backgroundColor: '#87CEEB',
        borderRadius: 4
    },
    title:{
        color:'#fff'
    },
    errorMessage: {
        marginVertical: 4,
        textAlign: 'center',
        color: 'red'
    }
})










































