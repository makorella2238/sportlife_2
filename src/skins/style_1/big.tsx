"use client";

import { useMatch, useScoreboard, useScenario } from "@/hooks";
import styled, { keyframes } from "styled-components";

export const Big = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();
  const scenario = useScenario();

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>

      <ScenarioContainer>
        <ScenarioGradientLeft />
        <ScenarioGradientRight />
      </ScenarioContainer>

      <Row>
        <TeamLogo side="left" src='/comand-1.png' />

        <TeamBox side="left" color={match?.team_1?.color}>
          <TeamName side="left">{match?.team_1?.name}</TeamName>
        </TeamBox>

        <ScoreBox>
          <ScoreText>
            {scoreboard?.team_1_score} - {scoreboard?.team_2_score}
          </ScoreText>
        </ScoreBox>

        <TeamBox side="right" color={match?.team_2?.color}>
          <TeamName side="right">{match?.team_2?.name}</TeamName>
        </TeamBox>
      </Row>

      <TeamLogo side="right" src='/comand-2.png' />

      <ScenarioContainerStart>
        <ScenarioText>{scenario}</ScenarioText>
      </ScenarioContainerStart>
    </Wrapper>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const SlideUpDiv = styled.div`
  animation: ${slideUp} 0.5s ease forwards;
`;


const Wrapper = styled.div`
  position: absolute;
  bottom: 90px;
  left: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  font-family: "Furore", sans-serif;
  z-index: 100;
  animation: ${slideUp} 0.5s ease forwards;
`;

const Row = styled.div`
  width: 1420px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  gap: 0;
  height: 105px;
  border-radius: 24px;
  background: linear-gradient(90.04deg, #015963 0.38%, #27C87E 49.95%, #015963 99.97%);
  box-sizing: border-box;

  border-bottom: 8px solid #0A3C64;
`;


const TeamBox = styled.div<{ side: "left" | "right"; color?: string }>`
  width: 560px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;  /* по центру по вертикали */
  height: 90px;
  ${(props) =>
    props.side === "left"
      ? "transform: translateX(32px);"
      : "transform: translateX(-8px);"}

  z-index: 10;
  overflow: visible;
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  width: 238px;
  height: 238px;
  object-fit: contain;
  left: ${(props) => (props.side === "left" ? "-80px" : "auto")};
  right: ${(props) => (props.side === "right" ? "-50px" : "auto")};
  top: ${(props) => (props.side === "right" ? "90px" : "60px")};
  transform: translateY(-50%);
  z-index: 20;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  width: calc(100% - 70px);
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 46px;
  line-height: 48px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;

  text-align: ${(props) => (props.side === "left" ? "right" : "left")};

  padding-left: ${(props) => (props.side === "left" ? "40px" : "40px")};
  margin-right: ${(props) => (props.side === "right" ? "60px" : "30px")};

  position: relative;
  mask-image: linear-gradient(to right, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 90%, transparent 100%);
  z-index: 1;
`;

const ScenarioContainer = styled.div`
  position: relative;
  width: 820px;
  height: 43px;
  margin: 0 auto;
  display: flex;
  top: 60px; /* убираем top, если не нужно */
  left: auto;
  z-index: 0;
`;

const ScenarioGradientLeft = styled.div`
  width: 50%;
  height: 100%;
  clip-path: polygon(8px 0, 100% 0, 100% 100%, 0% 100%);
  background: linear-gradient(90deg, #00a954 0%, #095102 51.98%, #00a954 100%);
  position: relative;
  z-index: 1;
`;

const ScenarioGradientRight = styled.div`
  width: 50%; // правая половина
  height: 100%;
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0% 100%);
  background: red;
  position: relative;
  z-index: 2;
`;

const ScoreBox = styled.div`
  position: relative;
  background: linear-gradient(90.04deg, #015963 0.38%, #27C87E 49.95%, #015963 99.97%);
  border-left: 5px solid white;
  border-right: 5px solid white;
  border-bottom: 5px solid white;
  border-radius: 0 0 10px 10px;
  color: #fff;
  font-weight: 400;
  padding: 0 5px;
  height: 83px;
  display: flex;
  align-items: flex-start; /* прижимаем текст к верхнему краю */
  justify-content: center;
  width: 201px;
  z-index: 1;
  margin-bottom: 8px;
`;


const ScoreText = styled.div`
padding-top: 6px;
  width: 100%;
  font-size: 64px;
  font-weight: 700;
  text-align: center;
  line-height: 1;
`;

const ScenarioContainerStart = styled.div`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  width: 282px;
  height: 75px;
  border-radius: 44px 44px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  overflow: hidden;

  background: #015963;
`;


// Скорректируем ScenarioText, чтобы занял всё пространство
const ScenarioText = styled.div`
  flex: 1;
  font-family: "Furore", sans-serif;
  font-size: 24px;
  font-weight: 4  00;
  color: #fff;
  padding: 0 20px;
  line-height: 1;
  white-space: nowrap;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScenarioSlashLeft = styled.div`
  width: 0; // убираем ширину, т.к. срезы есть в clip-path
`;

const ScenarioSlashRight = styled.div`
  width: 0; // то же самое
`;
