import React from 'react';

import { Route } from 'react-router-dom';

import Drawer from '#components/Drawer';

import { Main } from '#screens';

const AppStack = () => {
  return (
    <Route
      element={
        <>
          <Drawer />
          <Main />
        </>
      }
      path="/"
    />
  );
};

export default AppStack;
