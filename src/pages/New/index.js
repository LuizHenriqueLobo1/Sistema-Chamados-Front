import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { getDataAtualFormatada } from '../../utils/utils';
import './new.css';

export default function New() {

    const [clientes, setClientes]               = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(true);

    const [cliente, setCliente]         = useState();
    const [assunto, setAssunto]         = useState('SUPORTE');
    const [status, setStatus]           = useState('EM_ABERTO');
    const [complemento, setComplemento] = useState('');


    useEffect(() => {
        async function loadClientes() {
            api.get('/clientes').then(response => {
                setClientes(response.data);
                setCliente(response.data[0].id);
                setLoadingClientes(false);
            });
        }
        loadClientes();
    }, []);

    async function handleChamado(e) {
        e.preventDefault();
        api
            .post('/chamados', {
                cliente,
                assunto,
                status,
                complemento,
                data: getDataAtualFormatada()
            })
            .then(_  => toast('Chamado cadastrado com sucesso!'))
            .catch(_ => toast('Erro ao cadastrar o chamado!'));
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title nome="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form onSubmit={(e) => { handleChamado(e) }} className="form-profile">
                        <label>Cliente</label>
                        {loadingClientes ?
                            <input type="text" value="Carregando..." />
                            : <select value={cliente} onChange={(e) => setCliente(e.target.value)}>
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
                        <div className="status">
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
                            type="text"
                            placeholder="Descreva seu problema aqui..."
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                        <button type="submit">Registrar</button>
                    </form>

                </div>

            </div>
        </div>
    );
}
