/**
 * endpointView Actions
 */

export const SET_ENDPOINT_VIEW = 'set@endpointView';
export const ADD_ENDPOINT_PARAM = 'addParam@endpointView';
export const UPDATE_ENDPOINT_PARAM = 'updateParam@endpointView';
export const REMOVE_ENDPOINT_PARAM = 'removeParam@endpointView';
export const UPDATE_ENDPOINT_DESCRIPTION = 'updateDescription@endpointView';
export const ADD_RESPONSE = 'addResponse@endpointView';
export const UPDATE_RESPONSE = 'updateResponse@endpointView';
export const ADD_REQUEST = 'addRequest@endpointView';
export const UPDATE_REQUEST = 'updateRequest@endpointView';
export const SET_RESPONSES = 'setResponses@endpointView';
export const SET_REQUEST = 'setRequest@endpointView';
export const REMOVE_RESPONSE = 'removeResponse@endpointView';

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

export function setEndpointView(endpointData) {
  return {
    type: SET_ENDPOINT_VIEW,
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
