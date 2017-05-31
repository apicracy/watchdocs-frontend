/**
 * documentView Actions
 */

export const REGISTRATION_SUCCESS = 'registrationSuccess@registration';


export function registrationSuccess(userData) {
  return {
    type: REGISTRATION_SUCCESS,
    payload: userData,
  };
}
