import { USERS_ROLES } from "../Constants";
import { store } from "../redux/store";

export const isAdmin = (roles: string[] | null | undefined) => roles && roles.includes(USERS_ROLES.admin);

export const isSuperUser = () => !!store.getState().mainReducer.app.session?.isSuperUser