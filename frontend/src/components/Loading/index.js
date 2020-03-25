import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Container } from './styles';

export default function Loading({ color, size }) {
  return (
    <Container>
      <AiOutlineLoading3Quarters color={color} size={size} />
    </Container>
  );
}
