import { styled } from '@mui/material';

const ModalOverlay = styled("div")`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled("div")`
    background-color: whitesmoke;
    padding: 20px;
    border-radius: 10px;
    width: 40%;
    max-width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalHeader = styled("div")`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
`;


const InfoGroup = styled("span")`
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
`;

const InfoLabel= styled("span")`   
    font-weight: bold;
    color: #333;
`;

const InfoValue = styled("span")`
    color: #666
`;

const CloseButton= styled("button")`
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: rgba(255, 79, 26, 0.49);
    }
`;

const CarModal = ({car, onClose}) =>{
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{car.modelo}</ModalHeader>
        <InfoGroup>
          <InfoLabel>Modelo:</InfoLabel>
          <InfoValue>{car.modelo}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>País:</InfoLabel>
          <InfoValue>{car.pais}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Fabricante:</InfoLabel>
          <InfoValue>{car.fabricante}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Cor:</InfoLabel>
          <InfoValue>{car.cor}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Ano:</InfoLabel>
          <InfoValue>{car.ano}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>HPs:</InfoLabel>
          <InfoValue>{car.cavalosDePotencia}</InfoValue>
        </InfoGroup>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
}
export default CarModal;