import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Root,
  LoginForm,
  LoginInput,
  LoginButton,
  SignUpWrapper,
} from '../../styles/login';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { axiosInstance } from '../queries';
import { aboutPageState, loginState } from '../recoil';
import styled from 'styled-components';

export const FullHeightRoot = styled(Root)`
  height: 100vh;
`;

const Login = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const router = useRouter();

  const [loginUserState, setLoginUserState] = useRecoilState(loginState);
  const [aboutState, setAboutState] = useRecoilState(aboutPageState);

  useEffect(() => {
    setAboutState({ isAbout: 'sign' });
  }, []);

  function onIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function onPwChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  async function onLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await axiosInstance
        .post('/members/authenticate', {
          email: id,
          password: pw,
        })
        .then((res) => {
          if (res.status == 200) {
            setLoginUserState({
              isLogin: true,
              userInfo: res.data,
            });
            axiosInstance.defaults.headers.common['Authorization'] =
              'Bearer ' + res.data.token;
            router.push('/');
          }
        });
    } catch (e) {
      alert('아이디/비밀번호가 일치하지 않습니다.');
    }
  }

  return (
    <FullHeightRoot>
      <LoginForm onSubmit={onLoginSubmit}>
        <h3>이메일</h3>
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
    </FullHeightRoot>
  );
};

export default Login;
