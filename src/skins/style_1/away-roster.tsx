import { useMatch } from "@/hooks";
import React from "react";
import styled, { keyframes } from "styled-components";

export const AwayRoster = ({ show }: { show: boolean }) => {
  const match = useMatch();
  const players = match?.results_2?.slice(0, 11) || [];
  const teamName = match?.team_2?.name || "";

  // Пример данных для тренера и представителя (подставь реальные)
  const coach = match?.team_1.coaches[0] || { fio: "Иванов Иван Иванович" };
  const representative = match?.team_1.representativs[0] || {
    fio: "Петров Пётр Петрович",
  };

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <BackgroundLayer />
      <AbsoluteBlock>
        <LogoTop src="/midlogo1.png" alt="Логотип 1" />
        <BottomWrapper>
          <LogoBottom src="/midlogo2.png" alt="Логотип 2" />
          <LogoText>amfr.ru</LogoText>
        </BottomWrapper>
      </AbsoluteBlock>

      <MainBlock>
        <TeamLogo src="/comand-1.png" alt="Логотип команды" />
        <Header> {teamName} СОСТАВ</Header>

        <ContentWrapper>
          <GridWrapper>
            {players.map((player, i) => (
              <PlayerBlock key={`player-${i}`} index={i}>
                <RightInfo>
                  <NumberBlock>{player.player_number}</NumberBlock>
                  <NameBlock>{player.player_fio}</NameBlock>
                </RightInfo>
                <LeftImage src="/persost.png" />
              </PlayerBlock>
            ))}
          </GridWrapper>

          <RightColumn>
            <InfoBlock>
              <Title>Главный тренер</Title>
              <Fio>{coach.fio}</Fio>
            </InfoBlock>
            <InfoBlock>
              <Title>Представитель</Title>
              <Fio>{representative.fio}</Fio>
            </InfoBlock>
          </RightColumn>
        </ContentWrapper>
      </MainBlock>
    </Wrapper>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  position: relative;
  width: 100%;
  min-height: 95vh;
  background-color: #060f2d;
  animation: ${slideDown} 0.6s ease-out forwards;
`;

const BackgroundLayer = styled.div`
  position: fixed; /* или absolute, в зависимости от задачи */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(151, 155, 170);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  gap: 20px;
`;

const AbsoluteBlock = styled.div`
  position: absolute;
  top: 52%;
  left: 54%;
  transform: translate(-88%, -50%);
  width: 943px;
  height: 821px;
  z-index: 3;
  background: url("/bgabloutemid.png") no-repeat center center / cover;
`;

const LogoTop = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  max-height: 100px;
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
  width: 1200px;
  height: 750px;
  background: url("/midbg.png") no-repeat center center / cover;
  box-sizing: border-box;
  z-index: 6;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.05); /* 5% затемнение, т.е. фон на 95% виден */
    z-index: 1;
  }

  /* Все содержимое поверх затемнения */
  > * {
    position: relative;
    z-index: 2;
  }

clip-path: polygon(
  0% 0%,         /* top-left */
  0% 100%,       /* bottom-left */
  0% 100%,      /* center of bottom */
  100% 90%,      /* middle of right side */
  100% 0%        /* top-right */
);

);
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  width: 580px;
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

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 200px; /* Прижать снизу с отступом */
  left: 20px; /* По левому краю, как у LogoBottom */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Чтобы текст и лого были слева */
  gap: 8px; /* Отступ между логотипом и текстом */
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

const GridWrapper = styled.div`
  width: 951px;
  display: grid;
  grid-template-columns: repeat(3, 293px); /* 3 колонки фиксированной ширины */
  row-gap: 20px; /* отступы между строками */
  max-height: calc(7 * (69px + 20px)); /* высота 7 строк */
  max-width: 100%;
  padding: 0; /* убираем внешние отступы */
  z-index: 5;

  margin-bottom: 34px;
`;

const PlayerBlock = styled.div<{ index: number }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 66px;
  background: linear-gradient(90deg, #001034 0%, #00217e 51%, #000f3a 100%);
  box-sizing: border-box;
  margin-left: 0;

  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;
`;
const RightInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 12px;
  justify-content: space-between;
`;

const NumberBlock = styled.div`
  font-weight: 600;
  font-size: 22px;
  color: #fff;
  flex-shrink: 0;
`;

const NameBlock = styled.div`
  width: 209px;
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 30px;

  /* Более резкая и короткая маска */
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0.4) 75%,
    rgba(0, 0, 0, 0) 85%
  );
  mask-size: 100%;
  mask-repeat: no-repeat;

  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0.4) 75%,
    rgba(0, 0, 0, 0) 85%
  );
  -webkit-mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
`;

const LeftImage = styled.img`
  position: absolute;
  top: 0px;
  right: 00px;
  width: 50px;
  height: 66px;
  object-fit: contain;
  flex-shrink: 0;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 25px;
  width: 100%;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  user-select: none;
`;

// Блок каждого текста в правой колонке
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Заголовок (например, "Главный тренер")
const Title = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
`;

const Fio = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  padding-right: 30px; /* чтобы было место под градиент */
  }
`;

// Логотип команды в MainBlock
const TeamLogo = styled.img`
  position: absolute;
  top: 80px;
  right: 60px;
  width: 155px;
  height: 182px;
  object-fit: contain;
  z-index: 10;
`;
