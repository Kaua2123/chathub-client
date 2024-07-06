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
import { useEffect, useState } from 'react';
import axios from '../../services/axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IUser } from '../../interfaces/IUser';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

function Profile() {
  const decodedToken = useAuthContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`user/${decodedToken?.id}`);

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files;

    if (!img) return;

    const imageURL = URL.createObjectURL(img[0]);

    console.log(img);
    setImgURL(imageURL);

    const formData = new FormData();
    formData.append('image', img[0]);

    try {
      await axios.put(`/addImages/addUserImage/${decodedToken?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Imagem adicionada.');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const updateUserData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      e.preventDefault();
      await axios.put(`user/update/${decodedToken.id}`, {
        username,
        email,
      });

      toast.success('Dados atualizados');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  console.log(user?.image_url);

  return (
    <div>
      <Navbar />
      <Div>
        <p>Perfil</p>
        <DivProfile>
          <DivUserAvatar>
            {imgURL || user?.image_url ? (
              <img
                className="image-avatar"
                src={imgURL || user?.image_url}
              ></img>
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
          <DivUserInfo $isUpdating={isUpdating}>
            {isUpdating ? (
              <Form>
                <label>Apelido</label>
                <Input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <Input type="text" onChange={(e) => setEmail(e.target.value)} />

                <DivButtons>
                  <Button onClick={(e) => updateUserData(e)}>Alterar</Button>
                  <Button
                    className="cancel-btn"
                    onClick={() => setIsUpdating(false)}
                  >
                    Cancelar
                  </Button>
                </DivButtons>
              </Form>
            ) : (
              <>
                <DivUserData>
                  <p>Apelido</p>
                  <p className="info">{user ? user.username : 'Username'}</p>
                  <p>Email</p>
                  <p className="info" style={{ marginBottom: '2rem' }}>
                    {user ? user.email : 'email@...'}
                  </p>
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
