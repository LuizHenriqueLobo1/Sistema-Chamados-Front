import { useEffect, useState } from 'react';
import api from '../../../services/api';
import './detalhe-chamado.css';

export default function DetalheChamado({ setOpenModal, clienteId }) {

    const [complemento, setComplemento] = useState();

    useEffect(() => {
        async function loadChamado() {
            api
                .get(`/chamados/${clienteId}`)
                .then(response => {
                  setComplemento(response.data.complemento);
                });
        }
        loadChamado();
    }, []);

    return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1>Detalhamento do Chamado</h1>
            </div>
            <div className="body">
              <textarea
                type="text"
                value={ complemento }
                disabled
              />
            </div>
          </div>
        </div>
      );
}