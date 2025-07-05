import { useMatch } from "@/hooks";
import styled, { keyframes } from "styled-components";


export const Person = ({ kind, show }: { kind: "red" | "yellow" | "goal" | "coach" | "judge"; show: boolean }) => {
  const match = useMatch();

  const renderCards = () => {
    if (kind === "red") {
      return (
        <CardGroup side="red">
          <Card src="/redCard.png" alt="Red Card" />
        </CardGroup>
      );
    }
    if (kind === "yellow" || kind === "goal") {
      return (
        <CardGroup side="yellow">
          <Card src={"/yellowCard.png"} alt={`${kind} Card`} />
        </CardGroup>
      );
    }
    return null;
  };

  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
            <BackgroundLayer />
      <TeamBoxWrapper>
        {kind === "goal" && <PersImage src="/persImg.png" alt="Player" />}
        {renderCards()}
        <TeamBox side="left" kind={kind}>
          <Col>
            <Row>
              <TeamName side="right">ДМИТРИЙ ПОКРОВСКИЙ</TeamName>
              <TeamName side="right">28</TeamName>
            </Row>
            <TeamNameLit side="right">{match?.team_1?.name}</TeamNameLit>
          </Col>
          <Deckor src="bibRightDekor.png"  alt="Deckor"/>
        </TeamBox>
        <TeamLogo side="right" src="/comand-1.png" />
      </TeamBoxWrapper>
    </Wrapper>
  );
};


const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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

const Row = styled.div`
  position: absolute;
  top: -15px;
  right: -50px;
  display: flex;
  gap: 16px;
   width: 510px;
   padding: 6px 12px;
   z-index: 10;
  background: linear-gradient(90deg, #B97800 0%, #E29602 55.5%, #B97802 100%);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const CardGroup = styled.div<{ side: "yellow" | "red" }>`
  position: absolute;
  left: ${(props) => (props.side === "red" ? "-20px;" : "-20px")}; 
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 5;
`;

const Card = styled.img`
  width: 40px;
  height: 60px;
  object-fit: contain;
`;


const TeamBoxWrapper = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 650px; // ← Исправлено
  display: flex;
  align-items: flex-start;
  animation: ${slideInFromRight} 0.6s ease-out forwards;
  z-index: 10;
  background: transparent;
`;

// const YellowBarLeft = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0px;
//   width: 22px;
//   border-radius: 12px 0 0 12px;
//   height: 100%;
//   background: #ffc70f;

//   z-index: 3;
// `;

const PersImage = styled.img`
  position: absolute;
  top: -145px;
  right: 65px;
  width: 126px;
  height: 130px;
  object-fit: cover;
  z-index: 2;
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  top: -20px;
  right: -90px;
  height: 120px;
  width: 127px;
  object-fit: contain;
  margin-left: 20px;
  z-index: 3;
  align-self: center;
`;

const Deckor = styled.img`
  position: absolute;
  top: 88px;
  right: 40px;
  height: 19px;
  width: 226px;
  object-fit: contain;
  margin-left: 20px;
  z-index: 3;
  align-self: center;
`;
const TeamBox = styled.div<{ side: "left" | "right"; kind?: "red" | "yellow" | "goal" | "coach" | "judge" }>`
  width: 650px;
  background: #141414;
  position: relative;
  height: 90px;
  background: linear-gradient(90deg, #001034 0%, #00217e 51%, #000f3a 100%);
  align-items: center;
`;


const Col = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-right: 100px;
  align-items: flex-end;
  position: relative; // добавлено
  height: 100%;        // важно, чтобы позиционировать потомков
`;

const TeamName = styled.div<{ side: "left" | "right" }>`
  height: 40px;
  display: flex;
 
  align-items: center;
  font-family: "Furore", sans-serif;
  font-size: 35px;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  z-index: 1;
`;

const TeamNameLit = styled.div<{ side: "left" | "right" }>`
  position: absolute; // добавлено
  bottom: 6px;          // прижимаем вниз
  height: 40px;
  display: flex;
  align-items: center;
  font-family: "Furore", sans-serif;
  font-size: 24px;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;

  ${({ side }) =>
    side === "left"
      ? `
        padding-left: 40px;
        justify-content: flex-end;
      `
      : `
        padding-right: 15px;
        justify-content: flex-end;
      `}
`;

