import { render, screen, act } from '@testing-library/react';
import { TimeAgo, ClientTime } from '../TimeAgo';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-01-01T12:00:00Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('TimeAgo', () => {
  test('renders just now for very recent times', () => {
    const recent = new Date('2024-01-01T11:59:50Z'); // 10s ago
    render(<TimeAgo date={recent} />);
    
    // Fast forward enough for initial effect to run
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  test('renders minutes ago', () => {
    const minAgo = new Date('2024-01-01T11:55:00Z'); // 5m ago
    render(<TimeAgo date={minAgo} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByText('5m ago')).toBeInTheDocument();
  });

  test('renders hours ago', () => {
    const hourAgo = new Date('2024-01-01T10:00:00Z'); // 2h ago
    render(<TimeAgo date={hourAgo} />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  test('handles zero timestamp as just now', () => {
    render(<TimeAgo date={new Date(0)} />);
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  test('intervals update the label', () => {
    const recent = new Date('2024-01-01T11:59:50Z'); // 10s ago
    render(<TimeAgo date={recent} />);
    
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getByText('just now')).toBeInTheDocument();

    // Advance by 60 seconds
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(screen.getByText('1m ago')).toBeInTheDocument();
  });
});

describe('ClientTime', () => {
  test('formats time string correctly based on locale', () => {
    const date = new Date('2024-01-01T15:30:00Z'); // Assumes local TZ matching, but passing is fine
    render(<ClientTime date={date} />);
    
    act(() => jest.advanceTimersByTime(100));
    
    // We expect it to render something valid like "15:30" or "03:30" depending on local timezone
    const timeRegex = /^\d{2}:\d{2}\s?(AM|PM)?$/i;
    const element = screen.getByText(timeRegex);
    expect(element).toBeInTheDocument();
  });

  test('handles zero timestamp with placeholders', () => {
    render(<ClientTime date={new Date(0)} />);
    act(() => jest.advanceTimersByTime(100));
    expect(screen.getByText('--:--')).toBeInTheDocument();
  });
});
