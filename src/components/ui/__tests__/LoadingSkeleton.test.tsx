import { render, screen } from '@testing-library/react';
import { SkeletonCard, SkeletonChart, SkeletonTable, SkeletonZoneGrid } from '../LoadingSkeleton';

describe('Skeleton Components', () => {
  test('SkeletonCard renders with aria-label', () => {
    render(<SkeletonCard className="test-card" />);
    const elm = screen.getByRole('status');
    expect(elm).toHaveAttribute('aria-label', 'Loading content');
    expect(elm).toHaveClass('test-card');
  });

  test('SkeletonChart renders', () => {
    render(<SkeletonChart />);
    const elm = screen.getByRole('status');
    expect(elm).toHaveAttribute('aria-label', 'Loading chart');
  });

  test('SkeletonTable renders with correct number of rows', () => {
    // Parent wrapper + rows. Default rows is 5, but let's test specific rows
    render(<SkeletonTable rows={3} />);
    const elm = screen.getByRole('status');
    expect(elm).toHaveAttribute('aria-label', 'Loading table');
  });

  test('SkeletonZoneGrid renders with correct count', () => {
    render(<SkeletonZoneGrid count={2} />);
    const elms = screen.getAllByRole('status');
    expect(elms).toHaveLength(2);
    expect(elms[0]).toHaveAttribute('aria-label', 'Loading zone');
  });
});
