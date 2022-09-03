import React from 'react';
import styled from 'styled-components';
import color from '../constants/color';
import Link from 'next/link';
import deviceSize from '../constants/deviceSize';

const LogoImg = styled.img`
  cursor: pointer;
`;

const Root = styled.header`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.25rem;
  padding: 0.75rem 0rem;

  button {
    width: 10rem;
    height: 3rem;
    border: none;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    background-color: ${color.light_gray};

    &:hover {
      background-color: ${color.light_gray3};
    }
  }
`;

const LoginBtnWrapper = styled.div`
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: bold;
  width: auto;
  height: auto;

  a:visited {
    text-decoration: none;
    color: black;
  }
  a:link {
    text-decoration: none;
    color: black;
  }
`;

const PCLoginButton = styled.button`
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: none;

  @media screen and (min-width: ${deviceSize.tablet}) {
    display: flex;
  }
`;

const MobileLoginButton = styled.button`
  border: none;
  cursor: pointer;
  text-decoration: none;

  @media screen and (min-width: ${deviceSize.tablet}) {
    display: none;
  }
`;

const Header: React.FC = () => {
  return (
    <Root>
      <Link href='/'>
        <LogoImg src='/logo.svg' />
      </Link>
      <Link href='/login'>
        <LoginBtnWrapper>
          <PCLoginButton>로그인/회원가입</PCLoginButton>
          <MobileLoginButton>로그인</MobileLoginButton>
        </LoginBtnWrapper>
      </Link>
    </Root>
  );
};

export default Header;
