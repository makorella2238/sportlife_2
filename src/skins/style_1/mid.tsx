"use client";

import { useMatch } from "@/hooks";
import { RefObject, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export const Mid = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const titleWords = match?.tournament?.full_name;

  const titleRef = useRef<HTMLDivElement>(null);
  const [isTwoLines, setIsTwoLines] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    const checkHeight = () => {
      const height = titleRef.current!.offsetHeight;
      setIsTwoLines(height > 75); // 75 — на случай чуть большего line-height
    };

    checkHeight();

    // На всякий случай — если шрифт/размеры могут поменяться
    const resizeObserver = new ResizeObserver(checkHeight);
    resizeObserver.observe(titleRef.current);

    return () => resizeObserver.disconnect();
  }, [titleWords]);

  return (
    <Container>
      <Wrapper style={{ display: show ? "flex" : "none" }}>
        <BackgroundImage />
        <TitleContainer>
          <TitleLine ref={titleRef}>{titleWords}</TitleLine>
        </TitleContainer>

        <TeamsContainer>
          <TourText side="left">{match?.stadium?.name}</TourText>
          <TourText side="right">1 тур</TourText>
        </TeamsContainer>

        <TeamsRow $isTwoLines={isTwoLines}>
          <TeameBox color={match?.team_1?.color}>
            <TeamLogo src='/comand-1.png' />
            <TeamName side="left">{match?.team_1?.name}</TeamName>
          </TeameBox>


          <CenterBox>
            <CenterImage src="/VS.png" alt="center image" />
            <TeamNameForData side="top">
              {/* дата отсюда */}31.07.2025
            </TeamNameForData>
            <TeamNameForData side="bottom">
              {/* время отсюда */}03:00
            </TeamNameForData>
          </CenterBox>

          <TeameBox color={match?.team_2?.color}>
            <TeamLogo src='/comand-2.png' />
            <TeamName side="right">{match?.team_2?.name}</TeamName>
          </TeameBox>
        </TeamsRow>

        <MidMych src="/mych.png" alt="mych" />
      </Wrapper>
    </Container>
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



const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;

  width: 1280px;
  height: 730px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(-45deg, #0e173f, #001b94, #0e173f);

  animation: ${slideDown} 0.5s ease forwards;

  padding-bottom: 20px;
  z-index: 2;
`;

const animatedGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/bgmid.png") no-repeat center center / cover;
  background-size: 200% 200%;
  animation: ${animatedGradient} 20s linear infinite;
  z-index: 4;
`;

const TitleContainer = styled.div`
  padding: 20px 0; /* вместо фиксированной высоты */
  background: white;
  clip-path: polygon(10% 100%, 90% 100%, 100% 0, 0 0);
  z-index: 5;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const TitleLine = styled.div`
  color: #015963;
  font-weight: 400;
  font-size: 52px;
  line-height: 70px;
  letter-spacing: -2%;
  text-align: center;
  text-transform: uppercase;
  z-index: 10;
  padding: 10px 20px;
`;

const TeamsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
  gap: 0; /* трапеции будут вплотную */
`;


const TourText = styled.div<{ side: "left" | "right" }>`
  width: 315px;
  height: 49px;
  background: ${({ side }) => (side === "left" ? "#141414" : "#015963")};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);

  clip-path: ${({ side }) =>
    side === "right"
      ? "polygon(0 100%, 100% 100%, 90% 0, 10% 0)" // перевернутая трапеция
      : "polygon(10% 100%, 90% 100%, 100% 0, 0 0)"}; // обычная трапеция
   ${({ side }) => side === "right" && "margin-left: -30px;"}
      `;


const TeamsRow = styled.div<{ $isTwoLines: boolean }>`
  margin-top: ${({ $isTwoLines }) => ($isTwoLines ? "40px" : "30px")};
  display: flex;
  font-weight: 400;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* для равного распределения */
  width: 1100px; /* важно для правильной центровки */
  padding: 0 60px;
  z-index: 5;
`;

const CenterBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 250px;
  max-width: 300px;
  flex-shrink: 0;
`;

const CenterImage = styled.img`
  width: 175px; // подбери нужный размер
  height: 109px;
  object-fit: contain;
`;

const TeameBox = styled.div<{ color?: string }>`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; /* чтобы занимали одинаковое пространство */
  max-width: 350px; /* можно ограничить ширину */
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  width: 100%;
  font-size: 35px;
  color: #fff;
  padding: 0 24px;
  text-transform: uppercase;
  text-align: center;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  weiht: 500px;

background: ${({ side }) =>
  side === "left"
    ? "linear-gradient(90deg, #084d5585 0%, rgba(83, 155, 247, 0) 100%)"
    : "linear-gradient(90deg, rgba(83, 155, 247, 0) 0%, #084d5585 100%)"};

  border-radius: 0 0 140px 140px;

  padding: 10px 30px;

  white-space: nowrap; // ⬅️ Не даёт переносить строки
  overflow: hidden; // ⬅️ Обрезает текст, если он не вмещается
`;

const TeamNameForData = styled.div<{ side: "top" | "bottom" }>`
  width: 224px;
  font-size: 37px;
  color: #fff;
  padding: 0 24px;
  text-transform: uppercase;
  text-align: center;
  max-width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  margin-top: ${({ side }) => (side === "top" ? "30px" : "12px")};
`;

const TeamLogo = styled.img`
  width: 263px;
  height: 263px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const MidMych = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  width:260px; // подбери нужный размер
  height: auto;
`;
