import { render, screen } from '@testing-library/react';
import { DensityBadge, AlertBadge } from '../Badge';

describe('DensityBadge', () => {
  test('renders optimal density correctly', () => {
    render(<DensityBadge density="optimal" />);
    const badge = screen.getByText('OPTIMAL');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-green-400');
  });

  test('renders critical density correctly', () => {
    render(<DensityBadge density="critical" />);
    const badge = screen.getByText('CRITICAL');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-red-400');
  });

  test('applies custom className', () => {
    render(<DensityBadge density="moderate" className="test-class" />);
    const badge = screen.getByText('MODERATE');
    expect(badge).toHaveClass('test-class');
  });
});

describe('AlertBadge', () => {
  test('renders critical alert correctly', () => {
    render(<AlertBadge type="critical">Emergency</AlertBadge>);
    const badge = screen.getByText('Emergency');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-red-400');
  });

  test('renders success alert correctly', () => {
    render(<AlertBadge type="success">Resolved</AlertBadge>);
    const badge = screen.getByText('Resolved');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-green-400');
  });
});
