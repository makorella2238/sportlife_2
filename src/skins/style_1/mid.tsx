import { useMatch } from "@/hooks";
import React from "react";
import styled, { keyframes } from "styled-components";

export const Mid = ({ show }: { show: boolean }) => {
  const match = useMatch();
  return (
    <>
      <BackgroundLayer /> {/* фон всегда под всем */}
      {show && (
        <AnimatedWrapper>
          {/* Абсолютный блок с логотипами (z-index меньше чем у главного) */}
          <AbsoluteBlock>
            <LogoTop src="/midlogo1.png" alt="Логотип 1" />
            <BottomWrapper>
              <LogoBottom src="/midlogo2.png" alt="Логотип 2" />
              <LogoText>amfr.ru</LogoText>
            </BottomWrapper>
          </AbsoluteBlock>

          {/* Главный блок */}
          <MainBlock>
            <Header>
              СПОРТМАСТЕРPRO - ГОРОДСКАЯ ЛИГА. ВСЕРОССИЙСКИЙ ФИНАЛ.
            </Header>

            <TeamsRow>
              <TeameBox>
                <TeamLogo src="/comand-1.png" />
                <TeamName>{match?.team_1?.name}</TeamName>
              </TeameBox>

              <TeameBox>
                <TeamLogo src="/comand-2.png" />
                <TeamName>{match?.team_2?.name}</TeamName>
              </TeameBox>
            </TeamsRow>

            <MatchInfoRow>
              <MatchBlock>СК ТУЛГУ</MatchBlock>
              <MatchBlock>31.07.2025</MatchBlock>
              <MatchBlock>03:00</MatchBlock>
              <MatchBlock>1 тур</MatchBlock>
            </MatchInfoRow>
          </MainBlock>
        </AnimatedWrapper>
      )}
    </>
  );
};

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.85;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Фон, который всегда на месте
const BackgroundLayer = styled.div`
  position: fixed; /* или absolute, в зависимости от задачи */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(151, 155, 170);
  z-index: 0;
`;

// Анимируемый контейнер с контентом
const AnimatedWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  animation: ${slideDown} 0.6s ease-out forwards;
  z-index: 0; /* чтобы быть поверх фона */
`;

// Остальной CSS без изменений

const AbsoluteBlock = styled.div`
  position: absolute;
  top: 51%;
  left: 50%;
  transform: translate(-77%, -50%);
  width: 943px;
  height: 811px;
  z-index: 3;
  background: url("/bgabloutemid.png") no-repeat center center / cover;
`;

const LogoTop = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  max-height: 90px;
`;

const LogoBottom = styled.img`
  position: absolute;
  bottom: 30px;
  left: 20px;
  max-height: 100px;
`;

const MainBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1183px;
  height: 753px;
  background: url("/midbg.png") no-repeat center center / cover;
  box-sizing: border-box;
  z-index: 6;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(
      0,
      0,
      0,
      0.05
    ); /* 5% затемнение, т.е. фон на 95% виден */
    z-index: 1;
  }

  /* Все содержимое поверх затемнения */
  > * {
    position: relative;
    z-index: 2;
  }
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  height: 62px;
  text-align: center;
  margin: 0; /* убрали нижний margin */
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    #b97800 0%,
    #e5a01f 24.2%,
    #e29602 55.5%,
    #e5a01f 81.8%,
    #b97802 100%
  );
  color: #fff;
  line-height: 62px;
  margin-bottom: 140px;
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 50px; /* Прижать снизу с отступом */
  left: 20px; /* По левому краю, как у LogoBottom */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Чтобы текст и лого были слева */
  gap: 8px; /* Отступ между логотипом и текстом */
`;

const LogoText = styled.div`
  margin-top: 6px;
  width: 110px; /* или другая нужная ширина */
  margin: 0 auto;
  color: #204abe;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
`;

const TeamsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 168px;
  margin-top: 20px;
  z-index: 5;
`;

const TeameBox = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamName = styled.div`
  width: 100%;
  font-size: 27px;
  font-weight: 400;
  color: #fff;
  margin-top: 20px;
  padding: 0 24px;
  text-transform: uppercase;
  text-align: center;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TeamLogo = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  margin-bottom: 20px;

  animation: ${pulse} 2s infinite ease-in-out;
`;
const MatchInfoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 90px;
`;

const MatchBlock = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;
