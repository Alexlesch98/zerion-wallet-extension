import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { WindowSize } from 'src/ui-lab/components/WindowSize';
import type { Readme } from 'src/ui-lab/types';
import { Overview } from './Overview';

export const readme: Readme = {
  name: 'Overview',
  description: null,
  component: () => (
    <MemoryRouter>
      <WindowSize>
        <Overview />
      </WindowSize>
    </MemoryRouter>
  ),
};
