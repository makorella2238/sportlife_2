"use client";

import styled, { keyframes } from "styled-components";
import { useMatch, useScoreboard, useScenario } from "@/hooks";

const getShortName = (name?: string) => (name ? name.slice(0, 4) : "");

export const Little = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const { scoreboard } = useScoreboard();
  const falloff = 5; // максимальное количество фолов

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <Row>
        <TimeBlock>
          <Logo src="litillogo.png" alt="Логотип.png" />
          <Time>2</Time>
          <DriverTime/>
          <Time>26:03</Time>
        </TimeBlock>

        <TeamContainer side="left">
          <TeamBox side="left">
            <TeamName side="left">{getShortName(match?.team_1?.name)}</TeamName>
            <ScoreText side="left">{scoreboard.team_1_score}</ScoreText>
          </TeamBox>
          <LeftDecoration src="litllLeftdecorline.png" />
          <FoulsRow side="left">
            {scoreboard?.is_fouls &&
              [...Array(falloff)].map((_, i) => (
                <FoulCircle
                  key={i}
                  active={(scoreboard?.team_1_fouls ?? 0) > i}
                />
              ))}
          </FoulsRow>
        </TeamContainer>
        <Driver />

        <TeamContainer side="right">
          <TeamBox side="right">
            <ScoreText side="right">{scoreboard.team_2_score}</ScoreText>
            <TeamName side="right">
              {getShortName(match?.team_2?.name)}
            </TeamName>
          </TeamBox>
          <RightDecoration src="litllRightdecorline.png" />

          <FoulsRow side="right">
            {scoreboard?.is_fouls &&
              [...Array(falloff)].map((_, i) => (
                <FoulCircle
                  key={i}
                  active={(scoreboard?.team_2_fouls ?? 0) > i}
                />
              ))}
          </FoulsRow>
        </TeamContainer>
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
  width: 621px;
  justify-content: space-between; // 👈 добавь это
  gap: 0;
  z-index: 100;
  animation: ${slideDown} 0.5s ease forwards;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // теперь всё выравнивается слева
  width: 100%;
  height: 45px;
  position: relative;
`;

const TimeBlock = styled.div`
position: relative
;
  background: linear-gradient(90deg, #071237 0%, #000c33 42.55%, #071237 75%);
  width: 280px;
  height: 45px;
  margin-left: 55px;
  margin-bottom: 40px;
  display: flex;
  align-items: center; /* вертикальное центрирование */
  justify-content: center; /* горизонтальное центрирование */
  gap: 20px;
  padding: 0 10px;
`;

const Logo = styled.img`
  weight: 40px;
  height: 40px;
  object-fit: contain;
`;

const Time = styled.div`
  font-size: 36px;
  font-weight: 400;
  color: white;
  margin: 0;
  padding: 0;
  line-height: 1;
`;

const TeamContainer = styled.div<{ side: "left" | "right" }>`
  width: 180px;
  position: relative;
  background: linear-gradient(90deg, #071237 0%, #000c33 42.55%, #071237 75%);
  display: flex;
  flex-direction: column;
  align-items: ${({ side }) => (side === "left" ? "flex-start" : "flex-end")};
  gap: 4px;
  padding: 0
    ${({ side }) => (side === "left" ? "8px 0 0 10px" : "0 10px 0 8px")};
`;

const LeftDecoration = styled.img`
  position: absolute;
  bottom: 32px;
  left: 40px;
  height: 8px;
  width: 106px;
  object-fit: cover;
`;

const RightDecoration = styled.img`
  position: absolute;
  bottom: 32px;
  right: 40px;
  height: 8px;
  width: 106px;
  object-fit: cover;
`;

const TeamBox = styled.div<{ side: "left" | "right" }>`
  width: 155px;
  background: linear-gradient(90deg, #9e6209 0%, #e18e06 50%, #986109 100%);
  display: flex;
  align-items: center;
  justify-content: ${({ side }) =>
    side === "right" ? "flex-start" : "flex-end"};
  padding: 0 12px;
  height: 45px;
  gap: 12px;
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  font-weight: 600;
  font-family: "Furore", sans-serif;
  font-size: 32px;
  color: #fff;
  text-transform: uppercase;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto; // 👈 центрирует TeamName в родителе
  padding: ${({ side }) => (side === "left" ? "0 65px 0 0" : "0  0 0 65px")};
  z-index: 2;
`;

const ScoreText = styled.div<{ side: "left" | "right" }>`
  width: 62px;
  height: 45px;
  font-size: 47px;
  font-weight: 700;
  color: #000;
  background: #fff;
  position: absolute;
  top: 0;
  z-index: 3;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.side === "left"
      ? `
    right: 0;
    padding-right: 2px; // 👉 отступ справа
  `
      : `
    left: 0;
    padding-left: 2px; // 👉 отступ слева
  `}
`;

const FoulsRow = styled.div<{ side: "left" | "right" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-right: ${({ side }) => (side === "left" ? "0" : "20px")};
  margin-left: ${({ side }) => (side === "left" ? "20px" : "0px")};
`;

const FoulCircle = styled.div<{ active: boolean }>`
  margin-top: 6px;
  margin-bottom: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ active }) =>
    active
      ? "linear-gradient(144.95deg, #F2071A 16.18%, #860010 84.43%)"
      : "linear-gradient(146.16deg, #0E173F 16.23%, #010920 87.3%)"};

  ${({ active }) =>
    !active &&
    `
box-shadow: inset 1px 1px 4px rgba(255, 255, 255, 0.5);
    `}
`;

const Driver = styled.div`
  position: absolute;
  top: -45%;
  left: 71.5%;
  transform: translateX(-50%);
  width: 4px;
  height: 45px;
  background: #060f2d;
  z-index: 15;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 18px;
    background: #fff;
    transform: translateY(-50%);
  }
`;

const DriverTime = styled.div`
  position: absolute;
  top: 50%%;
  left: 48%;
  transform: translateX(-50%);
  width: 4px;
  height: 45px;
  background:#002368;
  z-index: 15;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 18px;
background: linear-gradient(90deg, #071237 0%, #000C33 42.55%, #071237 75%);
    transform: translateY(-50%);
  }
`;
