/**
 * endpointEditor Actions
 */

export const SET_ENDPOINT_EDITOR = 'set@EndpointEditor';
export const ADD_ENDPOINT_PARAM = 'addParam@EndpointEditor';
export const UPDATE_ENDPOINT_PARAM = 'updateParam@EndpointEditor';
export const REMOVE_ENDPOINT_PARAM = 'removeParam@EndpointEditor';
export const UPDATE_ENDPOINT_DESCRIPTION = 'updateDescription@EndpointEditor';
export const ADD_RESPONSE = 'addResponse@EndpointEditor';
export const UPDATE_RESPONSE = 'updateResponse@EndpointEditor';
export const ADD_REQUEST = 'addRequest@EndpointEditor';
export const UPDATE_REQUEST = 'updateRequest@EndpointEditor';
export const SET_RESPONSES = 'setResponses@EndpointEditor';
export const SET_REQUEST = 'setRequest@EndpointEditor';
export const REMOVE_RESPONSE = 'removeResponse@EndpointEditor';

export function setRequest(request) {
  return {
    type: SET_REQUEST,
    payload: request,
  };
}

export function setResponses(responses) {
  return {
    type: SET_RESPONSES,
    payload: responses,
  };
}

export function setEndpointEditor(endpointData) {
  return {
    type: SET_ENDPOINT_EDITOR,
    payload: endpointData,
  };
}

export function addEndpointParam(paramData) {
  return {
    type: ADD_ENDPOINT_PARAM,
    payload: paramData,
  };
}

export function updateEndpointParam(paramData) {
  return {
    type: UPDATE_ENDPOINT_PARAM,
    payload: paramData,
  };
}

export function removeEndpointParam(paramId) {
  return {
    type: REMOVE_ENDPOINT_PARAM,
    payload: paramId,
  };
}


export function updateEndpointDescription(descData) {
  return {
    type: UPDATE_ENDPOINT_DESCRIPTION,
    payload: descData,
  };
}

export function addResponse(paramData) {
  return {
    type: ADD_RESPONSE,
    payload: paramData,
  };
}

export function updateResponse(paramData) {
  return {
    type: UPDATE_RESPONSE,
    payload: paramData,
  };
}

export function addRequest(paramData) {
  return {
    type: ADD_REQUEST,
    payload: paramData,
  };
}

export function updateRequest(paramData) {
  return {
    type: UPDATE_REQUEST,
    payload: paramData,
  };
}

export function removeResponse(responseId) {
  return {
    type: REMOVE_RESPONSE,
    payload: responseId,
  };
}
