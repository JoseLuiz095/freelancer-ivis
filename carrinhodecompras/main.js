const produtos = [
  {
    id: 'p4',
    nome: 'Drywall',
    preco: 300,
    descricao: '',
    imagem: "../brand/produtos-carrinho-04.png"
  },
  {
    id: 'p2',
    nome: 'Tela Hexagonal 2',
    preco: 300,
    descricao: '',
    imagem: "../brand/produtos-carrinho-02.png"
  },
];

const clientes = {}; // Armazena os pedidos de cada cliente

function renderizaClientes() {
  const clientesOptions = Object.keys(clientes).map(cliente => `<option value="${cliente}">${cliente}</option>`);
  document.getElementById('clientes').innerHTML = clientesOptions.join('');
}

function renderizaProdutosFiltrados(textoPesquisa) {
  // código omitido
}

function renderizaProdutos() {
  let html = '';
  produtos.forEach((produto, index) => {
    html += renderizaProduto(produto, index);
  });
  document.querySelector('.loja').innerHTML = html; // Adicionando os produtos à div com classe 'loja'
}

// Chamar a função para renderizar os produtos
renderizaProdutos();


// código omitido...

function enviarOrcamento() {
  const nomeVendedor = document.getElementById('nomeVendedor').value;
  const clienteSelecionado = document.getElementById('clientes').value;
  const total = document.querySelector('.carrinho__total strong').textContent.replace('R$', '');
  const produtosSelecionados = Object.values(carrinhoItens).map(produto => `${produto.quantidade}x ${produto.nome}`).join('%0A');

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

  doc.save('planilha.pdf');
}

document.getElementById('gerarPlanilha').addEventListener('click', gerarPlanilhaPDF);
