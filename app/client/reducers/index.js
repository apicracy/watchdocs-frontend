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

import { endpoints } from 'reducers/endpointsTree';
import { appLayout } from 'reducers/appLayout';
import { modifyEndpoint } from 'reducers/modifyEndpoint-reducer';
import { endpointEditor } from 'reducers/endpointEditor';
import { responseEditor } from 'reducers/responseEditor';
import { requestEditor } from 'reducers/requestEditor';
import { groupEditor } from 'reducers/groupEditor';
import { documentEditor } from 'reducers/documentEditor';
import { projects } from 'reducers/projects';
import { modals } from 'reducers/modals';
import { session } from 'reducers/session';
import { documentation } from 'reducers/documentation';
/* reapp: import new reducer */

export const reducers = {
  endpoints,
  modifyEndpoint,
  endpointEditor,
  groupEditor,
  documentEditor,
  projects,
  modals,
  responseEditor,
  requestEditor,
  session,
  documentation,
  appLayout,
  /* reapp: append new reducer */
};
