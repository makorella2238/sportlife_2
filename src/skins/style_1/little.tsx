"use client";

import styled, { keyframes } from "styled-components";
import { useMatch, useScoreboard, useScenario } from "@/hooks";

const getShortName = (name?: string) => (name ? name.slice(0, 4) : "");

export const Little = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <Row>
        <TeamBox side="left">
          <InnerBox side="left">
            <TeamLogo side="left" src='/comand-1.png' />
            <TeamName side="left">{"МЕХ"}</TeamName>
          </InnerBox>
        </TeamBox>

        <ScoreBox>
          <TimerText>1T {"26:03"}</TimerText>

          <MainScore>
            <ScoreValue>{scoreboard?.team_1_score}</ScoreValue>
            <ScoreValue>–</ScoreValue>
            <ScoreValue>{scoreboard?.team_2_score}</ScoreValue>
          </MainScore>

          {scoreboard.is_fouls && (
            <FoulsRowNew>
              <FoulNumber>{scoreboard?.team_1_fouls ?? 0}</FoulNumber>
              <FoulText>ФОЛЫ</FoulText>
              <FoulNumber>{scoreboard?.team_2_fouls ?? 0}</FoulNumber>
            </FoulsRowNew>
          )}
        </ScoreBox>

        <TeamBox side="right">
          <InnerBox side="right">
            <TeamLogo side="right" src='/comand-2.png' alt='comand-2.png' />
            <TeamName side="right">{"ФЕЛ"}</TeamName>
          </InnerBox>
        </TeamBox>
      </Row>
    </Wrapper>
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

const Wrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 62px;
  width: 536px; /* фиксированная ширина */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 100;
  overflow: visible;
  animation: ${slideDown} 0.5s ease forwards;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  background: ${({ side }) =>
    side === "left"
      ? "linear-gradient(to left, #27C87E, #015963)"
      : "linear-gradient(to right, #27C87E, #015963)"};
  border-radius: ${({ side }) =>
    side === "right" ? " 0 10px 10px 0" : "10px 0 0 10px"};
  display: flex;
  align-items: center;
  padding: ${({ side }) => (side === "right" ? "0 10px 0 0" : "0 0 0 10px")};
  justify-content: ${({ side }) =>
    side === "left" ? "flex-start" : "flex-end"};
  height: 41px;
  width: 100%;
  position: relative;
  padding: 0 12px;
  box-sizing: border-box;
  gap: 20px;
`;

const InnerBox = styled.div<{ side: "left" | "right" }>`
  display: flex;
  flex-direction: ${({ side }) => (side === "right" ? "row-reverse" : "row")};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const ScoreBox = styled.div`
  height: 41px;
  position: relative;
  margin-top: 4px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FoulNumber = styled.div`
  color: #fff;
  font-weight: 400;
`;
const MainScore = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: #fff;
  height: 41px;
  width: 99px;
  margin: 22px 0 26px 0; /* сдвиг на 2px вверх */
`;

const ScoreValue = styled.div`
  font-size: 37px; // было 39px
  width: 25px; // было 50px
  text-align: center;
  font-weight: 700;
  color: white;
  color: #002b45;
`;

const TimerText = styled.div`
  position: absolute;
  bottom: 43px;
  left: 50%;
  transform: translateX(-50%);
  background: #015963;
  width: 143px;
  height: 24px;
  font-size: 18px;
  font-weight: 400;
  padding-bottom: 3px;
  color: #fff;
  text-align: center;
  border-radius: 12px 12px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FoulsRowNew = styled.div`
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 143px;
  height: 24px;
  background: #015963;
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0 8px 1px 8px;
  box-sizing: border-box;
`;

const Row = styled.div`
  height: 56px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 10;
  overflow: visible;
`;
const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  left: ${({ side }) => (side === "right" ? "200px" : "2px")};
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  font-family: "Furore", sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 0%;
  text-transform: uppercase;
  color: #fff;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  z-index: 1;

  text-align: ${({ side }) => (side === "left" ? "right" : "left")};
  padding: ${({ side }) => (side === "left" ? "0 24px 0 0" : "0 0 0 24px")};

  flex: 1;
`;

const FoulText = styled.div`
  font-size: 16px; // было 20px
  padding: 0 8px;
  height: auto;
  font-weight: 400;
  text-transform: uppercase;
  color: #fff;
`;
