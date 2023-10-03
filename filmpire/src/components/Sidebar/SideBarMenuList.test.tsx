import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBarMenuList from './SideBarMenuList';
import { describe, beforeEach, test, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('サイドバーメニューの動作確認', () => {
  const mockData = {
    genres: [
      { id: 101, name: 'popular' },
      { id: 102, name: 'top rated' },
      { id: 103, name: 'upcoming' },
    ],
  };
  beforeEach(() => {
    render(
      <Router>
        <SideBarMenuList displayArray={mockData} />
      </Router>,
    );
  });
  test('displayArrayを表示する', () => {
    test('renders each item from displayArray prop', () => {
      mockData.genres.forEach((item) => {
        const element = screen.getByText(item.name);
        expect(element).toBeInTheDocument();
      });
    });
    test('renders correct link for each item', () => {
      const linkElements = screen.getAllByRole('link', { name: 'popular' });
      linkElements.forEach((link) => {
        expect(link).toHaveAttribute('href', '/');
      });
    });
  });
});
