/// <reference types="cypress" />
import React from 'react';
import { mount } from 'cypress/react';
import { LogPage } from './Login';
import { ErrorContext } from './API'; // Update the path accordingly
import { BrowserRouter as Router } from 'react-router-dom';

describe('<LogPage />', () => {
  it('renders', () => {
    const setOpenSnackbarMock = cy.stub().as('setOpenSnackbar');
    const contextValue = {
      snackbarData: {
        severity: 'success' as const,
        message: 'Default message',
      },
      setOpenSnackbar: setOpenSnackbarMock,
    };
    mount(
      <ErrorContext.Provider value={contextValue}>
        <Router>
          <LogPage />
        </Router>
      </ErrorContext.Provider>
    );
    // Add your assertions as needed
    cy.get('#log-email').should('exist');
    cy.get('#login-email').should('exist');
    cy.get('#log-pwd').should('exist');
    cy.get('#login-pwd').should('exist');
    cy.get('#message').should('exist');
    cy.get('#login-button').should('exist');
  });
  it('handles email input change', () => {
    const setOpenSnackbarMock = cy.stub().as('setOpenSnackbar');
    const contextValue = {
      snackbarData: {
        severity: 'success' as const,
        message: 'Default message',
      },
      setOpenSnackbar: setOpenSnackbarMock,
    };
    mount(
      <ErrorContext.Provider value={contextValue}>
        <Router>
          <LogPage />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#login-email').type('test@example.com');
    cy.get('#login-email').should('have.value', 'test@example.com');
  });
  it('handles password input change', () => {
    const setOpenSnackbarMock = cy.stub().as('setOpenSnackbar');
    const contextValue = {
      snackbarData: {
        severity: 'success' as const,
        message: 'Default message',
      },
      setOpenSnackbar: setOpenSnackbarMock,
    };
    mount(
      <ErrorContext.Provider value={contextValue}>
        <Router>
          <LogPage />
        </Router>
      </ErrorContext.Provider>
    );
    // tiggle email change
    cy.get('#login-pwd').type('11111111');
    cy.get('#login-pwd').should('have.value', '11111111');
  });
  it('handles login button click ', () => {
    // 渲染组件
    const setOpenSnackbarMock = cy.stub().as('setOpenSnackbar');
    const contextValue = {
      snackbarData: {
        severity: 'success' as const,
        message: 'Default message',
      },
      setOpenSnackbar: setOpenSnackbarMock,
    };
    mount(
      <ErrorContext.Provider value={contextValue}>
        <Router>
          <LogPage />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#login-button').click();
    cy.get('#message').should('be.visible').contains('Email can not be nothing');
  });
  it('handles login button click success', () => {
    const setOpenSnackbarMock = cy.stub().as('setOpenSnackbar');
    const contextValue = {
      snackbarData: {
        severity: 'success' as const,
        message: 'Default message',
      },
      setOpenSnackbar: setOpenSnackbarMock,
    };
    mount(
      <ErrorContext.Provider value={contextValue}>
        <Router>
          <LogPage />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#login-email').type('1');
    cy.get('#login-pwd').type('11111111');
    cy.get('#login-button').click();
    cy.get('#message').should('be.visible').contains('Log success');
  });
});
