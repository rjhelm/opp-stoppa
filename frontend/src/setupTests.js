import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';
import {createSerializer} from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});