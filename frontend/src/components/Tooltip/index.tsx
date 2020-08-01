import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title, className }) => (
  <Container className={className}>
    <span>{title}</span>
    {children}
  </Container>
);

export default Tooltip;
