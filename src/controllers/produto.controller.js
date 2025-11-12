import { produtoIDService, 
    removerProdutoService, 
    listarProdutosService, 
    ativarProdutoService,
    desativarProdutoService,
    atualizarProdutoService, 
    criarProdutoService,
    meusProdutosService
} from "../services/produto.service.js";

export const produtoIDController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!id) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "ID do produto não fornecido",
    });
  }

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const produto = await produtoIDService(id, token);

    return res.status(200).json({
      sucesso: true,
      produto,
    });
  } catch (error) {
    console.error('Erro no produtoIDController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const removerProdutoController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!id) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "ID do produto não fornecido",
    });
  }

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const data = await removerProdutoService(id, token);

    return res.status(200).json({
      sucesso: true,
      ...data,
    });
  } catch (error) {
    console.error('Erro no removerProdutoController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const listarProdutosController = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const produtos = await listarProdutosService(token);

    return res.status(200).json({
      sucesso: true,
      produtos,
    });
  } catch (error) {
    console.error('Erro no listarProdutosController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};
export const meusProdutosController = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const produtos = await meusProdutosController(token);

    return res.status(200).json({
      sucesso: true,
      produtos,
    });
  } catch (error) {
    console.error('Erro no listarProdutosController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const ativarProdutoController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!id) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "ID do produto não fornecido",
    });
  }

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const data = await ativarProdutoService(id, token);

    return res.status(200).json({
      sucesso: true,
      ...data,
    });
  } catch (error) {
    console.error('Erro no ativarProdutoController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const desativarProdutoController = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  if (!id) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "ID do produto não fornecido",
    });
  }

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const data = await desativarProdutoService(id, token);

    return res.status(200).json({
      sucesso: true,
      ...data,
    });
  } catch (error) {
    console.error('Erro no desativarProdutoController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};

export const atualizarProdutoController = async (req, res) => {
  const body = req.body;
  const token = req.headers.authorization;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Objeto Produto inválido ou vazio",
    });
  }

  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Token não enviado" });
  }

  try {
    const produtoAtualizado = await atualizarProdutoService(body, token);

    return res.status(200).json({
      sucesso: true,
      produto: produtoAtualizado,
    });
  } catch (error) {
    console.error('Erro no atualizarProdutoController:', error);
    const status = error.status || 500;
    if (status === 403) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado. Verifique suas permissões ou token de autenticação.",
      });
    }
    return res.status(status).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};


export const criarProdutoController = async (req, res) => {
  const body = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Token não fornecido",
    });
  }

  try {
    const produto = await criarProdutoService(body, token);

    return res.status(200).json({
      sucesso: true,
      produto,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      sucesso: false,
      mensagem: error.mensagem || "Erro interno no BFF",
    });
  }
};