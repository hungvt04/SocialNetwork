import { notification } from 'antd';
import { useEffect, useMemo } from 'react';

const Alert = ({ type = 'info', title = 'Thông báo', message = 'Thao tác thành công' }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api[type]({
      message: title,
      description: message,
      placement: 'topRight',
    });
  };

  useEffect(() => {
    openNotification();
  }, [type, title, message]);

  return contextHolder;
};

export default Alert;
