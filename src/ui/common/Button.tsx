import React, { memo } from 'react';
import styled from 'styled-components';

interface Props {
  color: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const mappedColor = {
  primary: {
    color: '#fff',
    backgroundColor: '#487fef',
  },
  secondary: {
    color: '#fff',
    backgroundColor: '#ffcf7dd6',
  },
  danger: {
    color: '#222',
    backgroundColor: '#d4d4d469',
  },
};

const Button = ({
  color = 'primary',
  disabled = false,
  onClick,
  style,
  children,
}: Props) => (
  <Container
    color={mappedColor[color].color}
    backgroundColor={mappedColor[color].backgroundColor}
    disabled={disabled}
    onClick={onClick}
    style={style}
  >
    <span>{children}</span>
  </Container>
);

export default memo(Button);

const Container = styled.button<{ color: string; backgroundColor: string }>`
  color: ${(props) => props.color};
  background: ${(props) => props.backgroundColor};
  border: unset;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 500;
  height: 48px;
  flex: 1 1 0;
  cursor: pointer;
  transition: all 300ms;
  
  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #d4d4d469;
  }
`;
