import {
  setVisibility as setVisibilityAction,
  reset,
} from 'actions/modifyEndpoint-actions';

export function setVisibility(value) {
  return (dispatch /* , getState */) => {
    dispatch(setVisibilityAction(value));
    dispatch(reset());
  };
}
