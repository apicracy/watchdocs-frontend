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

import { endpoints } from 'reducers/endpoints';
import { modifyEndpoint } from 'reducers/modifyEndpoint-reducer';
import { endpointView } from 'reducers/endpointView';
import { groupView } from 'reducers/groupView';
import { projects } from 'reducers/projects';
import { modals } from 'reducers/modals';
/* reapp: import new reducer */

export const reducers = {
  endpoints,
  modifyEndpoint,
  endpointView,
  groupView,
  projects,
  modals,
  /* reapp: append new reducer */
};
