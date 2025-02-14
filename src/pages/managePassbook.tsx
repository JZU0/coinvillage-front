import React, { useState, useEffect } from 'react';
import {
  Root,
  TopBarContainer,
  TopBarLeftItemsContainer,
  ListContentContainer,
  GuideBox,
} from '../../styles/managePassbook';
import Button from '../components/button';
import color from '../constants/color';
import TextInput from '../components/textInput';
import Typo from '../components/typo';
import DropDown from '../components/dropDown';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil';
import { axiosInstance } from '../queries/index';

const ManagePassbook = () => {
  const [isInterestRate, setIsInterestRate] = useState<string>('0');
  const [isTax, setIsTax] = useState<string>('0');
  const [isPaymentDay, setIsPaymentDay] = useState<string>('');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [isModifyState, setIsModifyState] = useState<boolean>(false);
  const router = useRouter();
  const [loginUserState, setLoginUserState] = useRecoilState(loginState);

  useEffect(() => {
    if (
      loginUserState.isLogin == false ||
      loginUserState.userInfo.memberResponseDto.authorityDtoSet[0]
        .authorityName == 'ROLE_NATION'
    ) {
      alert('비로그인 유저 및 학생 회원은 접근 불가합니다.');
      router.push('/');
    }
  }, []);

  const putSavingsSetting = () => {
    axiosInstance
      .put('/savings/setting', {
        day: isPaymentDay,
        interest: isInterestRate,
        tax: isTax,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const getSavingsSetting = () => {
      axiosInstance
        .get('savings/setting')
        .then((response) => {
          console.log(response.data);
          setIsPaymentDay(response.data.day);
          setIsInterestRate(response.data.interest);
          setIsTax(response.data.tax);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getSavingsSetting();
  }, []);

  return (
    <Root>
      <>
        <TopBarContainer>
          <TopBarLeftItemsContainer>
            <Typo
              color={color.deep}
              fontSize={1.5}
              style={{ fontWeight: 'bold' }}
            >
              통장 관리
            </Typo>
            {isModifyState ? (
              <Button
                backgroundColor={color.white}
                color={color.kb}
                borderColor={color.kb}
                onClick={() => {
                  setIsModifyState(false);
                  putSavingsSetting();
                }}
                style={{
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  border: 'solid',
                }}
              >
                적용하기
              </Button>
            ) : (
              <Button
                backgroundColor={color.white}
                color={color.kb}
                borderColor={color.kb}
                onClick={() => {
                  setIsModifyState(true);
                }}
                style={{
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  border: 'solid',
                }}
              >
                수정하기
              </Button>
            )}
          </TopBarLeftItemsContainer>
        </TopBarContainer>
        <GuideBox>
          <Typo color={color.deep}>
            적금과 세금
            <br />
            적금이란, 돈을 저축하면 정해진 기간 후 저축한 돈과 이자를 한꺼번에
            받을 수 있는 은행 상품입니다.
            <br />
            적금에는 이자가 적용되어 기간별로 국민에게 이자가 지급됩니다.
            <br />
            세금이란, 학급 내 복지를 위해 일정한 금액을 내는 공동 경비 입니다.
          </Typo>
        </GuideBox>
        {isModifyState ? (
          <>
            <ListContentContainer>
              <Typo
                color={color.deep}
                fontSize={1.4}
                style={{ marginLeft: '15%', width: '6%', marginTop: '0.3rem' }}
              >
                이자
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ width: '13%', marginTop: '0.5rem' }}
              >
                적금 통장 잔액의
              </Typo>
              <TextInput
                placeholder=''
                value={isInterestRate}
                borderRadius={0.5}
                onChange={(e) => {
                  setIsInterestRate(e.target.value);
                }}
                height={2}
                style={{
                  width: '5%',
                  textAlign: 'center',
                }}
              />
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ marginLeft: '1%', width: '8%', marginTop: '0.5rem' }}
              >
                &nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;지급
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ marginLeft: '3%', width: '12%', marginTop: '0.5rem' }}
              >
                이자 지급 날짜
              </Typo>
              <TextInput
                placeholder=''
                value={isPaymentDay}
                borderRadius={0.5}
                onChange={(e) => {
                  setIsPaymentDay(e.target.value);
                }}
                height={2}
                disabled={inputDisabled}
                style={{
                  width: '5%',
                  textAlign: 'center',
                }}
              />
              <Typo
                color={color.system_information}
                fontSize={0.9}
                style={{ marginLeft: '3%', width: '15%', marginTop: '0.7rem' }}
              >
                *숫자 1~31 입력 가능
              </Typo>
            </ListContentContainer>
            <hr
              style={{
                border: '0',
                marginTop: '2.5%',
                marginLeft: '10%',
                width: '83%',
                height: '1.5px',
                background: 'lightgray',
              }}
            />
            <ListContentContainer>
              <Typo
                color={color.deep}
                fontSize={1.4}
                style={{ marginLeft: '15%', width: '6%', marginTop: '0.3rem' }}
              >
                세금
              </Typo>
              <TextInput
                placeholder=''
                value={isTax}
                borderRadius={0.5}
                onChange={(e) => {
                  setIsTax(e.target.value);
                }}
                height={2}
                style={{
                  width: '5%',
                  textAlign: 'center',
                }}
              />
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ marginLeft: '1%', width: '8%', marginTop: '0.5rem' }}
              >
                &nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;부과
              </Typo>
            </ListContentContainer>
          </>
        ) : (
          <>
            <ListContentContainer>
              <Typo
                color={color.deep}
                fontSize={1.4}
                style={{ marginLeft: '15%', width: '6%', marginTop: '0.3rem' }}
              >
                이자
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ width: '13.5%', marginTop: '0.5rem' }}
              >
                적금 통장 잔액의
              </Typo>
              <Typo
                color={color.black}
                fontSize={1.5}
                style={{
                  width: '5%',
                  textAlign: 'center',
                  textWeight: 'bold',
                  marginTop: '0.4%',
                }}
              >
                {isInterestRate}
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{
                  marginLeft: '1.35%',
                  width: '8%',
                  marginTop: '0.5rem',
                }}
              >
                &nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;지급
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ marginLeft: '3%', width: '12%', marginTop: '0.5rem' }}
              >
                이자 지급 날짜
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ width: '4%', marginTop: '0.5rem' }}
              >
                매 달
              </Typo>
              <Typo
                color={color.black}
                fontSize={1.5}
                style={{
                  width: '4%',
                  textAlign: 'center',
                  textWeight: 'bold',
                  marginTop: '0.4%',
                }}
              >
                {isPaymentDay}
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ width: '4%', marginTop: '0.5rem' }}
              >
                일
              </Typo>
            </ListContentContainer>
            <ListContentContainer>
              <Typo
                color={color.deep}
                fontSize={1.4}
                style={{ marginLeft: '15%', width: '6%', marginTop: '0.3rem' }}
              >
                세금
              </Typo>
              <Typo
                color={color.black}
                fontSize={1.5}
                style={{
                  width: '5%',
                  textAlign: 'center',
                  textWeight: 'bold',
                  marginTop: '0.3%',
                }}
              >
                {isTax}
              </Typo>
              <Typo
                color={color.deep}
                fontSize={1.1}
                style={{ marginLeft: '1%', width: '8%', marginTop: '0.5rem' }}
              >
                &nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;부과
              </Typo>
            </ListContentContainer>
          </>
        )}
      </>
    </Root>
  );
};

export default ManagePassbook;
