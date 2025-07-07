"use client";

import { useMatch, useScoreboard, useScenario } from "@/hooks";
import styled, { keyframes } from "styled-components";

export const Big = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();
  const scenario = useScenario();
  const team_1 = 'ГАЗПРОМ-ЮГРА'
  const team_2 = 'торпедо'

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <ScenarioContainer>
        <ScenarioGradientLeft />
        <ScenarioGradientRight />
      </ScenarioContainer>

      <Row>
          <TeamLogo side="left" src="/comand-1.png" />
          <Driver/>
        <RowTeams>

          <TeamBox side="left">
            <TeamName side="left">{team_1}</TeamName>
            <ScoreText side="left">{scoreboard?.team_1_score}</ScoreText>
          </TeamBox>

          <TeamBox side="right">
            <ScoreText side="right">{scoreboard?.team_2_score}</ScoreText>
            <TeamName side="right">{team_2}</TeamName>
          </TeamBox>
        </RowTeams>

        <Text>ПОСЛЕ ПЕРВОГО ТАЙМА</Text>
      </Row>

      <TeamLogo side="right" src="/comand-2.png" />
      {/* 
      <ScenarioContainerStart>
        <ScenarioText>{scenario}</ScenarioText>
      </ScenarioContainerStart> */}
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
  right: 23%;
  transform: translateX(-50%);
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
  width: 1020px; /* уменьшено с 1420 */
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  gap: 0;
  height: 105px;
  background: linear-gradient(90deg, #000924 0%, #051a64 52.1%, #000924 100%);

  box-sizing: border-box;
`;

const RowTeams = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(50%);
  width: 1060px;
  display: flex;
  justify-content: center; /* по горизонтали центр */
  align-items: flex-start; /* прижать к верхнему краю */
  gap: 0;
  height: 56px; /* высота строки */
`;

const TeamBox = styled.div<{ side: "left" | "right"; color?: string }>`
  width: 360px;
  height: 56px; /* фиксируем высоту */
  position: relative;
  display: flex;
  align-items: center; /* центр по вертикали */
  justify-content: center; /* центрируем название по горизонтали */
background: linear-gradient(90deg, #B97800 0%, #E5A01F 24.2%, #E29602 55.5%, #E5A01F 81.8%, #B97802 100%);

  background: 
  z-index: 10;
  overflow: visible;
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  width: 160px; /* увеличено с 100px */
  height: auto;
  object-fit: contain;

  /* смещение для перекрытия */
  left: ${(props) => (props.side === "left" ? "-80px" : "auto")};
  right: ${(props) => (props.side === "right" ? "-80px" : "auto")};

  top: ${(props) => (props.side === "right" ? "75px" : "50px")}; /* немного выше */
  transform: translateY(-50%);
  z-index: 25;
`;


// Обёртка для названия команды, по центру блока
const TeamName = styled.div<{ side: "left" | "right" }>`
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 28px; /* подкорректировал для блока меньшей высоты */
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  max-width: calc(100% - 180px); /* оставляем место под счетчик */

  padding: ${(props) => (props.side === "left" ? "0 115px 0 0" : "0 0 0 80px")};
  text-align: center;
  user-select: none;
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

// Счётчик, фиксированный размер, прижат к нужному краю
const ScoreText = styled.div<{ side: "left" | "right" }>`
  width: 80px;
  height: 56px;
  font-size: 47px;
  font-weight: 700;
  text-align: center;
  line-height: 56px; /* вертикальное центрирование */
  background: #fff;
  color: #000;
  position: absolute;
  top: 0;

  /* прижатие по горизонтали */
  ${(props) =>
    props.side === "left"
      ? "right: 0;" // у левой команды — счётчик справа
      : "left: 0;"} // у правой команды — счётчик слева

  user-select: none;
  justify-content: space-between;
`;
const Text = styled.div`
  position: absolute;
  bottom: 13px;
  right: 50%;
  transform: translateX(50%);
  width: 100%;
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 1;
`;

const Driver = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 56px;
  background: #060f2d;
  border-radius: 2px;
  z-index: 15;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 22px;
    background: #fff;
    border-radius: 1px;
    transform: translateY(-50%);
  }
`;
