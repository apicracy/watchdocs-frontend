/**
 * appLayout Actions
 */

export const SET_TITLES = 'setTitles@appLayout';

export function setTitles(title, subtitle) {
  return {
    type: SET_TITLES,
    payload: { title: title, subtitle: subtitle },
  };
}
