import notificationReducer, {
  addNotification,
  removeNotification,
  clearNotifications,
} from './notificationSlice';

describe('notification slice', () => {
  const initialState = {
    notifications: [],
  };

  it('should handle initial state', () => {
    expect(notificationReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addNotification', () => {
    const notification = { id: 1, message: 'Test notification' };
    const actual = notificationReducer(initialState, addNotification(notification));
    expect(actual.notifications).toEqual([notification]);
  });

  it('should handle removeNotification', () => {
    const notification = { id: 1, message: 'Test notification' };
    const stateWithNotification = {
      notifications: [notification],
    };
    const actual = notificationReducer(stateWithNotification, removeNotification(1));
    expect(actual.notifications).toEqual([]);
  });

  it('should handle clearNotifications', () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, message: 'Test 1' },
        { id: 2, message: 'Test 2' },
      ],
    };
    const actual = notificationReducer(stateWithNotifications, clearNotifications());
    expect(actual.notifications).toEqual([]);
  });
});