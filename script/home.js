document.getElementById('form-pedido').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const produto = document.getElementById('produto').value;
    const horario = document.getElementById('horario').value;

    const pedido = {
        nome: nome,
        endereco: endereco,
        produto: produto,
        horario: horario,
        status: 'Em Execução',
        data: new Date().toLocaleDateString(), 
        horaPedido: horario,
        horaEntrada: new Date().toLocaleTimeString(), 
        horaSaida: null, 
    };

    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    document.getElementById('form-pedido').reset();

    listarPedidos();
});

function listarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    document.getElementById('listagemExecucao').innerHTML = '';
    document.getElementById('listagemEntrega').innerHTML = '';
    document.getElementById('listagemFinalizados').innerHTML = '';

    pedidos.forEach((pedido, index) => {
        const pedidoCard = document.createElement('div');
        pedidoCard.classList.add('pedido-card');
        pedidoCard.innerHTML = `
            <p><strong>Cliente:</strong> ${pedido.nome}</p>
            <p><strong>Produto:</strong> ${pedido.produto}</p>
            <p><strong>Endereço:</strong> ${pedido.endereco}</p>
            <p><strong>Horário:</strong> ${pedido.horaPedido}</p>
            <p><strong>Status:</strong> ${pedido.status}</p>
            <p><strong>Entrada:</strong> ${pedido.horaEntrada}</p>
            <p><strong>Saída:</strong> ${pedido.horaSaida || 'Ainda não saiu'}</p>
            <button onclick="mudarStatus(${index}, 'Em Entrega')">Mover para Entrega</button>
            <button onclick="finalizarPedido(${index})">Finalizar Pedido</button>
        `;

        if (pedido.status === 'Em Execução') {
            document.getElementById('listagemExecucao').appendChild(pedidoCard);
        } else if (pedido.status === 'Em Entrega') {
            document.getElementById('listagemEntrega').appendChild(pedidoCard);
        } else if (pedido.status === 'Finalizado') {
            document.getElementById('listagemFinalizados').appendChild(pedidoCard);
        }
    });
}

function mudarStatus(index, novoStatus) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos[index].status = novoStatus;

    if (novoStatus === 'Em Entrega') {
        pedidos[index].horaSaida = new Date().toLocaleTimeString(); 
    }

    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    listarPedidos();
}

function finalizarPedido(index) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos[index].status = 'Finalizado';
    pedidos[index].horaSaida = new Date().toLocaleTimeString(); 

    let pedidosFinalizados = JSON.parse(localStorage.getItem('pedidosFinalizados')) || [];
    pedidosFinalizados.push(pedidos[index]);

    pedidos.splice(index, 1);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    localStorage.setItem('pedidosFinalizados', JSON.stringify(pedidosFinalizados));

    window.location.href = './finalizados.html';
}

window.onload = listarPedidos;
