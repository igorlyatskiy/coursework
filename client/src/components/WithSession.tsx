import { useEffect } from "react";
import React from "react";


import api from "../api/api";
import App from "../App";
import { useDispatch } from "react-redux";
import { setSession } from "../redux/main/actions";

export interface Session {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string
}

function WithSession() {
  const dispatch = useDispatch();

  useEffect(
    () => {
      api.getSession()
        .then((data) => {
          const sessionData = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.picture,
          }
          dispatch(setSession(sessionData));
        })
        .catch((error) => {
          const responseStatus = error?.response?.status;

          if (responseStatus === 401) {
            window.location.href = api.baseUrl + '/auth/google/login';
          }
        })
    }, []
  );
  return (
    <App/>
  );
}

export default WithSession;