import { render, screen } from '@testing-library/react';
import { Card, StatCard } from '../Card';

describe('Card', () => {
  test('renders children and applies default none glow', () => {
    render(<Card>Card Content</Card>);
    const elm = screen.getByText('Card Content');
    expect(elm).toBeInTheDocument();
    expect(elm).toHaveClass('border-gray-800/60');
  });

  test('applies cyan glow', () => {
    render(<Card glow="cyan">Cyan Glow</Card>);
    const elm = screen.getByText('Cyan Glow');
    expect(elm).toHaveClass('border-cyan-500/30');
  });

  test('applies custom className', () => {
    render(<Card className="my-custom-class">Custom</Card>);
    const elm = screen.getByText('Custom');
    expect(elm).toHaveClass('my-custom-class');
  });
});

describe('StatCard', () => {
  test('renders label and value', () => {
    render(<StatCard label="Total Users" value="1,000" />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  test('renders subtext if provided', () => {
    render(<StatCard label="Total" value="100" sub="vs last week" />);
    expect(screen.getByText('vs last week')).toBeInTheDocument();
  });

  test('applies color prop to value', () => {
    render(<StatCard label="Alerts" value="5" color="red" />);
    const valueElm = screen.getByText('5');
    expect(valueElm).toHaveClass('text-red-400');
  });
});
