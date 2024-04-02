const clientes = [
  "José Luiz",
  "Guilherme Ribeiro",
  "Ivis Gama",
  "Ana Silva",
  "Carlos Oliveira",
  "Mariana Santos",
  "Pedro Almeida",
  "Juliana Costa",
  "Rafael Pereira",
  "Fernanda Oliveira",
  "Lucas Souza",
  "Patrícia Lima",
  "André Rodrigues",
  "Aline Fernandes",
  "Ricardo Nunes",
  "Camila Pereira",
  "Eduardo Santos",
  "Bianca Oliveira",
  "Felipe Costa",
  "Tatiane Silva"
];

const produtos = [
  {
    id: 'p1',
    nome: 'guarda roupa [Guarapari]',
    preco: 900,
    descricao: '',
    imagem: "../brand/produto-01.webp"
  },
  {
    id: 'p2',
    nome: 'guarda roupa [Buzios]',
    preco: 300,
    descricao: '',
    imagem: "../brand/produto-02.webp"
  },
  {
    id: 'p3',
    nome: 'guarda roupa [Maria]',
    preco: 600,
    descricao: '',
    imagem: "../brand/produto-03.webp"
  },
  {
    id: 'p4',
    nome: 'guarda roupa [Blumenal]',
    preco: 500,
    descricao: '',
    imagem: "../brand/produto-04.webp"
  },
  {
    id: 'p5',
    nome: 'guarda roupa [Guarapari]',
    preco: 1200,
    descricao: '',
    imagem: "../brand/produto-05.webp"
  },
  {
    id: 'p6',
    nome: 'guarda roupa [Buzios]',
    preco: 300,
    descricao: '',
    imagem: "../brand/produto-06.webp"
  },
  // Continuar com outros produtos...
];



const carrinhoPorEmpresa = {}; // Armazena os produtos selecionados por empresa

// Função para rolar até a seção de produtos com scroll suave
function scrollToProdutos() {
  $('html, body').animate({
    scrollTop: $('#app').offset().top
  }, {
    duration: 1000, // Ajuste a velocidade de rolagem conforme necessário (em milissegundos)
    complete: function() {
      // Renderiza os produtos após a rolagem suave
    }
  });
}

// Adicionando evento de clique para cada empresa usando jQuery
$('.empresas li').on('click', scrollToProdutos);

// Chamar a função para renderizar os produtos quando o documento é carregado
$(document).ready(function() {
  renderizaProdutos(produtos);
});

// Função para renderizar os produtos
function renderizaProdutos(produtos) {
  let html = '';
  produtos.forEach((produto, index) => {
    html += renderizaProduto(produto, index);
  });
  document.querySelector('.loja').innerHTML = html;

  // Adicionar ouvinte de eventos para os botões "Adicionar"
  document.querySelectorAll('.btn-adicionar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      adicionarProdutoAoCarrinho(id);
    });
  });
}

// Função para adicionar um produto ao carrinho da empresa selecionada
function adicionarProdutoAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const empresaSelecionada = $('.empresas li.active').text();

  if (!carrinhoPorEmpresa[empresaSelecionada]) {
    carrinhoPorEmpresa[empresaSelecionada] = {};
  }

  if (!carrinhoPorEmpresa[empresaSelecionada][id]) {
    carrinhoPorEmpresa[empresaSelecionada][id] = { ...produto, quantidade: 1 };
  } else {
    carrinhoPorEmpresa[empresaSelecionada][id].quantidade++;
  }

  renderizaCarrinhoPorEmpresa(); // Renderiza o carrinho após adicionar um produto
}

// Função para remover um único produto do carrinho
function removerProdutoDoCarrinho(id, empresa) {
  if (carrinhoPorEmpresa[empresa] && carrinhoPorEmpresa[empresa][id]) {
    if (carrinhoPorEmpresa[empresa][id].quantidade === 1) {
      delete carrinhoPorEmpresa[empresa][id];
    } else {
      carrinhoPorEmpresa[empresa][id].quantidade--;
    }
    renderizaCarrinhoPorEmpresa(); // Renderiza o carrinho após remover um produto
  }
}

// Função para remover todos os produtos de um tipo do carrinho
function removerTodosProdutosDoPedido(id, empresa) {
  if (carrinhoPorEmpresa[empresa] && carrinhoPorEmpresa[empresa][id]) {
    delete carrinhoPorEmpresa[empresa][id];
    renderizaCarrinhoPorEmpresa(); // Renderiza o carrinho após remover todos os produtos de um tipo
  }
}

// Função para calcular o total de todos os produtos no carrinho
function calcularTotalTodosProdutos() {
    let totalTodosProdutos = 0;

    for (const empresa in carrinhoPorEmpresa) {
        for (const produtoId in carrinhoPorEmpresa[empresa]) {
            const produto = carrinhoPorEmpresa[empresa][produtoId];
            totalTodosProdutos += produto.preco * produto.quantidade;
        }
    }

    return totalTodosProdutos;
}


// Função para renderizar um único produto
function renderizaProduto(produto) {
  return `
    <div class="col-sm-4 mb-3">
      <div class="card">
        <div class="card loja__item">
          <img class="card-img-top" src="${produto.imagem}" alt="${produto.nome}">
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <small>R$${produto.preco.toFixed(2)}</small>
            <p class="card-text">${produto.descricao}</p>
            <button data-id="${produto.id}" class="btn btn-primary btn-adicionar">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
// Função para lidar com a pesquisa de clientes
function pesquisarCliente() {
  const termoPesquisa = document.getElementById('pesquisaCliente').value.toLowerCase();
  const clientesFiltrados = clientes.filter(cliente => cliente.toLowerCase().includes(termoPesquisa));
  
  const selectClientes = document.getElementById('clientes');
  selectClientes.innerHTML = ''; // Limpa as opções existentes
  
  // Adiciona as opções filtradas ao elemento select
  clientesFiltrados.forEach(cliente => {
      const option = document.createElement('option');
      option.textContent = cliente;
      option.value = cliente;
      selectClientes.appendChild(option);
  });
}

// Adiciona um ouvinte de evento para o campo de pesquisa
document.getElementById('pesquisaCliente').addEventListener('input', pesquisarCliente);

// Função para renderizar um único item do carrinho
function renderizaItemCarrinho(item) {
  return `
    <div class="card carrinho__item">
      <div class="card-body">
        <h5 class="card-title">${item.nome}</h5>
        <p class="card-text">Preço unidade: R$${item.preco.toFixed(2)} | Quantidade: ${item.quantidade}</p>
        <p class="card-text">Valor: R$${(item.preco * item.quantidade).toFixed(2)}</p>
        <button data-produto-id="${item.id}" class="btn btn-danger btn-remove">Remover 1</button>
        <button data-produto-id="${item.id}" class="btn btn-danger btn-remove-all">Remover Todos</button>
      </div>
    </div>
  `;
}

// Função para renderizar os itens do carrinho da empresa selecionada
function renderizaCarrinhoPorEmpresa() {
  let html = '';
  const empresaSelecionada = $('.empresas li.active').text();

  if (carrinhoPorEmpresa[empresaSelecionada]) {
    for (const produtoId in carrinhoPorEmpresa[empresaSelecionada]) {
      html += renderizaItemCarrinho(carrinhoPorEmpresa[empresaSelecionada][produtoId]);
    }
  }

  // Adiciona os itens do carrinho na div correta
  const carrinhoItens = document.querySelector('.carrinho__itens');
  carrinhoItens.innerHTML = html;

  // Adiciona eventos de clique para os botões de remover
  carrinhoItens.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.produtoId;
      removerProdutoDoCarrinho(id, empresaSelecionada);
    });
  });

  // Adiciona eventos de clique para os botões de remover todos
  carrinhoItens.querySelectorAll('.btn-remove-all').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.produtoId;
      removerTodosProdutosDoPedido(id, empresaSelecionada);
    });
  });

  // Atualiza o total do carrinho
  const { totalPreco, totalQuantidade } = calcularTotalCarrinho();
  renderCarrinhoTotal(totalPreco, totalQuantidade);
}



// Função para renderizar o total do carrinho
function renderCarrinhoTotal(totalPreco, totalQuantidade) {
  let html = `
    <h6>Total: <strong>R$${totalPreco.toFixed(2)}</strong> (${totalQuantidade} produtos)</h6>
    <div style="margin-top: 20px; border-radius: 10px; background-color: #f2f2f2; padding: 10px;">
      <label for="nomeVendedor" style="margin-right: 10px;">Nome do Vendedor:</label>
      <select id="nomeVendedor">
        ${vendedoresOptions.join('')}
      </select>
      <button id="enviarOrcamento" class="btn btn-success">Enviar Orçamento</button>
    </div>`;

  // Atualiza o total do carrinho
  document.querySelector('.carrinho__total').innerHTML = html;
  
  // Atualiza o total e a quantidade de produtos abaixo da lista de produtos
  const totalProdutosHTML = `
    <h6>Total: <strong>R$${totalPreco.toFixed(2)}</strong> (${totalQuantidade} produtos)</h6>`;
  document.querySelector('.total-produtos').innerHTML = totalProdutosHTML;

  // Adiciona evento de clique para o botão "Enviar Orçamento"
  document.getElementById('enviarOrcamento').addEventListener('click', enviarOrcamento);
}



// Função para enviar o orçamento
function enviarOrcamento() {
  const nomeVendedor = document.getElementById('nomeVendedor').value;
  const clienteSelecionado = document.getElementById('clientes').value;
  const total = document.querySelector('.carrinho__total strong').textContent.replace('R$', '');
  const produtosSelecionados = Object.values(carrinhoPorEmpresa[clienteSelecionado] || {}).map(produto => `${produto.quantidade}x ${produto.nome}`).join('%0A');

  if (total == '0') {
    alert("Adicione pelo menos 1 item a sua lista.");
    return;
  } else if (nomeVendedor == "Selecione") {
    alert("Selecione o Vendedor que deseja enviar o Orçamento.");
    return;
  } else if (!clientes[clienteSelecionado]) {
    clientes[clienteSelecionado] = [];
  }

  clientes[clienteSelecionado].push({ produtos: produtosSelecionados, total: total });

  renderizaClientes(); // Atualiza a lista de clientes
}

// Função para gerar o PDF da planilha de produtos e clientes
function gerarPlanilhaPDF() {
  const doc = new jsPDF();

  let y = 10;
  for (const cliente in clientes) {
      doc.text(`Cliente: ${cliente}`, 10, y);
      y += 5;

      clientes[cliente].forEach((pedido, index) => {
          doc.text(`Pedido ${index + 1}:`, 10, y);
          y += 5;
          doc.text(pedido.produtos, 10, y);
          y += 10;
          doc.text(`Total: R$${pedido.total}`, 10, y);
          y += 10;
      });

      y += 10; // Espaço entre clientes
  }

  // Adicionar total de todos os produtos
  const totalTodosProdutos = calcularTotalTodosProdutos();
  doc.text(`Total de todos os produtos: R$${totalTodosProdutos.toFixed(2)}`, 10, y);

  doc.save('planilha.pdf');
}
