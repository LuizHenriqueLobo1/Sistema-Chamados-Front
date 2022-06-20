import './dashboard.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import DetalheChamado from './Detalhe-Chamado';

export default function Dashboard() {

  const [chamados, setChamados] = useState(
    [{ cliente: { nome: 'Sujeito' }, chamado: 'EM_ABERTO', assunto: 'SUPORTE', data: '01/01/2022'}]
  );

  const [openModal, setOpenModal] = useState(false);
  const [clienteId, setClienteId] = useState();

  useEffect(() => {
    api
      .get('/chamados')
      .then(response => {
        if(response.data) {
          setChamados(response.data);
        }
      })
  }, []);

  function detalhar(id) {
    setOpenModal(true);
    setClienteId(id);
  }

  return(
    <div>
      { openModal && <DetalheChamado setOpenModal={setOpenModal} clienteId={clienteId}/>}
      <Header/>

      <div className="content">
        <Title nome="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        { chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
          ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((chamado, index) => {
                  return (
                    <tr key={ index }>
                      <td data-label="Cliente">{ chamado.cliente.nome }</td>
                      <td data-label="Assunto">{ chamado.assunto }</td>
                      <td data-label="Status">
                        <span 
                          className="badge"
                          style={
                            chamado.status === 'EM_ABERTO' ? 
                            { backgroundColor: '#bf2d17' } : 
                            chamado.status === 'EM_PROGRESSO' ? 
                            { backgroundColor: '#c2b43c' } : 
                            { backgroundColor: '#5cb85c'} 
                          }
                        >
                          { chamado.status }
                        </span>
                      </td>
                      <td data-label="Cadastrado">{ chamado.data }</td>
                      <td data-label="#">
                        <button 
                          onClick={ () => { detalhar(chamado.id) } } 
                          className="action" 
                          style={{backgroundColor: '#3583f6' }}
                        >
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <button className="action" style={{backgroundColor: '#F6a935' }}>
                          <FiEdit2 color="#FFF" size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}

      </div>

    </div>
  )
}