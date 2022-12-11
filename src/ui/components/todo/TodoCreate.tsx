import React, { ChangeEvent, FormEvent, memo } from 'react';
import styled from 'styled-components';

import { Button } from '../common';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
}

const TodoCreate = ({
  onChange, onSubmit, value,
}: Props) => (
  <CreateContainer>
    <CreateForm
      onSubmit={onSubmit}
    >
      <Input
        autoFocus
        placeholder="입력 후, Enter를 누르세요."
        onChange={onChange}
        value={value}
      />
      <Button
        type="submit"
        disabled={!value}
        color="primary"
        style={{ width: 60, marginLeft: 10 }}
      >
        추가
      </Button>
    </CreateForm>
  </CreateContainer>
);

export default memo(TodoCreate);

const CreateContainer = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
`;

const CreateForm = styled.form`
  display: flex;
  flex-direction: row;
  background: #f8f9fa;
  padding: 32px 32px 50px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: calc(100% - 80px);
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
