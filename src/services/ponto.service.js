import axios from "axios";

const API_URL = "http://localhost:8081/ponto";

//bff testado
export const criarpontosService = async (pontos, token) => {
    try {
        const response = await axios.post(`${API_URL}/criarponto`, { pontos }, { 
            headers: { 
                Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
                "Content-Type": "application/json", 
            }, 
        });

        return {
            codigo: response.data
        };
    } catch (error) {
        console.error("Erro ao chamar API de pontos:", error.message);
        console.error("Status:", error.response?.status);
        console.error("Dados do erro:", error.response?.data);
        
        throw {
            status: error.response?.status || 500,
            mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
        };
    }
};

//bff testado
export const resgatarPontosPorCodigoService = async (codigo, token) => {
  try {
    const response = await axios.get(`${API_URL}/codigo/${codigo}`, {
      headers: {
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao chamar API de pontos:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Dados do erro:", error.response?.data);
    
    throw {
      status: error.response?.status || 500,
      mensagem: error.response?.data?.mensagem || error.response?.data?.message || "Erro na comunicação com a API",
    };
  }
};