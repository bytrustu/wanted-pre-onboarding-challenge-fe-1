import React, {
  ChangeEvent, FormEvent, useCallback, useEffect, useState,
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
import todoRest from '../../lib/api/todoRest';

const TodoPage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [createInput, setCreateInput] = useState('');

  const onChangeCreateInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCreateInput(value);
  }, []);

  const onSubmitCreate = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await todoRest.postCreateTodo(createInput);
      setTodos((prev) => [...prev, data]);
      setCreateInput('');
    } catch (e) {
      alert('할 일 추가에 오류가 발생 했습니다.');
    }
  }, [createInput]);

  const onToggleisCompleted = useCallback(async (id: number) => {
    const todoItem = todos.find((todo) => todo.id === id);
    if (!todoItem) return;
    try {
      const { data } = await todoRest.putUpdateTodo({
        ...todoItem,
        isCompleted: !todoItem.isCompleted,
      });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
    } catch (e) {
      alert('할 일 완료에 오류가 발생 했습니다.');
    }
  }, [todos]);

  const onClickDelete = useCallback(async (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm('정말 삭제 하시겠습니까?');
    if (!isConfirm) {
      return;
    }
    try {
      await todoRest.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      alert('할 일 삭제에 오류가 발생 했습니다.');
    }
  }, []);

  const onClickEdit = useCallback(async (id: number, todo: string) => {
    try {
      const todoItem = todos.find((todo) => todo.id === id);
      if (!todoItem) {
        return;
      }
      const { data } = await todoRest.putUpdateTodo({
        ...todoItem,
        todo,
      });
      setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)));
    } catch (e) {
      alert('할 일 수정에 오류가 발생 했습니다.');
    }
  }, [todos]);

  const onClickLogout = useCallback(() => {
    clearAccessToken();
    navigate(PATH.SIGN_IN, { replace: true });
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await todoRest.getTodos();
        setTodos(data);
      } catch (e) {
        alert('할 일 목록을 가져오는데 오류가 발생 했습니다.');
      }
    })();
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
          onToggleisCompleted={onToggleisCompleted}
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
