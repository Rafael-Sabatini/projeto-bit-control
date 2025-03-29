import React from "react";
import { toast, ToastContainer } from "react-toastify";

const Cadastro = () => {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const newUserName = formData.get("newUserName");
    const newUserEmail = formData.get("newUserEmail");
    const newUserPassword = formData.get("newUserPassword");
    const newUserConfirmPassword = formData.get("newUserConfirmPassword");

    let isValid = true;

    if (newUserName === "") {
      toast.error("Informe o seu nome de usuário!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    }

    if (newUserEmail === "") {
      toast.error("Informe um e-mail!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    }

    if (newUserPassword === "") {
      toast.error("Senha não pode ser vazia!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    } else if (newUserPassword.length < 8) {
      toast.error("Senha deve ter no mínimo 8 caracteres!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    } else if (newUserPassword.includes(" ")) {
      toast.error("Senha não pode conter espaços!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    }

    if (newUserConfirmPassword === "") {
      toast.error("Confirme a Senha não pode ser vazia!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    } else if (newUserPassword !== newUserConfirmPassword) {
      toast.error("Senhas não conferem!", {containerId:"validacao-usuario"});
      isValid = false;
      return;
    }

    if (isValid) {
      saveUser();
    }
  }

const saveUser = async () => {
  try {
    const form = document.querySelector('[data-testid="newUserForm"]');
    const formDataObj = new FormData(form);
    
    const userData = {
      nome: formDataObj.get("newUserName"),
      email: formDataObj.get("newUserEmail"),
      senha: formDataObj.get("newUserPassword"),
      telefone: formDataObj.get("newUserPhoneNumber") || null
    };

    const response = await fetch("https://primeiroprojetoequipeservidor.onrender.com/usuarios/cadastrar", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'omit', // Changed from 'include' to 'omit'
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao cadastrar usuário');
    }

    toast.success("Usuário cadastrado com sucesso!", {containerId:"validacao-cadastro"});
    
    setTimeout(() => {
      window.location.reload();
    }, 3700);

  } catch (error) {
    console.error('Erro:', error);
    toast.error(error.message || "Erro ao cadastrar usuário!", {containerId:"validacao-cadastro"});
  }
};

  return (
    <div
      data-testid="cadastro"
      className="flex flex-col justify-center items-center"
    >
      <h1 className="text-white text-center font-bold text-2xl mb-5">
        Novo Cadastro
      </h1>

      <form
        className="flex flex-col space-y-4 w-92 gap-3 mb-2"
        data-testid="newUserForm"
        method="post"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
          type="text"
          placeholder="Nome de Usuário"
          name="newUserName"
          data-testid="newUserNameInput"
        />
        <input
          className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
          type="email"
          name="newUserEmail"
          placeholder="E-mail"
          data-testid="newUserEmailInput"
        />
        <input
          className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
          type="password"
          placeholder="Senha"
          name="newUserPassword"
          data-testid="newUserPasswordInput"
        />
        <input
          className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
          type="password"
          placeholder="Confirme a Senha"
          name="newUserConfirmPassword"
          data-testid="newUserConfirmPasswordInput"
        />
        <input
          className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
          type="text"
          placeholder="Número de telefone (opcional)"
          name="newUserPhoneNumber"
          data-testid="newUserPhoneNumber"
        />
        <button
          type="submit"
          data-testid="newUserSubmitButton"
          className="bg-blue-700 hover:bg-blue-500 hover:scale-110 cursor-pointer transition-all duration-300 text-white font-bold py-2 px-4 rounded"
        >
          Cadastrar
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        containerId={"validacao-cadastro"}
      />
    </div>
  );
};

export default Cadastro;
