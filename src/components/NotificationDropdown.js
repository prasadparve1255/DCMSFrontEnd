import React from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../store/notificationSlice';

const NotificationDropdown = ({ notifications }) => {
  const dispatch = useDispatch();

  const handleDismiss = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="notificationDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Notifications ({notifications.length})
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
        {notifications.length === 0 ? (
          <li><span className="dropdown-item">No notifications</span></li>
        ) : (
          notifications.map((notification) => (
            <li key={notification.id}>
              <div className="dropdown-item">
                <span>{notification.message}</span>
                <button
                  className="btn btn-sm btn-close"
                  onClick={() => handleDismiss(notification.id)}
                  aria-label="Dismiss"
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotificationDropdown;