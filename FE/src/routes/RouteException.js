import {
  ROUTE_FORBIDDEN,
  ROUTE_INTERNAL_SERVER_ERROR,
  ROUTE_NOT_FOUND,
  ROUTE_UNAUTHORIZED,
} from './RoutesPath';

export const ROUTE_EXCEPTION = [
  {
    key: ROUTE_UNAUTHORIZED,
    route: ROUTE_UNAUTHORIZED,
    props: {
      title: '401',
      subTitle: 'Bạn cần đăng nhập để truy cập',
      titleButton: 'ĐĂNG NHẬP LẠI',
      route: '/',
    },
  },
  {
    key: ROUTE_FORBIDDEN,
    route: ROUTE_FORBIDDEN,
    props: {
      title: '403',
      subTitle: 'Bạn không có quyền truy cập',
      titleButton: 'ĐĂNG NHẬP LẠI',
      route: '/',
    },
  },
  {
    key: ROUTE_NOT_FOUND,
    route: ROUTE_NOT_FOUND,
    props: { title: '404', subTitle: 'Không tìm thấy trang', titleButton: 'TRANG CHỦ', route: '/' },
  },
  {
    key: ROUTE_INTERNAL_SERVER_ERROR,
    route: ROUTE_INTERNAL_SERVER_ERROR,
    props: { title: '500', subTitle: 'Lỗi server', titleButton: 'TRANG CHỦ', route: '/' },
  },
];
