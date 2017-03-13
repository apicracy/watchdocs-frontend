/**
 * App's Redux Reducers
 * --------------------
 *
 * here are listed all the reducers that will compose the state of the app.
 * if you want/need to disable a reducer just comment it out in the exported object.
 *
 * NOTE: do not remove nor alter the reapp comments,
 *       they are used during scaffolding operations!
 *
 */

import { appReducer } from 'reducers/app-reducer';
import { endpoints } from 'reducers/endpoints';
import { modifyEndpoint } from 'reducers/modifyEndpoint-reducer';
import { endpointView } from 'reducers/endpointView';
/* reapp: import new reducer */

export const reducers = {
  app: appReducer,
  endpoints,
  modifyEndpoint,
  endpointView,
  /* reapp: append new reducer */
};
