import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import logo from '../../assets/logo.png';

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();
    
    if(nome !== '' && email !== '' && password !== '') {
      signUp(email, password, nome)
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="logo do sistema"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar uma conta</h1>
          <input 
            type="text"
            placeholder="digite seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <input 
            type="text" 
            placeholder="digite seu email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
          />
          <input 
            type="password" 
            placeholder="digite sua senha" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)} 
          />
          <button type="submit">{loadingAuth ? 'Cadastrando...' : 'Cadastrar'}</button>
        </form>

        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  )
}