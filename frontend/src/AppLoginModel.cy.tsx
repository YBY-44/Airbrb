import React from 'react';
import { mount } from 'cypress/react';
import { LoginModel } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
describe('test it is display', () => {
  it('renders', () => {
    mount(
      <Router>
        <LoginModel isOpen={true} close={() => null} />
      </Router>
    );
    cy.get('button').should('exist');
  });
  it('renders', () => {
    mount(
      <Router>
        <LoginModel isOpen={false} close={() => null} />
      </Router>
    );
    cy.get('button').should('not.exist');
  });
});
