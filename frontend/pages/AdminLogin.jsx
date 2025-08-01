import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LOGO_URL = '/leform_logo.svg';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !password) {
      setErrorMsg('Preencha usuário e senha.');
      return;
    }

    try {
      const response = await fetch('https://leform.onrender.com/adm/authentication', {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({name, password}),     
      });
      console.log('USER NAME:',name)
      console.log('password:',password)
      
      const isAuthenticated = await response.json();
      if (isAuthenticated === true){
        console.log("funcionou")
        console.log(isAuthenticated)
        navigate('/admin', { state: { authenticated: true } });
      } else {
        setErrorMsg('Usuário ou senha inválidos!.')
      }

    } catch(error){
        console.error('Erro na autenticação:', error);
        setErrorMsg('Erro no servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-100"
      >
        {/* Logo da clínica */}
        <div className="flex justify-center mb-6">
          <img
            src={LOGO_URL}
            alt="Logo da Clínica"
            className="h-24 w-auto" // <-- aumente aqui (ex: h-24 ou h-32)
          />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">
          Login do Administrador
        </h2>
        {errorMsg && (
          <div className="mb-4 text-red-500 text-center text-sm">{errorMsg}</div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Usuário</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF879B]"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Senha</label>
          <div className="relative flex items-center">
            <input
              type={showPass ? 'text' : 'password'}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF879B]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPass((v) => !v)}
              tabIndex={-1}
              aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
