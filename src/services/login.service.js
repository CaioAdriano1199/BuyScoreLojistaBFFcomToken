import axios from "axios";

const API_URL = "http://localhost:8081/auth/login";

//bff testado
export const loginService = async (email, senha) => {
  try {
    const response = await axios.post(API_URL, { email, senha });

    return {
      token: response.data.token,
      usuario: response.data.usuario || null,
    };
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};
