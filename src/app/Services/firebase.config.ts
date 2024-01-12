import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



export const firebaseConfig = {
    firebase:{
    apiKey: 'AIzaSyClbffrRj4ESKDeL21Dvl5SRXQsVMBK6cA',
    authDomain: 'petshop-c2ff5.firebaseapp.com',
    databaseURL: 'https://petshop-c2ff5-default-rtdb.firebaseio.com',
    projectId: 'petshop-c2ff5',
    storageBucket: 'petshop-c2ff5.appspot.com',
    messagingSenderId: '731479450903',
    appId: '1:731479450903:web:ae18d06dd39efe5d90c352',
    }  
};
  const app = initializeApp(firebaseConfig.firebase); 
  const auth = getAuth(app);
