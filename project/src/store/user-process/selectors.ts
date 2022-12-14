import { NameSpace, AuthorizationStatus } from '../../utils/constants';
import { UserData } from '../../types/user-data';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Unknown;
export const getAuthLoggedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getAuthNotLoggedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.NoAuth;
export const getUser = (state: State): UserData => state[NameSpace.User].user;
