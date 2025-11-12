import axios from "axios";

const API_URL = process.env.API_PRODUTO_URL || "http://localhost:8081/produto";

export const produtoIDService = async (id, token) => {
  if (!id) {
    throw {
      status: 400,
      mensagem: "ID do produto não fornecido",
    };
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API de produtoID:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};

export const removerProdutoService = async (id, token) => {
  if (!id) {
    throw {
      status: 400,
      mensagem: "ID do produto não fornecido",
    };
  }

  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    return { mensagem: "Produto removido com sucesso" };
  } catch (error) {
    console.error("Erro ao remover produto:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};

export const meusProdutosService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/meusprodutos`, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};
export const listarProdutosService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};

export const ativarProdutoService = async (id, token) => {
  if (!id) {
    throw {
      status: 400,
      mensagem: "ID do produto não fornecido",
    };
  }

  try {
    await axios.put(`${API_URL}/ativar/${id}`, null, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    return { mensagem: "Produto ativado com sucesso" };
  } catch (error) {
    console.error("Erro ao ativar produto:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};

export const desativarProdutoService = async (id, token) => {
  if (!id) {
    throw {
      status: 400,
      mensagem: "ID do produto não fornecido",
    };
  }

  try {
    await axios.put(`${API_URL}/desativar/${id}`, null, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    return { mensagem: "Produto desativado com sucesso" };
  } catch (error) {
    console.error("Erro ao desativar produto:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};

export const atualizarProdutoService = async (produto, token) => {
  if (!produto || Object.keys(produto).length === 0) {
    throw {
      status: 400,
      mensagem: "Objeto Produto inválido ou vazio",
    };
  }

  try {
    const response = await axios.put(`${API_URL}`, produto, {
      headers: {
        Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error.message);
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};


export const criarProdutoService = async (body, token) => {
  try {
    const response = await axios.post(`${API_URL}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API de produto:", error.message);
    throw {
      status: error.response?.status,
      mensagem:
        error.response?.data?.mensagem || "Erro na comunicação com a API",
    };
  }
};