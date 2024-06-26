import {
  CreateUserDTO,
  LoadingStatus,
  UsersDTO,
  UsersEntity
} from '@users/core/data-access';
import { UsersErrors } from './users.reducer';
import { createAction, props } from '@ngrx/store';

export type onSuccessEditionCbType = () => void;

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction('[Users/API] Load Users Success', props<{ users: UsersEntity[] }>());

export const loadUsersFailure = createAction('[Users/API] Load Users Failure', props<{ error: UsersErrors }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users/Api] Delete User Success', props<{ id: number }>());
export const deleteUserFailed = createAction('[Users/Api] Delete User Failed', props<{ error: UsersErrors }>());

export const addUser = createAction('[Users Page] Add User', props<{ userData: CreateUserDTO }>());
export const addUserSuccess = createAction('[Users/Api] Add User Success', props<{ userData: UsersEntity }>());
export const addUserFailed = createAction('[Users/Api] Add User Failed', props<{ error: UsersErrors }>());

export const editUser = createAction(
  '[Users Detail] Edit User',
  props<{
    userData: CreateUserDTO;
    id: number;
    onSuccessCb: onSuccessEditionCbType;
  }>()
);
export const editUserSuccess = createAction('[Users Detail] Edit User Success', props<{ userData: UsersDTO }>());
export const editUserFailed = createAction('[Users Detail] Edit Failed', props<{ error: UsersErrors }>());

export const loadUser = createAction('[Users Page] Load User');
export const loadUserSuccess = createAction('[Users/Api] Load User Success', props<{ userData: UsersEntity }>());
export const loadUserFailed = createAction('[Users/Api] Load User Failed', props<{ error: UsersErrors }>());

export const updateUserStatus = createAction('[Users Detail] Update User Status', props<{ status: LoadingStatus }>());

export const setUsersFilter = createAction('[Users Detail] Users Filtered', props<{ filter: {name: string} }>());

export const addUserStoryPoints = createAction('[Users Detail] Add User StoryPoints', props<{
  userData: CreateUserDTO;
  id: number;
  onSuccessAddSP: onSuccessEditionCbType;
}>());
export const addUserStoryPointsSuccess = createAction('[Users Detail] Add User StoryPoints Success', props<{
  userData: UsersDTO;
}>());
export const addUserStoryPointsFailed = createAction('[Users Detail] Add User StoryPoints Failed', props<{
  error: UsersErrors;
}>());
