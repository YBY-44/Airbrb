// This file can be deleted if you'd like
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LogPage } from './jsx/Login';
import { ErrorContext } from './jsx/API';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
const contextValue = {
  setOpenSnackbar: jest.fn(), // 使用 jest.fn() 来模拟函数
  snackbarData: { message: 'success', severity: 'success' as const },
};
test('renders learn react link', () => {
  render(
    <ErrorContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<LogPage />} />
        </Routes>
      </Router>
    </ErrorContext.Provider>
  );
  console.log(screen.debug());
  const elements = screen.queryAllByText(/into Airbrb/i);
  expect(elements.length).toBeGreaterThan(0);

  // // 使用 getByRole 查找按钮
  // const loginButton = screen.getByRole('button', { name: 'Login' }); // 或者 screen.getByRole('button', { name: 'login' })
  // // 断言按钮存在于文档中
  // expect(loginButton).toBeInTheDocument();
});
