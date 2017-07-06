/**
 * appLayout Actions
 */

export const SET_TITLES = 'setTitles@appLayout';
export const SET_FETCHING = 'setFetching@appLayout';

export function setTitles(title, subtitle) {
  return {
    type: SET_TITLES,
    payload: { title, subtitle },
  };
}

export function setFetching(newFetching) {
  return {
    type: SET_FETCHING,
    payload: newFetching,
  };
}
