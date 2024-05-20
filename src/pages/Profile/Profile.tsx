import { Camera, User } from 'lucide-react';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import Navbar from '../../components/Navbar/Navbar';
import {
  Button,
  Div,
  DivButtons,
  DivProfile,
  DivUserAvatar,
  DivUserData,
  DivUserInfo,
  Form,
  Input,
  UserAvatar,
} from './styled';
import { useState } from 'react';

function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [imgURL, setImgURL] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files;

    const imageURL = img ? URL.createObjectURL(img[0]) : '';
    setImgURL(imageURL);
  };

  return (
    <div>
      <Navbar />
      <Div>
        <p>Perfil</p>
        <DivProfile>
          <DivUserAvatar>
            {imgURL ? (
              <img className="image-avatar" src={imgURL}></img>
            ) : (
              <UserAvatar>
                <User color="black" size={90} />
                <Button className="img-button" style={{ marginTop: '2rem' }}>
                  <label style={{ cursor: 'pointer' }} htmlFor="img-input">
                    <input
                      onChange={(e) => handleChange(e)}
                      style={{ display: 'none' }}
                      id="img-input"
                      type="file"
                    />
                    <Camera />
                  </label>
                </Button>
              </UserAvatar>
            )}
          </DivUserAvatar>
          <DivUserInfo>
            {isUpdating ? (
              <Form>
                <label>Apelido</label>
                <Input type="text" />
                <label>Email</label>
                <Input type="text" />
                <label>Senha</label>

                <Input type="text" />

                <DivButtons>
                  <Button>Alterar</Button>
                  <Button onClick={() => setIsUpdating(false)}>Cancelar</Button>
                </DivButtons>
              </Form>
            ) : (
              <>
                <DivUserData>
                  <p>Apelido</p>
                  <p className="info">Username</p>
                  <p>Email</p>
                  <p className="info">123@gmail.com</p>
                  <p>Senha</p>
                  <p className="info">*********</p>
                </DivUserData>
                <Button onClick={() => setIsUpdating(true)}>
                  Editar dados
                </Button>
              </>
            )}

            {isUpdating && <Form></Form>}
          </DivUserInfo>
        </DivProfile>
      </Div>

      <BottomMenu />
    </div>
  );
}

export default Profile;
