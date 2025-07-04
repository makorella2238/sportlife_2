"use client";

import styled, { keyframes } from "styled-components";
import { useMatch } from "@/hooks";
import { projectShutdown } from "next/dist/build/swc/generated-native";
export const HomeRoster = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const players = match?.results_1?.slice(0, 18) || [];
  const teamName = match?.team_1?.name || "";

  return (
    <Container style={{ display: show ? "flex" : "none" }}>
      <Wrapper>
        <BackgroundImage />
        <Mach1left src="/sostleftmych.png" />
        <Mach2Right src="/sostrightmych.png" />
        <Header>
          <TitleContainer>
            <TitleLine>{teamName}</TitleLine>
          </TitleContainer>
          <TeamsContainer>
            <TourText>СОСТАВ</TourText>
          </TeamsContainer>
        </Header>

        <Row>
          <GridWrapper>
            {players.map((player, i) => (
              <PlayerBlock key={i}>
                <NumberBox>{player.player_number}</NumberBox>
                <NameBlock>{player.player_fio}</NameBlock>
                <RightImage src="/sostpers.png" />
              </PlayerBlock>
            ))}
          </GridWrapper>
        </Row>

        <Trener>
          <TrenerBlock>
            <TrName>{match?.team_1?.coaches[0].fio}</TrName>
            <RightImage src="/sostpers.png" />
            <Dolzhost>ТРЕНЕР</Dolzhost>
          </TrenerBlock>
          <TrenerBlock>
            <TrName>{match?.team_1?.representativs[0].fio}</TrName>
            <RightImage src="/sostpers.png" />

            <Dolzhost>представитель</Dolzhost>
          </TrenerBlock>
        </Trener>
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
  text-color: #fff;
  width: 1720px;
  height: 820px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: url("/sostbg.png") no-repeat center center / cover;
  background-size: 200% 200%;
  animation: ${animatedGradient} 20s linear infinite;
  z-index: 4; /* Убедись, что ниже, чем всё остальное */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const TitleContainer = styled.div`
  position: relative;
  width: 756px;
  padding: 38px 35px;
  border-radius: 0 0 24px 24px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;
  position: relative;
  clip-path: polygon(10% 100%, 90% 100%, 100% 0, 0 0);
`;

const TitleLine = styled.div`
  font-weight: 400;
  font-size: 56px;
  line-height: 70px;
  letter-spacing: -2%;
  text-align: center;
  color: #090E5D;
  text-transform: uppercase;
`;

const TourText = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 37px;
  font-weight: 400;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
`;

const Trener = styled.div`
  margin: 0 120px;
  display: flex;
  gap: 20px; /* исправлено */
  margin-top: 30px;
  margin-bottom: 32px;
  justify-content: center; /* Центрирование */
  z-index: 9999;
  position: relative;
`;

const TeamsContainer = styled.div`
  width: 388px;
  height: 49px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
  z-index: 5;
  clip-path: polygon(10% 100%, 90% 100%, 100% 0, 0 0);
  background: #015963;
  position: relative;
  **margin-top: -5px;**
`;


const Wrapper = styled.div`
  position: relative;
  background-size: 400% 400%;
  width: 1642px;
  height: 996px;
  overflow: hidden;
  animation: ${slideDown} 0.5s ease forwards;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 20px;
  z-index: 133;
`;

const PlayerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 480px;
  height: 79px;
  overflow: hidden;
  position: relative;
  background: #000;
`;

const TrenerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 421px;
  height: 79px;
  overflow: hidden;
  position: relative;
  background: #015963;
`;

const NumberBox = styled.div`
  width: 79px;
  height: 79px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  color: white;
  background: #015963;
  flex-shrink: 0;
`;

const Row = styled.div`
  margin-top: 29px;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 133;
`;

const NameBlock = styled.div`
  background: #000;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  padding: 0 12px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightImage = styled.img`
  width: 71px;
  height: 79px;
  object-fit: cover;
  flex-shrink: 0;
`;

const Mach1left = styled.img`
  position: absolute;
  top: -25px;
  left: -10px;
  width: 260px;
  height: 260px;
  z-index: 10;
`;

const Mach2Right = styled.img`
  position: absolute;
  bottom: 100px;
  right: -21px;
  width: 260px;
  height: 260px;
  z-index: 10;
`;

const TrName = styled.div`
  background: #015963;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  padding: 0 12px;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dolzhost = styled.div`
position: absolute;
bottom: -30px;
right: 50%;
transform: translateX(50%);
  font-weight: 900;
  font-size: 20px;
  color: #fff;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
