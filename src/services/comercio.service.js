import axios from "axios";

const API_URL = process.env.API_COMERCIO_URL || "http://localhost:8081/comercio";

//bff testado
export const buscarComercioPorIdService = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API buscarComercioPorId:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

//bff testado
export const criarComercioService = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      token: response.data?.token,
    };
  } catch (error) {
    console.error("Erro ao chamar API criarComercio:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

//bff testado
export const listarTodosComerciosService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API listarTodosComercios:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

//bff testado
export const top5ComerciosPorSetorService = async (seguimento, token) => {
  try {
    const response = await axios.get(`${API_URL}/top5/setor/${seguimento}`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API top5ComerciosPorSetor:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

//testar novamente depois de fazer uma compra
export const top5SetoresPrincipaisService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/top5/setores-principais`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API top5SetoresPrincipais:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

//testar novamente depois de fazer uma compra
export const top5CadaSetorService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/top5/cada-setor`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API top5CadaSetor:", error.message);
    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

//bff dando problema, verificar a api depois
export const top5MultiplosSetoresService = async (setores, token) => {
  try {
    const setoresParam = setores.join(',');

    const response = await axios.get(`${API_URL}/top5/setores`, {
      params: { setores: setoresParam },
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Detalhes:", error.response?.data);

    throw {
      status: error.response?.status,
      mensagem: error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const buscarmeucomercioService = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao carregar suas informações:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem:
        error.response?.data?.mensagem ||
        error.response?.data?.message ||
        "Erro na comunicação com a API",
    };
  }
};

export const atualizarComercioService = async (token, comercio) => {
  try {
    const response = await axios.put("http://localhost:8081/comercio", comercio, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o comércio:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};