import axios from "axios";

const API_URL = process.env.API_CLIENTE_URL || "http://localhost:8081/cliente";

const authHeader = (token) => ({
  Authorization: token?.startsWith("Bearer ") ? token : `Bearer ${token}`,
  "Content-Type": "application/json",
});

//bff testado
export const CadastroService = async (payload) => {
  try {
    console.log("📦 Enviando payload para API:", JSON.stringify(payload, null, 2));
    console.log("🌐 URL da API:", API_URL);

    // Verifica antes de enviar
    if (!API_URL || typeof API_URL !== "string") {
      throw new Error("API_URL não configurada corretamente");
    }

    if (typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("Payload inválido — deve ser um objeto JSON");
    }

    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Resposta da API:", response.data);

    return {
      token: response.data.token,
    };
  } catch (error) {
    console.error("❌ Erro ao chamar API:", error);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.message || "Erro na comunicação com a API",
    };
  }
};

export const atualizarClienteService = async (id, cliente, token) => {
  try {
    await axios.put(`${API_URL}/${id}`, cliente, {
      headers: authHeader(token),
    });
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const checkFavoritoService = async (comercioId, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/comercio-favoritos/${comercioId}/check`,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const checkProdutoFavoritoService = async (produtoId, token) => {
  try {
    const response = await axios.get(
      `${API_URL}/produto-favoritos/${produtoId}/check`,
      { headers: authHeader(token) }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const removerClienteService = async (id, token) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: authHeader(token),
    });
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const removerProdutoFavoritoService = async (produtoId, token) => {
  try {
    await axios.delete(`${API_URL}/produto-favoritos/${produtoId}`, {
      headers: authHeader(token),
    });
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const adicionarFavoritoService = async (comercioId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/comercio-favoritos/${comercioId}`,
      {},
      { headers: authHeader(token) }
    );
    return {
      mensagem: response.data?.mensagem || "Favorito adicionado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const adicionarProdutoFavoritoService = async (produtoId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/produto-favoritos/${produtoId}`,
      {},
      { headers: authHeader(token) }
    );
    return {
      mensagem:
        response.data?.mensagem || "Produto adicionado aos favoritos",
    };
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const listarFavoritosService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/comercio-favoritos`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const listarProdutosFavoritosService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/produto-favoritos`, {
      headers: authHeader(token),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const removerFavoritoService = async (comercioId, token) => {
  try {
    await axios.delete(`${API_URL}/comercio-favoritos/${comercioId}`, {
      headers: authHeader(token),
    });
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const allclienteService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: authHeader(token),
    });
    return { clientes: response.data };
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};

export const clienteIDService = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: authHeader(token),
    });
    return { usuario: response.data };
  } catch (error) {
    console.error("Erro ao chamar API:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};
