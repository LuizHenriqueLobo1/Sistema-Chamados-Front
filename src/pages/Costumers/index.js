import { useRef, useState, useEffect } from 'react';
import { FiUser, FiDelete,FiEdit2 } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { getDataAtualFormatada } from '../../utils/utils';
import Modal from './EditCostumer';
import './costumers.css'

export default function Costumers() {

  const nome     = useRef();
  const cnpj     = useRef();
  const endereco = useRef();

  const [clientes, setClientes] = useState([]);
  
  const [openModal, setOpenModal] = useState(false);
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
      async function loadClientes() {
        api
          .get('/clientes')
          .then(response => setClientes(response.data));
      }
      loadClientes();
  }, [ clientes ]);

  function handleSubmit(e) {
    e.preventDefault();
    api
      .post('/clientes', {
        nome:     nome.current.value,
        cnpj:     cnpj.current.value,
        endereco: endereco.current.value,
        data:     getDataAtualFormatada()
      })
      .then(_  => toast('Cliente cadastrado com sucesso!'))
      .catch(_ => toast('Erro ao cadastrar cliente!'));
  }

  async function excluir(id) {
      api
        .delete(`/clientes/${id}`)
        .then(_ => toast('Cliente excluído com sucesso!'))
        .catch(_ => toast('Erro ao excluir cliente!'));
  }

  async function editar(id) {
    setOpenModal(true);
    setClienteId(id);
  }

  return (
      <div>
          { openModal && <Modal setOpenModal={setOpenModal} clienteId={clienteId}/>}
          <Header />

          <div className="content">
              <Title nome="Clientes">
                  <FiUser size={25} />
              </Title>

              <div className="container">
                  <form onSubmit={ handleSubmit } className="form-profile costumers">
                      <label>Nome</label>
                      <input ref={ nome } placeholder="Digite o Nome Fantasia" type="text"/>

                      <label>CNPJ</label>
                      <input ref={ cnpj } placeholder="Digite o CNPJ" type="text"/>

                      <label>Endereço</label>
                      <input ref={ endereco } placeholder="Digite o seu Endereço" type="text"/>

                      <button
                        className="button-costumers"
                        type="submit"
                      >
                        Salvar
                      </button>
                  </form>
              </div>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">CNPJ</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Cadastrado em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => {
                    return (
                      <tr key={ cliente.id }>
                        <td data-label="Cliente">{ cliente.nome }</td>
                        <td data-label="CNPJ">{ cliente.cnpj }</td>
                        <td data-label="Endereço">{ cliente.endereco }</td>
                        <td data-label="Cadastrado">{ cliente.data }</td>
                        <td data-label="#">
                          <button 
                            onClick={ () => { excluir(cliente.id) } } 
                            className="action" 
                            style={{backgroundColor: '#3583f6' }}
                          >
                            <FiDelete color="#FFF" size={17} />
                          </button>
                          <button 
                            onClick={ () => { editar(cliente.id) } } 
                            className="action" 
                            style={{backgroundColor: '#F6a935' }}
                          >
                            <FiEdit2 color="#FFF" size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>
      </div>
  );
}