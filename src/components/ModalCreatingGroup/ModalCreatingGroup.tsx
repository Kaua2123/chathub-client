import { Camera } from 'lucide-react';
import {
  AbsoluteDiv,
  Button,
  CircleXIcon,
  CloseButton,
  Container,
  Div,
  GroupData,
  GroupImage,
  ImageIcon,
  Input,
  Modal,
} from './styled';

export type ModalCreatingGrouoProps = {
  setIsCreatingGroup: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalCreatingGroup({ setIsCreatingGroup }: ModalCreatingGrouoProps) {
  return (
    <div>
      <Modal>
        <Container>
          <CloseButton>
            <CircleXIcon
              onClick={() => setIsCreatingGroup(false)}
              size={20}
              color="white"
            />
          </CloseButton>
          <Div>
            <GroupImage>
              <AbsoluteDiv>
                <ImageIcon size={100} color="white" />
                <Button className="btn-absolute">
                  <Camera />
                </Button>
              </AbsoluteDiv>
            </GroupImage>
            <GroupData>
              <label htmlFor="">Nome do grupo</label>
              <Input type="text" />
            </GroupData>

            <Button className="create-group-btn">Criar grupo</Button>
          </Div>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalCreatingGroup;
