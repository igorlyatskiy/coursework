import { useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";

import api from "../api/api";
import { setSession } from "../redux/main/actions";

export interface Session {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  userId: string;
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

    useEffect(
      () => {
        if (sessionCache) {
          dispatch(setSession(sessionCache));
          return;
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