export const ROUTE_LOGIN = '/login';

export const ROUTE_ADMIN_HOME = '/';
export const ROUTE_ADMIN_DEPARTMENT = '/department';
export const ROUTE_ADMIN_ROLE = '/role';
export const ROUTE_ADMIN_USER = '/user';

// EXCEPTION
const EXCEPTION = '/exception';
export const ROUTE_UNAUTHORIZED = EXCEPTION + '/401';
export const ROUTE_NOT_FOUND = EXCEPTION + '/404';
export const ROUTE_FORBIDDEN = EXCEPTION + '/403';
export const ROUTE_INTERNAL_SERVER_ERROR = EXCEPTION + '/500';

// CLIENT
export const ROUTE_CLIENT_HOME = '/';
export const ROUTE_CLIENT_FRIENDS = '/friends';
export const ROUTE_CLIENT_PROFILE = '/friends/profile/:id';
