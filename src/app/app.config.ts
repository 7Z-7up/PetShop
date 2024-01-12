import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {provideFirestore, getFirestore } from '@angular/fire/firestore';
//import { getFirestore } from "firebase/firestore"; 
import { routes } from './app.routes';
<<<<<<< Updated upstream
//import { getAuth } from 'firebase/auth';
//import{initializeApp} from 'firebase/app';
import { getAuth , provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { firebaseConfig } from './Services/firebase.config';
=======
import { provideHttpClient } from '@angular/common/http';
>>>>>>> Stashed changes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    /*importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
<<<<<<< Updated upstream
      provideStorage(() => getStorage()),provideFirestore( ()=>getFirestore())
    ])*/
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({
        projectId:"petshop-c2ff5",
        appId:"1:731479450903:web:ae18d06dd39efe5d90c352",
        databaseURL:"https://petshop-c2ff5-default-rtdb.firebaseio.com",
        storageBucket:"petshop-c2ff5.appspot.com",
        // locationId:"us-central",
        apiKey:"AIzaSyClbffrRj4ESKDeL21Dvl5SRXQsVMBK6cA",
        authDomain:"petshop-c2ff5.firebaseapp.com",
        messagingSenderId:"731479450903"
       })
     )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
=======
      provideStorage(() => getStorage()),
    ]),
    provideHttpClient(),
>>>>>>> Stashed changes
  ],
};



// export const app = initializeApp(firebaseConfig.firebase); 
// export const auth = getAuth(app);
// export const firestore = getFirestore();

// export { firebaseConfig };

