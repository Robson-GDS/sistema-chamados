import { useState } from 'react';
import { FiUser } from 'react-icons/fi'

import Title from '../../components/Title';
import Header from '../../components/Header';

import './customers.css';

export default function Customers() {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    alert ('teste')
  }

  return (
    <div>
      <Header />
      
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome fantasia</label>
            <input 
              type="text" 
              placeholder="Nome da sua empresa"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
            />

            <label>CNPJ</label>
            <input 
              type="text"
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />

            <label>Endereço:</label>
            <input 
              type="text" 
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <button type="submit" >Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}