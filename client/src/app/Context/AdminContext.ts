'use client'
import {createContext} from "react";
import {AuthenticatedUser} from "@/_services/authentication.service";
import {FetchedUser} from "@/_objects/User";

export interface AdminContext {
  authenticatedAdmin: AuthenticatedUser | null;
  userInfo: FetchedUser | null;
}

const defaultAdminContext: AdminContext = {
  authenticatedAdmin: null,
  userInfo: null
};

export default createContext(defaultAdminContext);