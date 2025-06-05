import notificationReducer, {
  addNotification,
  fetchNotifications,
  markNotificationsAsRead
} from '../notificationSlice';

describe('notification reducer', () => {
  const initialState = {
    items: [],
    unreadCount: 0,
    loading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(notificationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addNotification', () => {
    const notification = {
      _id: '1',
      message: 'Test notification',
      read: false
    };

    const actual = notificationReducer(initialState, addNotification(notification));
    expect(actual.items).toHaveLength(1);
    expect(actual.unreadCount).toBe(1);
  });

  it('should handle fetchNotifications.pending', () => {
    const actual = notificationReducer(initialState, fetchNotifications.pending);
    expect(actual.loading).toBe(true);
  });

  it('should handle fetchNotifications.fulfilled', () => {
    const notifications = [
      { _id: '1', message: 'Test 1', read: false },
      { _id: '2', message: 'Test 2', read: true }
    ];

    const actual = notificationReducer(
      { ...initialState, loading: true },
      fetchNotifications.fulfilled(notifications)
    );

    expect(actual.loading).toBe(false);
    expect(actual.items).toEqual(notifications);
    expect(actual.unreadCount).toBe(1);
  });

  it('should handle markNotificationsAsRead.fulfilled', () => {
    const state = {
      ...initialState,
      items: [
        { _id: '1', message: 'Test 1', read: false },
        { _id: '2', message: 'Test 2', read: false }
      ],
      unreadCount: 2
    };

    const actual = notificationReducer(state, markNotificationsAsRead.fulfilled());
    expect(actual.unreadCount).toBe(0);
    expect(actual.items.every(item => item.read)).toBe(true);
  });
});