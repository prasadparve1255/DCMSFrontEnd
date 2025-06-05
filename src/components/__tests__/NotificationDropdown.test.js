import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NotificationDropdown from '../NotificationDropdown';

const mockStore = configureStore([]);

describe('NotificationDropdown', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        items: [
          {
            _id: '1',
            message: 'Test notification',
            read: false,
            createdAt: new Date().toISOString()
          }
        ]
      }
    });
    store.dispatch = jest.fn();
  });

  it('renders notification items when open', () => {
    render(
      <Provider store={store}>
        <NotificationDropdown isOpen={true} onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Test notification')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Provider store={store}>
        <NotificationDropdown isOpen={false} onClose={() => {}} />
      </Provider>
    );

    expect(screen.queryByText('Test notification')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Provider store={store}>
        <NotificationDropdown isOpen={true} onClose={onClose} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('displays no notifications message when empty', () => {
    store = mockStore({
      notifications: {
        items: []
      }
    });

    render(
      <Provider store={store}>
        <NotificationDropdown isOpen={true} onClose={() => {}} />
      </Provider>
    );

    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });
});