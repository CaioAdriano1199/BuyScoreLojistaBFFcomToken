import {
  buscarComercioPorIdService,
  criarComercioService,
  listarTodosComerciosService,
  top5ComerciosPorSetorService,
  top5SetoresPrincipaisService,
  top5CadaSetorService,
  top5MultiplosSetoresService,
} from "../services/comercio.service.js";

export const buscarComercioPorIdController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!id) {
    return res.status(400).json({ sucesso: false, mensagem: "ID não fornecido" });
  }
  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const comercio = await buscarComercioPorIdService(id, token);
    return res.status(200).json({ sucesso: true, comercio });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const criarComercioController = async (req, res) => {
  const payload = req.body;

  try {
    const data = await criarComercioService(payload);
    return res.status(201).json({ sucesso: true, ...data });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const listarTodosComerciosController = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const comercios = await listarTodosComerciosService(token);
    return res.status(200).json({ sucesso: true, comercios });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const top5ComerciosPorSetorController = async (req, res) => {
  const { seguimento } = req.params;
  const token = req.headers.authorization;

  if (!seguimento) {
    return res.status(400).json({ sucesso: false, mensagem: "Seguimento não fornecido" });
  }
  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const comercios = await top5ComerciosPorSetorService(seguimento, token);
    return res.status(200).json({ sucesso: true, comercios });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const top5SetoresPrincipaisController = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const comercios = await top5SetoresPrincipaisService(token);
    return res.status(200).json({ sucesso: true, comercios });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const top5CadaSetorController = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const comercios = await top5CadaSetorService(token);
    return res.status(200).json({ sucesso: true, comercios });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const top5MultiplosSetoresController = async (req, res) => {
  const { setores } = req.query;

  if (!setores || (Array.isArray(setores) && setores.length === 0)) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Parâmetros 'setores' não fornecidos",
    });
  }

  const setoresArray = Array.isArray(setores) ? setores : [setores];

  try {
    const comercios = await top5MultiplosSetoresService(setoresArray);

    return res.status(200).json({
      sucesso: true,
      comercios,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

