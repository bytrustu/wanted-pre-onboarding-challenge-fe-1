import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from '../components/layout';
import { clearAccessToken } from '../../lib/utils/accessTokenStore';
import { PATH } from '../../lib/const/path';
import { Todo } from '../../lib/types/todo.interface';
import { Button, Flex } from '../components/common';
import TodoCreate from '../components/todo/TodoCreate';
import TodoList from '../components/todo/TodoList';

const TodoPage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [createInput, setCreateInput] = useState('');

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreateInput(value);
  };

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: create todo
    setCreateInput('');
  };

  const onToggleDone = (id: number, done: boolean) => {
    // TODO: toggle done
  };

  const onClickDelete = (id: number) => {
    // TODO: delete todo
  };

  const onClickEdit = (id: number) => {
    // TODO: edit todo
  };

  const onClickLogout = () => {
    clearAccessToken();
    navigate(PATH.SIGN_IN, { replace: true });
  };

  useEffect(() => {
    // TODO: get todos
  }, []);

  return (
    <Layout>
      <Header>
        <Flex
          style={{ justifyContent: 'end', padding: '10px' }}
        >
          <Button
            color="secondary"
            onClick={onClickLogout}
            style={{ height: '32px', flex: 'unset' }}
          >
            로그아웃
          </Button>
        </Flex>
        <Heading>할 일</Heading>
      </Header>
      <Body>
        <TodoList
          todos={todos}
          onToggleDone={onToggleDone}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      </Body>
      <TodoCreate
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </Layout>
  );
};

export default TodoPage;

const Header = styled.header`
  height: 120px;
`;

const Heading = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #343a40;
  margin: 0;
  text-align: center;
`;

const Body = styled.section`
  width: 100%;
  height: calc(100% - 250px);
  overflow-y: auto;
`;
