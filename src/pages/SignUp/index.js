import logo from '../../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useUserAuth } from '../../contexts/auth';
import api from '../../services/api';

export default function SignUp() {

  const nome  = useRef();
  const email = useRef();
  const senha = useRef();

  const [error, setError] = useState();

  const { signUp } = useUserAuth();

  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    if(!nome.current.value) {
      setError('Nome inválido!');
      return;
    }
    try {
      await signUp(
        email.current.value,
        senha.current.value
      ).then(response => {
        api.post('/usuarios', {
          id:   response.user.uid,
          nome: nome.current.value
        });
      });
      navigate('/dashboard');
    } catch(error) {
      switch(error.code) {
        case 'auth/invalid-email':        setError('E-mail inválido!');              break;
        case 'auth/weak-password':        setError('Senha inválida!');               break;
        case 'auth/email-already-in-use': setError('E-mail já está em uso!');        break;
        default:                          setError('Ocorreu um erro desconhecido!'); break;
      }
    }
  }

  return (
    <div className="conteiner-center">
      <div className="login">
        
        <div className="login-area">
          <img src={ logo } alt="Logo do Sistema"/>
        </div>
        
        <form>
          <h1>Nova Conta</h1>
          <input type="text"     placeholder="Seu nome"        ref={ nome }/>
          <input type="text"     placeholder="email@email.com" ref={ email }/>
          <input type="password" placeholder="*****"           ref={ senha }/>
          <button type="submit"  onClick={ handleSubmit }>Cadastrar</button>
          <p style={{ display: error ? "block" : "none" }}>{ error }</p>
        </form>
        
        <Link to="/">Já possui uma conta? Entre aqui!</Link>
      
      </div>
    </div>
  );
}