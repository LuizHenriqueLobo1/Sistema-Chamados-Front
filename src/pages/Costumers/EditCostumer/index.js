import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import './edit-costumer.css';

function EditCostumer({ setOpenModal, clienteId }) {

  const nome     = useRef();
  const cnpj     = useRef();
  const endereco = useRef();

  const [data, setData] = useState();

  useEffect(() => {
    async function loadCliente() {
      api
        .get(`/clientes/${clienteId}`)
        .then(response => {
          setData(response.data.data);
          nome.current.value     = response.data.nome;
          cnpj.current.value     = response.data.cnpj;
          endereco.current.value = response.data.endereco;
        });
    }
    loadCliente();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    api
      .put(`clientes/${clienteId}`, {
        id:       clienteId,
        nome:     nome.current.value,
        cnpj:     cnpj.current.value,
        endereco: endereco.current.value,
        data
      })
      .then(_  => toast('Cliente atualizado com sucesso!'))
      .catch(_ => toast('Erro ao atualizar o cliente!'));
    setOpenModal(false);
  }

  return (
    <div className="modalBackground-costumer">
      <div className="modalContainer-costumer">
        <div className="titleCloseBtn-costumer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title-costumer">
          <h1>Editar Cliente</h1>
        </div>
        <div className="body-costumer">
          <form className="form-profile costumers">
              <label>Nome</label>
              <input ref={ nome } placeholder="Digite o Nome Fantasia" type="text"/>

              <label>CNPJ</label>
              <input ref={ cnpj } placeholder="Digite o CNPJ" type="text"/>

              <label>Endereço</label>
              <input ref={ endereco } placeholder="Digite o seu Endereço" type="text"/>
          </form>
        </div>
        <div className="footer-costumer">
          <button
            onClick={() => { setOpenModal(false) }}
            id="cancelBtn"
          >
            Cancelar
          </button>
          <button onClick={ handleSubmit }>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default EditCostumer;
