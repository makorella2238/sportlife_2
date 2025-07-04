import { useMatch } from "@/hooks";
import styled, { keyframes } from "styled-components";

export const Person = ({ kind, show }: { kind: "red" | "yellow" | "goal" | "coach" | "judge"; show: boolean }) => {
  const match = useMatch();
  return (
    <Wrapper style={{ display: show ? "flex" : "none" }}>
      <TeamBoxWrapper>
        {kind == "goal" && <PersImage src="/pers.png" alt="Player" />}

        {kind == "goal" && <Goal>ГОЛ!</Goal>}
        <TeamBox side="left" kind ={kind}>
          <Col>
            <Row>
              <TeamName side="left">Иванов Олег 37’</TeamName>
            </Row>
            <TeamNameLit side="right">экспресс офис</TeamNameLit>
          </Col>
        </TeamBox>
        <TeamLogo side="right" src='/comand-1.png'/>
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

const Row = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const TeamBoxWrapper = styled.div`
  position: absolute;
  bottom: 120px; // блок поднимается от низа
  left: 50%;
  transform: translateX(-50%);
  width: 475px;
  display: flex;
  align-items: flex-start;
  animation: ${slideInFromRight} 0.6s ease-out forwards;
  z-index: 10;
  background: transparent; // на всякий случай
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

const Goal = styled.div`
  position: absolute;
  top: 100px;
  right: 155px;
  width: 179px;
  height: 50px;
  background: linear-gradient(360deg, #519bfa 0%, #2ec5fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Furore", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  z-index: 4;
  clip-path: polygon(5% 100%, 95% 100%, 100% 0, 0 0);
  overflow: hidden;
`;

const PersImage = styled.img`
  position: absolute;
  top: -130px;
  right: 10px;
  width: 120px;
  height: 130px;
  object-fit: cover;
  z-index: 2;
`;

const TeamLogo = styled.img<{ side: "left" | "right" }>`
  position: absolute;
  top: -34px;
  right: -90px;
  height: 186px;
  width: 186px;
  object-fit: contain;
  margin-left: 20px;
  z-index: 3;
  align-self: center;
`;
const TeamBox = styled.div<{ side: "left" | "right"; kind?: "red" | "yellow" | "goal" | "coach" | "judge" }>`
  background: #141414;
  position: relative;
  display: flex;
  height: 100px;
  align-items: center;
  overflow: hidden;
  justify-content: flex-end;
  padding-left: 100px;
  border-radius: 0 0 0 180px;

  /* Добавляем верхний бордер в зависимости от kind */
  border-top: ${({ kind }) =>
    kind === "red"
      ? "20px solid #FF370F"
      : kind === "yellow"
      ? "20px solid #FFD900"
      : "none"};
`;


const Col = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  margin-right: 100px;
  align-items: flex-end;
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
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
`;

const TeamNameLit = styled.div<{ side: "left" | "right" }>`
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
