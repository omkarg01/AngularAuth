import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './store/reducers/counter.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideStore({
      counter: counterReducer,
      auth: authReducer,
    }),
    provideHttpClient(withFetch()),
    provideEffects(AuthEffects),
  ],
};
