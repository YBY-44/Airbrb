/// <reference types="cypress" />
import React from 'react';
import { mount } from 'cypress/react';
import { ErrorContext } from './API'; // Update the path accordingly
import { CreateHosting } from './Host';

import { BrowserRouter as Router } from 'react-router-dom';

describe('<CreateHosting />', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#Apart').should('exist');
    cy.get('#caBIN').should('exist');
    cy.get('#Hous').should('exist');
    cy.get('#Hot').should('exist');
    cy.get('#Q5').should('exist');
    cy.get('#Q2').should('exist');
    cy.get('#Q3').should('exist');
    cy.get('#Q4').should('exist');
    cy.get('#Q6').should('exist');
    cy.get('#Q7').should('exist');
  });
  it('choose the type', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#Apart').click();
    cy.get('#Apartment').should('be.checked');
    cy.get('#caBIN').click();
    cy.get('#Cabin').should('be.checked');
    cy.get('#Hous').click();
    cy.get('#House').should('be.checked');
    cy.get('#Hot').click();
    cy.get('#Hotel').should('be.checked');
  });
  it('add the address', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#country').type('China');
    cy.get('#country').should('have.value', 'China');
    cy.get('#street').type('street');
    cy.get('#street').should('have.value', 'street');
    cy.get('#city').type('city');
    cy.get('#city').should('have.value', 'city');
    cy.get('#state').type('state');
    cy.get('#state').should('have.value', 'state');
    cy.get('#postcode').type('111');
    cy.get('#postcode').should('have.value', '111');
  });
  it('choose edit the bed number', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#Guests').type('2');
    cy.get('#Guests').should('have.value', '2');
    cy.get('#Beds').type('2');
    cy.get('#Beds').should('have.value', '2');
    cy.get('#Bedrooms').type('2');
    cy.get('#Bedrooms').should('have.value', '2');
    cy.get('#Bathrooms').type('2');
    cy.get('#Bathrooms').type('2');
  });
  it('edit the facility', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );

    cy.get('#kitch').click();
    cy.get('#Kitchen').should('be.checked');
    cy.get('#kitch').click();
    cy.get('#Kitchen').should('not.be.checked');

    cy.get('#wifi').click();
    cy.get('#WiFi').should('be.checked');
    cy.get('#wifi').click();
    cy.get('#WiFi').should('not.be.checked');

    cy.get('#tv').click();
    cy.get('#TV').should('be.checked');
    cy.get('#tv').click();
    cy.get('#TV').should('not.be.checked');

    cy.get('#washing-machine').click();
    cy.get('#Washing-machine').should('be.checked');
    cy.get('#washing-machine').click();
    cy.get('#Washing-machine').should('not.be.checked');

    cy.get('#air-cond').click();
    cy.get('#Air-conditioning').should('be.checked');
    cy.get('#air-cond').click();
    cy.get('#Air-conditioning').should('not.be.checked');

    cy.get('#free-parking').click();
    cy.get('#Free-Parking').should('be.checked');
    cy.get('#free-parking').click();
    cy.get('#Free-Parking').should('not.be.checked');
  });
  it('choose edit the title', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#hosting-title').type('111111111111111111111111111111111111111111111111');
    cy.get('#hosting-title').and('have.length.at.most', 32);
  });
  it('edit the price', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#price').type('111111111111111111111111111111111111111111111111');
    cy.get('#price').and('have.length.at.most', 5).and('have.value', '11111');
  });
  it('edit the price 2', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#price').type('999999');
    cy.get('#price').and('have.length.at.most', 5).and('have.value', '99999');
  });
  it('edit the thumb', () => {
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
          <CreateHosting />
        </Router>
      </ErrorContext.Provider>
    );
    cy.get('#callupload').click();
    cy.get('#callupload').click();
    cy.get('#upload').should('be.visible');
  });
});
