import {
  atualizarClienteService,
  checkFavoritoService,
  checkProdutoFavoritoService,
  removerClienteService,
  CadastroService,
  removerProdutoFavoritoService,
  adicionarFavoritoService,
  adicionarProdutoFavoritoService,
  listarFavoritosService,
  listarProdutosFavoritosService,
  removerFavoritoService,
  allclienteService,
  clienteIDService,
} from "../services/cliente.service.js";

const verificarToken = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
    return null;
  }
  return token;
};

export const cadastroController = async (req, res) => {
  const {
    perfilUsuario,
    nome,
    email,
    senha,
    fotoUsuario,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    numero,
    uf
  } = req.body;

  // Validação dos campos obrigatórios
  if (
    !perfilUsuario ||
    !nome ||
    !email ||
    !senha ||
    !fotoUsuario ||
    !cep ||
    !logradouro ||
    !complemento ||
    !bairro ||
    !cidade ||
    numero === undefined ||
    numero === null ||
    !uf
  ) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Todos os campos são obrigatórios",
    });
  }

  try {
    // Monta o payload corretamente
    const payload = {
      perfilUsuario,
      nome,
      email,
      senha,
      fotoUsuario,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      numero,
      uf,
    };

    // Chama o service passando o objeto payload
    const data = await CadastroService(payload);

    // Retorna sucesso
    res.status(201).json({
      sucesso: true,
      ...data,
    });
  } catch (error) {
    console.error("Erro no cadastroController:", error);

    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};


export const atualizarClienteController = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!id)
    return res.status(400).json({ sucesso: false, mensagem: "ID não fornecido" });

  if (!body || Object.keys(body).length === 0)
    return res.status(400).json({ sucesso: false, mensagem: "Body vazio ou inválido" });

  try {
    await atualizarClienteService(id, body, token);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const checkFavoritoController = async (req, res) => {
  const { comercioId } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!comercioId)
    return res.status(400).json({ sucesso: false, mensagem: "comercioId não fornecido" });

  try {
    const favorito = await checkFavoritoService(comercioId, token);
    res.json({ sucesso: true, favorito });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const checkProdutoFavoritoController = async (req, res) => {
  const { produtoId } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!produtoId)
    return res.status(400).json({ sucesso: false, mensagem: "produtoId não fornecido" });

  try {
    const favorito = await checkProdutoFavoritoService(produtoId, token);
    res.json({ sucesso: true, favorito });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const removerClienteController = async (req, res) => {
  const { id } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!id)
    return res.status(400).json({ sucesso: false, mensagem: "ID não fornecido" });

  try {
    await removerClienteService(id, token);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const removerProdutoFavoritoController = async (req, res) => {
  const { produtoId } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!produtoId)
    return res.status(400).json({ sucesso: false, mensagem: "produtoId não fornecido" });

  try {
    await removerProdutoFavoritoService(produtoId, token);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const adicionarFavoritoController = async (req, res) => {
  const { comercioId } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!comercioId)
    return res.status(400).json({ sucesso: false, mensagem: "comercioId não fornecido" });

  try {
    const data = await adicionarFavoritoService(comercioId, token);
    res.json({ sucesso: true, ...data });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const adicionarProdutoFavoritoController = async (req, res) => {
  const { produtoId } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!produtoId)
    return res.status(400).json({ sucesso: false, mensagem: "produtoId não fornecido" });

  try {
    const data = await adicionarProdutoFavoritoService(produtoId, token);
    res.json({ sucesso: true, ...data });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const listarFavoritosController = async (req, res) => {
  const token = verificarToken(req, res);
  if (!token) return;

  try {
    const favoritos = await listarFavoritosService(token);
    res.json({ sucesso: true, favoritos });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const listarProdutosFavoritosController = async (req, res) => {
  const token = verificarToken(req, res);
  if (!token) return;

  try {
    const favoritos = await listarProdutosFavoritosService(token);
    res.json({ sucesso: true, favoritos });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const removerFavoritoController = async (req, res) => {
  const { comercioId } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!comercioId)
    return res.status(400).json({ sucesso: false, mensagem: "comercioId não fornecido" });

  try {
    await removerFavoritoService(comercioId, token);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const allclienteController = async (req, res) => {
  const token = verificarToken(req, res);
  if (!token) return;

  try {
    const data = await allclienteService(token);
    res.json({ sucesso: true, ...data });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const clienteIDController = async (req, res) => {
  const { id } = req.params;
  const token = verificarToken(req, res);
  if (!token) return;

  if (!id)
    return res.status(400).json({ sucesso: false, mensagem: "ID não fornecido" });

  try {
    const data = await clienteIDService(id, token);
    res.json({ sucesso: true, ...data });
  } catch (error) {
    res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};
