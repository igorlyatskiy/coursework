import { USERS_ROLES } from "../Constants";

export const isAdmin = (roles: string[] | null | undefined) => roles && roles.includes(USERS_ROLES.admin);
