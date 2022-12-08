import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from '../components/layout';
import {
  Button,
  TextField,
  Flex,
} from '../components/common';
import { getValidationUser } from '../../lib/utils';
import {
  UserParam,
  UserValidation,
} from '../../lib/types/user.interface';
import authRest from '../../lib/api/authRest';
import { setAccessToken } from '../../lib/utils/accessTokenStore';
import { PATH } from '../../lib/const/path';

const SignInPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<UserParam, 'passwordCheck'>>({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState<Omit<UserValidation, 'passwordCheck'>>({
    email: false,
    password: false,
  });

  const isUserValidation = useMemo(() => !(validation.email && validation.password), [validation.email, validation.password]);

  const onChangeUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexp = getValidationUser(name as keyof Omit<UserParam, 'passwordCheck'>, value);

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidation((prev) => ({
      ...prev,
      [name]: regexp,
    }));
  }, []);

  const onClickSignIn = useCallback(async () => {
    try {
      const response = await authRest.postSignIn(user);
      const { access_token } = response.data;
      setAccessToken(access_token);
      alert('로그인 되었습니다.');
      navigate(PATH.TODO, { replace: true });
    } catch (e: any) {
      const errorMessage = e.response?.data?.message ?? '로그인에 실패했습니다.';
      alert(errorMessage);
    }
  }, [user]);

  const handleClickSignUp = useCallback(() => {
    navigate(PATH.SIGN_UP);
  }, []);

  const onPressEnter = useCallback(async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isUserValidation) {
      await onClickSignIn();
    }
  }, [isUserValidation]);

  return (
    <Layout>
      <Heading>로그인</Heading>
      <FormContainer>
        <TextField
          label="이메일"
          id="email"
          type="email"
          value={user.email}
          onChange={onChangeUser}
          autoFocus
        />
        <TextField
          label="비밀번호"
          id="password"
          type="password"
          value={user.password}
          onChange={onChangeUser}
          onKeyDown={onPressEnter}
        />
        <ButtonContainer>
          <Button
            color="primary"
            disabled={isUserValidation}
            onClick={onClickSignIn}
            style={{ width: '100%' }}
          >
            로그인
          </Button>
        </ButtonContainer>
        <SignUpContainer>
          <span>회원이 아니신가요?</span>
          <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
        </SignUpContainer>
      </FormContainer>
    </Layout>
  );
};

export default SignInPage;

const Heading = styled.h2`
  font-size: 24px;
  color: rgb(78, 89, 104);
  margin: 80px 0 0;
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
  margin-top: 32px;
`;

const SignUpContainer = styled.div`
  text-align: center;
  color: black;
  font-size: 14px;
`;

const SignUpButton = styled.button`
  border: none;
  background-color: #fff;
  margin-top: 60px;
  color: #4e61ff !important;
  cursor: pointer !important;
  text-decoration: underline;
  text-underline-position: under;
`;
