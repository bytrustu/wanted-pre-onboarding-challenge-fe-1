import React, { memo } from 'react';
import styled from 'styled-components';

import { Todo } from '../../../lib/types/todo.interface';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onToggleisCompleted: (id: number) => void;
  onClickDelete: (id: number) => void;
  onClickEdit: any;
}

const TodoList = ({
  todos,
  onToggleisCompleted,
  onClickDelete,
  onClickEdit,
}: Props) => (
  <Container>
    {
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggleisCompleted={onToggleisCompleted}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      ))
    }
  </Container>
);

export default memo(TodoList);

const Container = styled.div`
  flex: 1;
  padding: 20px 32px 48px 32px;
  overflow-y: auto;
`;
