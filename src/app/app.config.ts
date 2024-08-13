import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { MetaReducer, provideStore } from '@ngrx/store';
import { authReducer, AuthState } from './store/reducers/auth.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';

// import { localStorageSync } from 'ngrx-store-localstorage';

// export function localStorageSyncReducer(reducer: any): any {
//   return localStorageSync({
//     keys: ['auth'],
//     rehydrate: true,
//   })(reducer);
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideStore({
      auth: authReducer,
    }),
    provideHttpClient(withFetch()),
  ],
};
