import "./App.css";
import { useState } from "react";
import Cadastro from "./components/Cadastro";
import EsqueceuSenha from "./components/EsqueceuSenha";
import ModalComponent from "./components/ModalComponent";
import Landing from "./components/Landing";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [component, setComponent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleComponentChange = (componentName) => (e) => {
    e.preventDefault();
    setComponent(componentName);
  };

  const closeModal = () => {
    setComponent(null);
  };

  async function validateUser(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const loginUser = formData.get("loginUser");
    const loginPass = formData.get("loginPass");

    if (loginUser === "" && loginPass === "") {
      toast.error("Preencha todos os campos", {
        containerId: "validacao-usuario",
      });
      return;
    } else {
      await login(formData);
    }
  }

  const login = async (formData) => {
    try {
      const loginData = {
        email: formData.get("loginUser"),
        senha: formData.get("loginPass"),
      };

      const response = await fetch(
        "https://primeiroprojetoequipeservidor.onrender.com/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "omit",
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Credenciais inválidas");
      }

      const userData = await response.json();
      // Store user data or token if needed
      setIsLoggedIn(true);
      toast.success("Login realizado com sucesso!", {
        containerId: "validacao-usuario",
      });
    } catch (error) {
      console.error("Erro:", error);
      toast.error(error.message || "Usuário ou senha inválidos", {
        containerId: "validacao-usuario",
      });
      return error;
    }
  };

  if (isLoggedIn) {
    return <Landing />;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <h1 className="text-4xl text-white font-bold">Login</h1>

        <div className="bg-gray-950 p-4 rounded-md shadow-2xl shadow-black mt-3">
          <form
            className="flex flex-col space-y-4 w-92 gap-3 mb-2 z-10"
            data-testid="login"
            onSubmit={validateUser}
          >
            <input
              className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
              type="text"
              placeholder="Usuário ou E-mail"
              name="loginUser"
              data-testid="loginUserInput"
            />
            <input
              className="p-2 rounded-md focus:scale-110 transition-all duration-300 bg-gray-100"
              type="password"
              placeholder="Senha"
              name="loginPass"
              data-testid="loginPassInput"
            />
            <button
              type="submit"
              data-testid="loginSubmitButton"
              className="bg-blue-700 hover:bg-blue-500 hover:scale-110 cursor-pointer transition-all duration-300 text-white font-bold py-2 px-4 rounded"
            >
              Entrar
            </button>
          </form>
          <div className="flex flex-row justify-between items-end">
            <a
              href=""
              className="text-blue-600"
              onClick={handleComponentChange("esqueceuSenha")}
              data-testid="forgotPassButton"
            >
              Esqueci Minha Senha
            </a>

            <a
              href=""
              onClick={handleComponentChange("cadastro")}
              className="text-blue-600"
              data-testid="newUserButton"
            >
              Cadastrar
            </a>
          </div>
        </div>
      </div>
      <ModalComponent isOpen={!!component} onRequestClose={closeModal}>
        {component === "cadastro" ? <Cadastro /> : null}
        {component === "esqueceuSenha" ? <EsqueceuSenha /> : null}
      </ModalComponent>

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
        containerId="validacao-usuario"
        stacked={true}
      />
    </>
  );
}

export default App;
