import React from "react";
import { toast, ToastContainer } from "react-toastify";

const EsqueceuSenha = () => {
  function handlePasswordReset(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    email === "" ? toast.error("Favor digitar um endereço de e-mail") : null;
    sendEmail(email);
  }

  const sendEmail = (email) => {
    try {
      // TODO: Código de enviar método para API
      toast.success("E-mail de redefinição enviado!");
      setTimeout(() => {
        window.location.reload();
        return email;
      }, 3700);
    } catch (error) {
      toast.error("Erro ao enviar e-mail")
      return error;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-white text-2xl text-center">
        Redefinir Senha
      </h1>

      <div className="flex flex-col justify-center items-center mt-3">
        <form
          className="flex flex-col space-y-4 w-92 gap-2 mb-2"
          data-testid="forgotPassForm"
          method="post"
          onSubmit={handlePasswordReset}
        >
          <p className="text-white text-center">
            Insira seu e-mail para redefinir sua senha
          </p>
          <input
            className="bg-gray-100 p-2 rounded-md focus:scale-110 transition-all duration-300"
            type="email"
            placeholder="E-mail"
            name="email"
            data-testid="forgotPassEmailInput"
          />
          <button
            type="submit"
            data-testid="forgotPassSubmitButton"
            className="bg-blue-700 hover:bg-blue-500 hover:scale-110 cursor-pointer transition-all duration-300 text-white font-bold py-2 px-4 rounded"
          >
            Enviar
          </button>
        </form>
      </div>

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
      />
    </div>
  );
};

export default EsqueceuSenha;
