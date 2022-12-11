import React, {
  ChangeEvent, memo, useCallback, useState,
} from 'react';
import styled, { css } from 'styled-components';
import {
  MdDelete, MdDone, MdEdit, MdOutlineClose,
} from 'react-icons/md';

import { Todo } from '../../../lib/types/todo.interface';

interface Props {
  onToggleDone: any;
  onClickDelete: any;
  onClickEdit: any;
  // onToggleDone: (id: number, done: boolean) => void;
  // onClickDelete: (id: number) => void;
}

const TodoItem = ({
  id,
  todo,
  isCompleted,
  userId,
  onToggleDone,
  onClickDelete,
  onClickEdit,
}: Props & Todo) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState('');

  const onToggleIsEdit = useCallback(() => {
    if (isEdit) {
      setEditInput('');
    } else {
      setEditInput(todo);
    }
    setIsEdit((prev) => !prev);
  }, [isEdit]);

  const onChangeEditInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditInput(value);
  }, []);

  const onClickEditTodo = useCallback(() => {
    onClickEdit(id, editInput);
    onToggleIsEdit();
  }, [editInput]);

  return (
    <Container>
      {
        isEdit ? (
          <>
            <Input
              type="text"
              value={editInput}
              onChange={onChangeEditInput}
              autoFocus
            />
            <Action onClick={onToggleIsEdit}>
              <MdOutlineClose />
            </Action>
            <Action onClick={onClickEditTodo}>
              <MdDone />
            </Action>
          </>
        ) : (
          <>
            <CheckCircle
              done={isCompleted}
              onClick={() => { onToggleDone(id, !isCompleted); }}
            >
              {isCompleted && <MdDone />}
            </CheckCircle>
            <Text done={isCompleted}>{todo}</Text>
            <Action onClick={onToggleIsEdit}>
              <MdEdit />
            </Action>
            <Action onClick={() => { onClickDelete(id); }}>
              <MdDelete />
            </Action>
          </>
        )
      }
    </Container>
  );
};

export default memo(TodoItem);

const Action = styled.div`
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  margin-left: 12px;
  cursor: pointer;
  &:hover {
    color: #2478ff;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) => props.done
  && css`
      border: 1px solid #2478ff;
      color: #2478ff;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #495057;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props) => props.done
  && css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const Input = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
`;
