import { useState, useContext } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi'

import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

import './profile.css';

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(event) {
    if(event.target.files[0]) {
      const image = event.target.files[0];

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(event.target.files[0]))
      }else{
        alert('Envie uma imagem do tipo PNG ou JPEG');
        setImageAvatar(null);
        return null;
      }
    }

    // console.log(event.target.files[0])
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadTask = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then(async () => {
      console.log('Foto enviada com sucesso!');

      await firebase.storage().ref(`images/${currentUid}`)
      .child(imageAvatar.name).getDownloadURL()
      .then(async (url) => {
        let urlFoto = url;

        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          avatarUrl: urlFoto,
          nome: nome
        })
        .then(() => {
          let data = {
            ...user,
            avatarUrl: urlFoto,
            nome: nome
          };
          setUser(data);
          storageUser(data);

        })

      })

    })
    
  }

  async function handleSave(event){
    event.preventDefault();

    if(imageAvatar === null && nome !== '') {
      await firebase.firestore().collection('users')
      .doc(user.uid)
      .update({
        nome: nome
      })
      .then(() => {
        let data = {
          ...user,
          nome: nome
        };
        setUser(data);
        storageUser(data);
      })
    }
    else if(nome !== '' && imageAvatar !== null) {
      handleUpload();
    }
    
  }

  return(
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} /><br/>
              { avatarUrl === null ? 
                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
              } 
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}