import React from "react";
import styled from "styled-components";

export const Mid = ({ show }: { show: boolean }) => {
  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      {/* Серый фон-бэкграунд под всем */}
      <BackgroundLayer />
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
        <Header>СПОРТМАСТЕРPRO - ГОРОДСКАЯ ЛИГА. ВСЕРОССИЙСКИЙ ФИНАЛ.</Header>

        <LogosContainer>
          <ImageTeam src="/comand-1.png" alt="Газпром-Югра" />
          <ImageTeam src="/comand-2.png" alt="Торпедо" />
        </LogosContainer>

        <MatchEnded>МАТЧ ОКОНЧЕН</MatchEnded>

        <TeamsRow>
          <Driver />
          <TeamBox side="left">
            <TeamName side="left">ГАЗПРОМ-ЮГРА</TeamName>
            <Score side="left">5</Score>
          </TeamBox>

          <TeamBox side="right">
            <Score side="right">2</Score>
            <TeamName side="right">ТОРПЕДО</TeamName>
          </TeamBox>
        </TeamsRow>

        <SeriesScore>СЧЕТ В СЕРИИ 2-0</SeriesScore>
      </MainBlock>
    </Wrapper>
  );
};

// Стилизация
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #060f2d;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(151, 155, 170);
  z-index: 0;
`;

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
  max-height: 80px;
`;

const LogoBottom = styled.img`
  position: absolute;
  bottom: 30px;
  left: 20px;
  max-height: 80px;
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
  margin-bottom: 100px;
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto 20px; /* сверху и снизу 0 и 20px, по бокам auto для центрирования */
  width: 820px;
`;

const MatchEnded = styled.div`
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: #fff;
`;

const TeamsRow = styled.div`
  position: relative;
  width: 727px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0;
  height: 56px;
  box-sizing: border-box;
  background: linear-gradient(90deg, #001034 0%, #00217e 51%, #000f3a 100%);
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  width: 560px;
  height: 56px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    #b97800 0%,
    #e5a01f 24.2%,
    #e29602 55.5%,
    #e5a01f 81.8%,
    #b97802 100%
  );
  z-index: 10;
  overflow: visible;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  max-width: calc(100% - 80px);
  text-align: center;
  user-select: none;

  ${(props) =>
    props.side === "left" ? "padding-right: 75px;" : "padding-left: 85px;"}
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 50px;   /* Прижать снизу с отступом */
  left: 20px;     /* По левому краю, как у LogoBottom */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Чтобы текст и лого были слева */
  gap: 8px; /* Отступ между логотипом и текстом */
`;


const ImageTeam = styled.img`
  weight: 215px;
  height: 249px;
`;

const Score = styled.div<{ side: "left" | "right" }>`
  width: 80px;
  height: 56px;
  font-size: 47px;
  font-weight: 700;
  text-align: center;
  line-height: 56px;
  background: #fff;
  color: #000;
  position: absolute;
  top: 0;
  ${(props) => (props.side === "left" ? "right: 0;" : "left: 0;")}
  user-select: none;
`;

const SeriesScore = styled.div`
  color: #fff;
  text-align: center;
  font-size: 28px;
  margin-top: 20px;
  font-weight: semibold;
  text-transform: uppercase;
`;

const LogoText = styled.div`
    margin-top: 6px;
  width: 100px; /* или другая нужная ширина */
  margin: 0 auto;
  color: #204abe;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
`;


const Driver = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 56px;
  background: #060f2d;
  z-index: 15;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 22px;
    background: #fff;
    transform: translateY(-50%);
    box-shadow: none;
    border: none;
    box-sizing: border-box;
  }
`;
