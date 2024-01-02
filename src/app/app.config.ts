import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideStorage(() => getStorage()),
    ]),
  ],
};

const firebaseConfig = {
  apiKey: 'AIzaSyClbffrRj4ESKDeL21Dvl5SRXQsVMBK6cA',
  authDomain: 'petshop-c2ff5.firebaseapp.com',
  databaseURL: 'https://petshop-c2ff5-default-rtdb.firebaseio.com',
  projectId: 'petshop-c2ff5',
  storageBucket: 'petshop-c2ff5.appspot.com',
  messagingSenderId: '731479450903',
  appId: '1:731479450903:web:ae18d06dd39efe5d90c352',
};
