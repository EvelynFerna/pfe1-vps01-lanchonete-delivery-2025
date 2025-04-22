window.onload = function() {
    const pedidosFinalizados = JSON.parse(localStorage.getItem('pedidosFinalizados')) || [];

    // Selecionando a tabela para exibir os pedidos
    const tabela = document.getElementById('carrinho-itens');

    // Verificando se há pedidos finalizados para exibir
    if (pedidosFinalizados.length === 0) {
        const noPedidosMessage = document.createElement('tr');
        noPedidosMessage.innerHTML = `<td colspan="9" style="text-align: center;">Nenhum pedido finalizado.</td>`;
        tabela.appendChild(noPedidosMessage);
    }

    pedidosFinalizados.forEach((pedido, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${pedido.nome}</td>
            <td>${pedido.endereco}</td>
            <td>${pedido.produto}</td>
            <td>${pedido.data}</td>
            <td>${pedido.horaPedido}</td>
            <td>${pedido.horaEntrada}</td>
            <td>${pedido.horaSaida}</td>
            <td><button onclick="apagarPedido(${index})">Apagar</button></td>
        `;
        tabela.appendChild(tr);
    });
}


function apagarPedido(index) {
    let pedidosFinalizados = JSON.parse(localStorage.getItem('pedidosFinalizados')) || [];

    
    pedidosFinalizados.splice(index, 1);

    
    localStorage.setItem('pedidosFinalizados', JSON.stringify(pedidosFinalizados));

    
    window.onload();
}
