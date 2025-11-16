import { criarpontosService,
          resgatarPontosPorCodigoService,
          statsclientepontuandoservice,
          statsClienteComprasService,
          statsClientepontoresService
 } from "../services/ponto.service.js";

export const criarpontosController = async (req, res) => {
  const { pontos } = req.body;
  const token = req.headers.authorization;

  if (!pontos) {
    return res.status(400).json({ sucesso: false, mensagem: "O valor não pode ser vazio" });
  }

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const data = await criarpontosService(pontos, token); 
    res.json({ sucesso: true, ...data });
  } catch (error) {
    console.error('Erro no criarpontosController:', error);
    const status = error.status || 500;
    if (status === 403) {
      res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    } else {
      res.status(status).json({
        sucesso: false,
        mensagem: error.mensagem || "Erro interno no BFF",
      });
    }
  }
};

export const resgatarPontosPorCodigoController = async (req, res) => {
  const { codigo } = req.params;
  const token = req.headers.authorization;

  if (!codigo) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Código não fornecido",
    });
  }

  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Token não fornecido",
    });
  }

  try {
    const pontos = await resgatarPontosPorCodigoService(codigo, token);

    return res.status(200).json({
      sucesso: true,
      pontos,
    });
  } catch (error) {
    console.error('Erro no resgatarPontosPorCodigoController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    } else {
      return res.status(status).json({
        sucesso: false,
        mensagem: error.mensagem || "Erro interno no BFF",
      });
    }
  }
};

export const statsClientePontuandoController = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Token não fornecido",
    });
  }

  try {
    const dados = await statsclientepontuandoservice(token);

    return res.status(200).json({
      sucesso: true,
      estatisticas: dados,
    });

  } catch (error) {
    console.error("Erro no statsClientePontuandoController:", error);

    const status = error.status || 500;

    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem:
          "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }

    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const statsClienteComprasController = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Token não fornecido",
    });
  }

  try {
    const dados = await statsClienteComprasService(token);

    return res.status(200).json({
      sucesso: true,
      compras: dados,
    });

  } catch (error) {
    console.error("Erro no statsClienteComprasController:", error);

    const status = error.status || 500;

    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem:
          "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }

    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const statsClientepontoresController = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Token não fornecido",
    });
  }

  try {
    const dados = await statsClientepontoresService(token);

    return res.status(200).json({
      sucesso: true,
      pontosr: dados,
    });

  } catch (error) {
    console.error("Erro no statsClientepontoresController:", error);

    const status = error.status || 500;

    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem:
          "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }

    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};


