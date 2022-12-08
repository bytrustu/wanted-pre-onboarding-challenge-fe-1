import React, { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  direction?: string;
  children?: ReactNode;
  [key: string]: any;
}

const Flex = ({
  direction,
  children,
  ...props
}: Props) => (
  <Container
    direction={direction}
    {...props}
  >
    {children}
  </Container>
);

const Container = styled.article<{ direction?: string }>`
  position: relative;
  display: flex;
  flex-direction: ${(props) => props?.direction || 'row'};
  width: 100%;
`;

export default memo(Flex);
