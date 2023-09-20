import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBarMenuList from './SideBarMenuList';
import { describe, beforeEach, test, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('サイドバーメニューの動作確認', () => {
  const mockData = [
    { label: 'Test1', value: 'test1' },
    { label: 'Test2', value: 'test2' },
  ];
  beforeEach(() => {
    render(
      <Router>
        <SideBarMenuList displayArray={mockData} />
      </Router>,
    );
  });
  test('displayArrayを表示する', () => {
    test('renders each item from displayArray prop', () => {
      mockData.forEach((item) => {
        const element = screen.getByText(item.label);
        expect(element).toBeInTheDocument();
      });
    });
    test('renders correct link for each item', () => {
      const linkElements = screen.getAllByRole('link', { name: /Test/ });
      linkElements.forEach((link) => {
        expect(link).toHaveAttribute('href', '/');
      });
    });
  });
});
