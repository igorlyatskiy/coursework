import { useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import api from "../api/api";
import { setSession } from "../redux/main/actions";
import { JWT_FIELD_NAME, LOGOUT_QUERY_PARAM } from "../Constants";

export interface Session {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  userId: string;
  roles: string[];
  isSuperUser: boolean;
}

let sessionCache: Session | null = null;

export function getSession(dispatch: any) {
  api.getSession()
    .then((data) => {
      const sessionData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        username: data.username,
        userId: data.userId,
        roles: data.roles,
        isSuperUser: data.isSuperUser,
      }
      sessionCache = sessionData;
      dispatch(setSession(sessionData));
    })
    .catch((error) => {
      const responseStatus = error?.response?.status;

      if (responseStatus === 401) {
        window.location.href = api.baseUrl + '/auth/google/login';
      }
    })
}

function withSession(WrappedComponent: React.ComponentType<any>) {
  return (props: any) => {
    const dispatch = useDispatch();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const token = searchParams.get(JWT_FIELD_NAME);
    const logout = searchParams.get(LOGOUT_QUERY_PARAM);

    if (token) {
      localStorage.setItem(JWT_FIELD_NAME, token);
      searchParams.delete(JWT_FIELD_NAME);
    }

    if (logout) {
      localStorage.removeItem(JWT_FIELD_NAME)
      searchParams.delete(LOGOUT_QUERY_PARAM);
    }

    useEffect(
      () => {
        if (sessionCache) {
          dispatch(setSession(sessionCache));
          return;
        }

        if (logout || token) {
          setSearchParams(searchParams);
        }

        getSession(dispatch);
      }, []
    );
    return (
      <WrappedComponent {...props}/>
    );
  };
}

export default withSession;