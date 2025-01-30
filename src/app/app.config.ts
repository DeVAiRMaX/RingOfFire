import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-12dd0","appId":"1:469833897571:web:71ccc8ded12d2e2d330a56","storageBucket":"ringoffire-12dd0.firebasestorage.app","apiKey":"AIzaSyB4zdsEGekCgrw_1EUBBW8JPyuCGTxA3zg","authDomain":"ringoffire-12dd0.firebaseapp.com","messagingSenderId":"469833897571"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
