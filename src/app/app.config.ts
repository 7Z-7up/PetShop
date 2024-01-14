import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { getAuth , provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(

      provideFirebaseApp(() => initializeApp({
        projectId:"petshop-c2ff5",
        appId:"1:731479450903:web:ae18d06dd39efe5d90c352",
        databaseURL:"https://petshop-c2ff5-default-rtdb.firebaseio.com",
        storageBucket:"petshop-c2ff5.appspot.com",
        apiKey:"AIzaSyClbffrRj4ESKDeL21Dvl5SRXQsVMBK6cA",
        authDomain:"petshop-c2ff5.firebaseapp.com",
        messagingSenderId:"731479450903"
       })
     )

    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
};
