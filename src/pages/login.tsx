import React from 'react';
import styled from 'styled-components';
import color from '../constants/color';
import Link from 'next/link';
import deviceSize from '../constants/deviceSize';
import { useState } from 'react';

const Root = styled.section`
  width: 100%;
  height: calc(100vh - 5.25rem);
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 0;
  }
`;

const LoginForm = styled.form`
  box-sizing: border-box;
  width: 27rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border-radius: 1.5rem;
  background-color: white;
  padding: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media screen and (min-width: ${deviceSize.tablet}) {
    padding-left: 3rem;
    padding-right: 3rem;
    width: 40rem;
    height: 35rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  }
`;

const LoginInput = styled.input`
  border: none;
  border-bottom: 1px solid ${color.light_gray};
  width: 100%;
  height: 1.5rem;
  outline: none;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 0.4rem;

  &::placeholder {
    color: ${color.light_gray};
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border-radius: 1rem;
  background-color: ${color.kb};
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  margin-bottom: 1rem;
`;

const SignUpWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  font-color: ${color.light_gray};

  span {
    font-size: 0.94rem;
    margin-right: 0.3rem;
    color: ${color.warm_gray1};

    @media screen and (min-width: ${deviceSize.mobile}) {
      font-size: 1rem;
    }
  }

  a {
    font-size: 0.94rem;
    color: ${color.warm_gray1};
    text-decoration: underline;

    @media screen and (min-width: ${deviceSize.mobile}) {
      font-size: 1rem;
    }
  }
`;

const Login = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  function onIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function onPwChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function onLoginSubmit() {}

  return (
    <Root>
      <LoginForm>
        <h3>아이디</h3>
        <LoginInput placeholder='이메일을 입력해주세요' onChange={onIdChange} />
        <h3>비밀번호</h3>
        <LoginInput
          type='password'
          placeholder='비밀번호를 입력해주세요'
          onChange={onPwChange}
        />
        <LoginButton>로그인</LoginButton>
        <SignUpWrapper>
          <span>아직 회원이 아니신가요?</span>
          <Link href='/signup'>회원가입하기</Link>
        </SignUpWrapper>
      </LoginForm>
    </Root>
  );
};

export default Login;
