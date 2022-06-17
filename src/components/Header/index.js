import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import { useUserAuth } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import api from '../../services/api';
import './header.css'

export default function Header() {

    const { user } = useUserAuth();
    const [avatarImagem, setAvatarImagem] = useState(avatar);

    useEffect(() => {
        api
            .get(`/usuarios/${user.uid}`)
            .then(response => {
                if(response.data.foto) {
                    setAvatarImagem(`data:image/png;base64,${response.data.foto}`);
                }
            });
    }, []);

    return (
        <div className="sidebar">
            <div>
                <img alt="Foto Avatar" src={ avatarImagem } />
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24} />
            Chamados
        </Link>
            <Link to="/costumers">
                <FiUser color="#FFF" size={24} />
            Clientes
        </Link>
            <Link to="/profile">
                <FiSettings color="#FFF" size={24} />
            Configurações
        </Link>

        </div>
    );
}