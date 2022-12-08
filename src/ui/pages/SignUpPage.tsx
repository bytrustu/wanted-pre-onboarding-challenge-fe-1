import React, {
  ChangeEvent, useCallback, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from '../layout';
import {
  Button,
  TextField,
  Flex,
} from '../common';
import { getValidationUser } from '../../lib/utils';
import {
  UserParam,
  UserValidation,
} from '../../lib/types/user.interface';
import authRest from '../../lib/api/authRest';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserParam>({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [validation, setValidation] = useState<UserValidation>({
    email: false,
    password: false,
    passwordCheck: false,
  });

  const isUserValidation = useMemo(
    () => !(
      validation.email
      && validation.password
      && validation.passwordCheck
    ),
    [validation],
  );

  const handleClickPrev = useCallback(() => {
    navigate('/', { replace: true });
  }, []);

  const onChangeUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let test = false;
    const regexpCheckList = ['email', 'password'];

    if (regexpCheckList.includes(name)) {
      test = getValidationUser(name as keyof Omit<UserParam, 'passwordCheck'>, value);
    }

    if (name === 'passwordCheck') {
      test = user.password === value;
    }

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidation((prev) => ({
      ...prev,
      [name]: test,
    }));
  }, [user]);

  const onClickSignUp = useCallback(async () => {
    try {
      await authRest.postSignUp(user);
      alert('회원가입이 완료 되었습니다.');
      handleClickPrev();
    } catch (e: any) {
      const errorMessage = e.response?.data?.message ?? '회원가입에 실패했습니다.';
      alert(errorMessage);
    }
  }, [user]);

  return (
    <Layout>
      <Header>
        <Prev onClick={handleClickPrev}>
          &lt;
        </Prev>
      </Header>
      <Heading>회원가입</Heading>
      <FormContainer>
        <TextField
          label="이메일"
          id="email"
          type="email"
          value={user.email}
          validation={validation.email}
          onChange={onChangeUser}
          error={{
            isError: user.email.length > 0 && !validation.email,
            message: '이메일 형식이 올바르지 않습니다.',
          }}
          autoFocus
        />
        <TextField
          label="비밀번호"
          id="password"
          type="password"
          value={user.password}
          validation={validation.password}
          onChange={onChangeUser}
          error={{
            isError: user.password.length > 0 && !validation.password,
            message: '8글자 이상 입력해 주세요.',
          }}
        />
        <TextField
          label="비밀번호 확인"
          id="passwordCheck"
          type="password"
          value={user.passwordCheck as string}
          validation={validation.passwordCheck}
          onChange={onChangeUser}
          error={{
            isError: (user.passwordCheck as string).length > 0 && !validation.passwordCheck,
            message: '비밀번호가 동일하지 않습니다.',
          }}
        />
        <ButtonContainer>
          <Button
            color="primary"
            disabled={isUserValidation}
            onClick={onClickSignUp}
            style={{ width: '100%' }}
          >
            회원가입
          </Button>
        </ButtonContainer>
      </FormContainer>
    </Layout>
  );
};

export default SignUpPage;

const Header = styled.header`
  width: 100%;
  height: 60px;
`;

const Prev = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: rgb(78, 89, 104);
  text-align: center;
`;

const FormContainer = styled(Flex).attrs({ direction: 'column' })`
  width: 100%;
  height: auto;
  margin-top: 80px;
  padding-right: 24px;
  padding-left: 24px;
`;

const ButtonContainer = styled.article`
  margin-top: 25px;
`;
