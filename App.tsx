import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Firebase_Auth } from './firebaseConfig';
import Signup from './app/screens/Signup';
import RentBike from './app/screens/RentBike';
import ListStore from './app/screens/ListStore';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={Home} options={{headerShown: false}} />
      <InsideStack.Screen name='RentBike' component={RentBike} options={{headerShown: false}} />
      <InsideStack.Screen name='ListStore' component={ListStore} options={{headerShown: false}} />
    </InsideStack.Navigator>
  );
}
export default function App() {
  const [user,SetUser] = useState <User|null> (null);

  useEffect(() => {
   onAuthStateChanged(Firebase_Auth, (user) => {
    if(user){
      if(user.emailVerified){
        
        SetUser(user);
      }else{
        // If the user is not verified redirect it to login page
        Firebase_Auth.signOut().then(()=>{
          alert('Kindly Verify Your Email');
          SetUser(null);
        });
      }
    }
   }) 
  },[])
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'>
        {user ? <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}} /> 
        : <>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
          <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}} />
          </>
        }
      </Stack.Navigator>
        
    </NavigationContainer>
  );
}

