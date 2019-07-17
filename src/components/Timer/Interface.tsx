import * as React from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import Controls from './Controls';

const InterfaceWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(10, 1fr);
  height: 100vh;
`;

const Interface: React.FC = () => {
  return (
    <InterfaceWrapper>
      <Timer />
      <Controls />
    </InterfaceWrapper>
  );
};

export default Interface;