import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import './edit-chamado.css';

export default function EditCostumer({ setOpenModal, chamadoId }) {

  const [clientes, setClientes]               = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);

  const [idCliente, setIdCliente]     = useState();
  const [assunto, setAssunto]         = useState();
  const [status, setStatus]           = useState();
  const [complemento, setComplemento] = useState();
  const [data, setData]               = useState();

  useEffect(() => {
    async function loadChamado() {
      api
        .get(`/chamados/${chamadoId}`)
        .then(response => {
          setIdCliente(response.data.cliente.id);
          setAssunto(response.data.assunto);
          setStatus(response.data.status);     
          setComplemento(response.data.complemento);
          setData(response.data.data);
        });
    }
    async function loadClientes() {
      api
        .get('/clientes')
        .then(response => {
          setClientes(response.data);
          setLoadingClientes(false);
        });
    }
    loadChamado();
    loadClientes();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    api
      .put(`/chamados/${chamadoId}`, {
        id:      chamadoId,
        cliente: idCliente,
        assunto,
        status,
        complemento,
        data
      })
      .then(_  => toast('Chamado atualizado com sucesso!'))
      .catch(_ => toast('Erro ao atualizar o chamado!'));
    setOpenModal(false);
  }

  return (
    <div className="modalBackground-edit-chamado">
      <div className="modalContainer-edit-chamado">
        <div className="titleCloseBtn-edit-chamado">
          <button onClick={ () => setOpenModal(false) }>
            X
          </button>
        </div>
        <div className="title-edit-chamado">
          <h1>Editar Chamado</h1>
        </div>
        <div className="body-edit-chamado">
          <label>Cliente</label>
          {loadingClientes ?
              <input type="text" value="Carregando..." />
              : <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
                  {clientes.map(item => {
                      return (<option key={item.id} value={item.id}>{item.nome}</option>);
                  })}
              </select>
          }

          <label>Assunto</label>
          <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
              <option value="SUPORTE">Suporte</option>
              <option value="FINANCEIRO">Financeiro</option>
              <option value="VISITA">Visita</option>
          </select>

          <label>Status</label>
          <div className="status-edit-chamado">
              <input
                  type="radio"
                  name="radio"
                  value="EM_ABERTO"
                  onChange={(e) => setStatus(e.target.value)}
                  checked={status === "EM_ABERTO"} />
              <span>Em Aberto</span>

              <input
                  type="radio"
                  name="radio"
                  value="EM_PROGRESSO"
                  onChange={(e) => setStatus(e.target.value)}
                  checked={status === "EM_PROGRESSO"} />
              <span>Em Progresso</span>

              <input
                  type="radio"
                  name="radio"
                  value="ATENDIDO"
                  onChange={(e) => setStatus(e.target.value)}
                  checked={status === "ATENDIDO"} />
              <span>Atendido</span>
          </div>
          
          <label>Complemento</label>
          <textarea
            className="textarea-edit-chamado"
            type="text"
            placeholder="Descreva seu problema aqui..."
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>
        <div className="footer-edit-chamado">
          <button onClick={ () => setOpenModal(false) } id="cancelBtn">
            Cancelar
          </button>
          <button onClick={ handleSubmit }>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
