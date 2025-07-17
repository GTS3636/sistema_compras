import { exibirGraficoProd } from "./graficos.js"
import { exibirGraficoUser } from "./graficos.js"

import { cadastrarProduto } from "./produto/cadastroProduto.js"
import { cadastrarUsuario } from "./usuario/cadastrarUsuario.js"
import { cadastrarCompra } from "./compra/cadastrarCompra.js"

import { loteUsuarios } from "./usuario/loteUsuario.js"
import { loteProduto } from "./produto/loteProduto.js"

import { listarProdutos } from "./produto/listarProdutos.js"
import { listarUsuarios } from "./usuario/listarUsuarios.js"
import { listarCompras } from "./compra/listarCompras.js"

import { atualizarProduto } from "./produto/atualizarProduto.js"
import { atualizarUsuario } from "./usuario/atualizarUsuario.js"
import { atualizarCompra } from "./compra/atualizarCompra.js"

import { excluirProduto } from "./produto/excluirProduto.js"
import { excluirUsuario } from "./usuario/excluirUsuario.js"
import { excluirCompra } from "./compra/excluirCompra.js"

import { consultarProduto } from "./produto/consultarProduto.js"
import { consultarUsuario } from "./usuario/consultarUsuario.js"

import { relatorioProduto } from "./produto/relatorioProduto.js"
import { relatorioUsuario } from "./usuario/relatorioUsuario.js"
import { relatorioComprasCompleto } from "./compra/relatorioComprasCompleto.js"

let selectionPages = document.getElementById("selectionPages")
let selectionServices = document.getElementById("selectionServices")

let dynamicMenu = document.getElementById("card")

function writeCardWelcome() {
    dynamicMenu.innerHTML = `
        <h2>Bem-vindo ao sistema</h2>
        <p><span></span>Use os seletores acima para navegar entre diferentes funcionalidades do sistema.</p>
        <p><span></span>Você pode cadastrar, consultar, atualizar ou excluir dados de produtos, compras e usuários por aqui.</p>
    `
}
writeCardWelcome()

function controleMenu() {
    selectionPages.addEventListener("change", (e) => {
        e.preventDefault()
        selectionServices.value = "none"
        writeCardWelcome()
        if (selectionPages.value == "compra") {
            if (selectionServices.querySelector("option[value='lote']")) {
                selectionServices.querySelector("option[value='lote']").remove()
            }
            if (selectionServices.querySelector("option[value='consultar']")) {
                selectionServices.querySelector("option[value='consultar']").remove()
            }
        }
        else {
            if (!selectionServices.querySelector("option[value='lote']")) {
                let optionLote = document.createElement("option")
                optionLote.value = "lote"
                optionLote.textContent = "Lote"
                selectionServices.appendChild(optionLote)
            }
            if (!selectionServices.querySelector("option[value='consultar']")) {
                let optionConsultar = document.createElement("option")
                optionConsultar.value = "consultar"
                optionConsultar.textContent = "Consultar"
                selectionServices.appendChild(optionConsultar)
            }
        }
    })
    selectionServices.addEventListener("change", (e) => {
        e.preventDefault()
        dynamicMenu.innerHTML = ""

        let page = selectionPages.value
        let service = selectionServices.value

        if (page == "none" || service == "none") {
            writeCardWelcome()
        }

        // ===================================================

        if (page == "produto" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
                <h2>Cadastrar Produto</h2>
                <form id="formCadastroProduto">
                    <label for="titulo">Digite o título do produto: </label>
                    <input type="text" id="titulo" placeholder="Título do Produto" required><br>
                    
                    <label for="descricao">Digite a descrição do produto: </label>
                    <textarea id="descricao" placeholder="Descrição do Produto"></textarea><br>
                    
                    <label for="categoria">Digite a categoria do produto: </label>
                    <input type="text" id="categoria" placeholder="Categoria do Produto" required><br>
                    
                    <label for="preco">Digite o preço do produto: </label>
                    <input type="number" id="preco" placeholder="Preço do Produto" step="0.01" required><br>
                    
                    <label for="percetualDesconto">Digite o percentual de desconto do produto: </label><
                    <input type="number" id="percetualDesconto" placeholder="Percentual de Desconto (opcional)" step="0.01"><br>
                    
                    <label for="estoque">Digite o estoque do produto: </label>
                    <input type="number" id="estoque" placeholder="Estoque Disponível" required><br>
                    
                    <label for="marca">Digite a marca do produto: </label>
                    <input type="text" id="marca" placeholder="Marca do Produto" required><br>
                    
                    <label for="thumbnail">Digite o link da thumbnail do produto: </label>
                    <input type="text" id="thumbnail" placeholder="Thumbnail do Produto" required><br>

                    <button id="cadastroProduto">Cadastrar</button><br>
                </form>
                <div id="res"></div>
            `
            cadastrarProduto()
        }

        if (page == "produto" && service == "listar") {
            dynamicMenu.innerHTML = `
                <h2>Listar Produtos</h2>
                <div id="res"></div>
            `
            listarProdutos()
        }

        if (page == "produto" && service == "atualizar") {
            dynamicMenu.innerHTML = `
                <h2>Atualizar Produto</h2>
                <form id="formAtualizarProduto">
                    <label for="idProduto">Digite o COD do produto: </label>
                    <input type="number" id="idProduto" placeholder="ID do Produto" min="1" required><br>
                    
                    <label for="titulo">Digite o titulo do produto: </label>
                    <input type="text" id="titulo" placeholder="Novo Título do Produto"><br>
                    
                    <label for="descricao">Digite a descrição do produto: </label>
                    <textarea id="descricao" placeholder="Nova Descrição do Produto"></textarea><br>
                    
                    <label for="categoria">Digite a categoria do produto: </label>
                    <input type="text" id="categoria" placeholder="Nova Categoria do Produto"><br>
                    
                    <label for="preco">Digite o preco do produto: </label>
                    <input type="number" id="preco" placeholder="Novo Preço do Produto" min="0" step="0.01"><br>
                    
                    <label for="percetualDesconto">Digite o percentual de desconto do produto: </label>
                    <input type="number" id="percetualDesconto" placeholder="Novo Percentual de Desconto (opcional)" step="0.01"><br>
                    
                    <label for="estoque">Digite o estoque do produto: </label>
                    <input type="number" id="estoque" placeholder="Novo Estoque Disponível" min="1"><br>
                    
                    <label for="marca">Digite a marca do produto: </label>
                    <input type="text" id="marca" placeholder="Nova Marca do Produto"><br>

                    <label for="thumbnail">Digite a thumbnail do produto: </label>
                    <input type="text" id="thumbnail" placeholder="Nova Thumbnail do Produto"><br>

                    <select id="selecaoAcao">
                        <option value="none">Selecione uma ação</option>
                        <option value="consultar">Consultar</option>
                        <option value="atualizar">Atualizar</option>
                    </select><br>
                </form>
                <div id="res"></div>
            `
            atualizarProduto()
        }

        if (page == "produto" && service == "deletar") {
            dynamicMenu.innerHTML = `
                <h2>Excluir Produto</h2>
                <form id="formExcluirProduto">
                    <input type="number" id="idProdutoExcluir" placeholder="COD do Produto a ser Excluído..." min="1" required><br>
                    <button id="excluirProduto">Excluir</button>
                </form>
                <div id="res"></div>
            `
            excluirProduto()
        }

        if (page == "produto" && service == "lote") {
            dynamicMenu.innerHTML = `
                <h2>Gerenciar Lote de Produtos</h2>
                <button id="cadastrarLote">Cadastrar Lote</button>
                <div id="res"></div>
            `
            loteProduto()
        }

        if (page == "produto" && service == "consultar") {
            dynamicMenu.innerHTML = `
                <h2>Consultar Produto</h2>
                <form id="formConsultarProduto">
                    <label for="nomeProdutoConsultar">Digite o nome do produto a ser consultado: </label>
                    <input type="text" id="nomeProdutoConsultar" placeholder="Nome do Produto a ser Consultado..." min="1" required><br>

                    <label for="idProdutoConsultar">Digite o COD do produto a ser consultado: </label>
                    <input type="number" id="idProdutoConsultar" placeholder="ID do Produto a ser Consultado..." required><br>
                    <button id="consultarProduto">Consultar</button>
                </form>
                <div id="res"></div>
            `
            consultarProduto()
        }

        if (page == "produto" && service == "relatorio") {
            dynamicMenu.innerHTML = `
                <h2>Relatório de Produtos</h2>
                <div id="resRelatProd"></div><br>

                <h2>Gráfico de Produtos</h2>
                <label for="limiteGrafProd">Digite o limite de filtragem do gráfico: </label>
                <input type="number" id="limiteGrafProd" placeholder="Limite de filtragem do gráfico..." min="1" max="10">

                <label for="minGrafProd">Digite o mínimo de filtragem do gráfico: </label>
                <input type="number" id="minGrafProd" placeholder="Mínimo de filtragem do gráfico..." min="0" max="10">

                <button id="exibirGraficoProd">Exibir gráfico</button>
                <canvas id="resGrafProd"></canvas>
            `
            exibirGraficoProd()
            relatorioProduto()
        }

        // ===================================================

        if (page == "usuario" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
                <h2>Cadastrar Usuário</h2>
                <form id="formCadastroUsuario">
                    <label for="primeiroNome">Digite o primeiro nome do usuário: </label>
                    <input type="text" id="primeiroNome" placeholder="Primeiro nome do Usuário..." required>

                    <label for="segundoNome">Digite o segundo nome do usuário: </label>
                    <input type="text" id="segundoNome" placeholder="Segundo nome do Usuário..." required>
                    
                    <label for="idade">Digite a idade do usuário: </label>
                    <input type="number" id="idade" placeholder="Idade do Usuário..." required>
                    
                    <label for="telefone">Digite o telefone do usuário: </label>
                    <input type="text" id="telefone" placeholder="Telefone do Usuário..." required>
                    
                    <label for="endereco">Digite o endereço do usuário: </label>
                    <input type="text" id="endereco" placeholder="Endereço do Usuário..." required>
                    
                    <label for="cidade">Digite a cidade do usuário: </label>
                    <input type="text" id="cidade" placeholder="Cidade do Usuário..." required>
                    
                    <label for="estado">Digite o estado do usuário: </label>
                    <input type="text" id="estado" placeholder="Estado do Usuário..." required>
                    
                    <label for="dataNascimento">Digite a data de nascimento do usuário: </label>
                    <input type="date" id="dataNascimento" placeholder="Data de nascimento do Usuário..." required>
                    
                    <label for="email">Digite o email do usuário: </label>
                    <input type="email" id="email" placeholder="Email do Usuário" required>

                    <button id="cadastroUsuario">Cadastrar</button>
                </form><br>
                <div id="res"></div>
            `
            cadastrarUsuario()
        }

        if (page == "usuario" && service == "listar") {
            dynamicMenu.innerHTML = `
                <h2>Listar Usuários</h2>
                <div id="res"></div>
            `
            listarUsuarios()
        }

        if (page == "usuario" && service == "atualizar") {
            dynamicMenu.innerHTML = `
                <h2>Atualizar Usuário</h2>
                <form id="formAtualizarUsuario">
                    <label for="idUsuario">Digite o COD do usuário: </label>
                    <input type="number" id="idUsuario" placeholder="ID do Usuário" min="1" required>
                    
                    <label for="primeiroNome">Digite o primeiro do usuário: </label>
                    <input type="text" id="primeiroNome" placeholder="Novo Primeiro Nome do Usuário">
                    
                    <label for="segundoNome">Digite o segundo do usuário: </label>
                    <input type="text" id="segundoNome" placeholder="Novo Segundo Nome do Usuário">
                    
                    <label for="idade">A idade do usuário: </label>
                    <input type="number" id="idade" placeholder="Nova Idade do Usuário" readonly>
                    
                    <label for="telefone">Digite o telefone do usuário: </label>
                    <input type="text" id="telefone" placeholder="Novo Telefone do Usuário">
                    
                    <label for="endereco">Digite o endereco do usuário: </label>
                    <input type="text" id="endereco" placeholder="Novo Endereço do Usuário">
                    
                    <label for="cidade">Digite a cidade do usuário: </label>
                    <input type="text" id="cidade" placeholder="Nova Cidade do Usuário">
                    
                    <label for="estado">Digite o estado do usuário: </label>
                    <input type="text" id="estado" placeholder="Novo Estado do Usuário">
                    
                    <label for="dataNascimento">Digite a data de nascimento do usuário: </label>
                    <input type="date" id="dataNascimento" placeholder="Nova Data de Nascimento do Usuário">

                    <select id="selecaoAcao">
                        <option value="none">Selecione uma ação...</option>
                        <option value="consultar">Consultar</option>
                        <option value="atualizar">Atualizar</option>
                    </select>
                </form>
                <div id="res"></div>
            `
            atualizarUsuario()
        }

        if (page == "usuario" && service == "deletar") {
            dynamicMenu.innerHTML = `
                <h2>Excluir Usuário</h2>
                <form id="formExcluirUsuario">
                    <label for="idUsuarioExcluir">Digite o COD do usuário a ser excluído: </label>
                    <input type="number" id="idUsuarioExcluir" placeholder="COD do Usuário a ser Excluído..." min="1" required>
                    <button id="excluirUsuario">Excluir</button>
                </form>
                <div id="res"></div>
            `
            excluirUsuario()
        }

        if (page == "usuario" && service == "lote") {
            dynamicMenu.innerHTML = `
                <h2>Gerenciar Lote de Usuários</h2>
                <button id="cadastrarLoteUsuarios">Cadastrar Lote</button>
                <div id="res"></div>
            `
            loteUsuarios()
        }

        if (page == "usuario" && service == "consultar") {
            dynamicMenu.innerHTML = `
                <h2>Consultar Usuário</h2>
                <form id="formConsultarUsuario">
                    <label for="nomeUsuarioConsultar">Digite o nome do usuário a ser consultado: </label>
                    <input type="text" id="nomeUsuarioConsultar" placeholder="Nome do Usuário a ser Consultado..." min="1" required>

                    <label for="idUsuarioConsultar">Digite o COD do usuário a ser consultado: </label>
                    <input type="number" id="idUsuarioConsultar" placeholder="COD do Usuário a ser Consultado..." required>
                    <button id="consultarUsuario">Consultar</button>
                </form>
                <div id="res"></div>
            `
            consultarUsuario()
        }

        if (page == "usuario" && service == "relatorio") {
            dynamicMenu.innerHTML = `
                <h2>Relatório de Usuários</h2>
                <div id="resRelatUsu"></div><br>

                <h2>Gráfico de Usuários</h2>
                <label for="limiteGrafUser">Digite o limite de filtragem do gráfico: </label>
                <input type="number" id="limiteGrafUser" placeholder="Limite de filtragem do gráfico..." min="1" max="10">

                <label for="minGrafUser">Digite o mínimo de filtragem do gráfico: </label>
                <input type="number" id="minGrafUser" placeholder="Mínimo de filtragem do gráfico..." min="0" max="10">

                <button id="exibirGraficoUser">Exibir gráfico</button>
                <canvas id="resGrafUser"></canvas>
            `
            exibirGraficoUser()
            relatorioUsuario()
        }

        // ===================================================

        if (page == "compra" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
                <h2>Cadastrar Compra</h2>
                <form id="formCadastroCompra">
                    <label for="idUsuario">Digite o COD do usuário: </label>
                    <input type="number" id="idUsuario" placeholder="ID do Usuário..." required>

                    <label for="idProduto">Digite o COD do produto: </label>
                    <input type="number" id="idProduto" placeholder="ID do Produto..." required>

                    <label for="quantidade">Digite a quantidade: </label>
                    <input type="number" id="quantidade" placeholder="Quantidade..." required>

                    <label for="formaPagamento">Selecione a forma de pagamento da compra: </label>
                    <select id="formaPagamento" required>
                        <option value="" disabled selected>Selecione uma forma de pagamento...</option>
                        <option value="cartao">Cartão</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="pix">Pix</option>
                        <option value="boleto">Boleto</option>
                    </select>
                    
                    <label for="status">Selecione o status da compra: </label>
                    <select id="status" required>
                        <option value="" disabled selected>Selecione um status...</option>
                        <option value="pendente">Pendente</option>
                        <option value="aprovada">Aprovada</option>
                        <option value="finalizada">Finalizada</option>
                    </select><br>
                    <button id="cadastrarCompra">Cadastrar</button>
                </form><br>
                <div id="res"></div>
            `
            cadastrarCompra()
        }

        if (page == "compra" && service == "listar") {
            dynamicMenu.innerHTML = `
                <h2>Listar Compras</h2>
                <div id="res"></div>
            `
            listarCompras()
        }

        if (page == "compra" && service == "atualizar") {
            dynamicMenu.innerHTML = `
                <h2>Atualizar Compra</h2>
                <form id="formAtualizarCompra">
                    <label for="idCompra">Digite o COD da compra: </label>
                    <input type="number" id="idCompra" placeholder="ID da Compra..." min="1" required>

                    <label for="idUsuario">Digite o COD do usuário: </label>
                    <input type="number" id="idUsuario" placeholder="ID do Usuário...">

                    <label for="idProduto">Digite o COD do produto: </label>
                    <input type="number" id="idProduto" placeholder="ID do Produto...">

                    <label for="quantidade">Digite a quantidade: </label>
                    <input type="number" id="quantidade" placeholder="Quantidade...">

                    <label for="dataCompra">Digite a data da compra: </label>
                    <input type="date" id="dataCompra" placeholder="Data da compra...">
                    
                    <label for="status">Selecione o status da compra: </label>
                    <select id="status" required>
                        <option value="" disabled selected>Selecione um status...</option>
                        <option value="pendente">Pendente</option>
                        <option value="aprovada">Aprovada</option>
                        <option value="finalizada">Finalizada</option>
                    </select>

                    <label for="precoUnitario">Digite o preço unitário da compra: </label>
                    <input type="number" id="precoUnitario" placeholder="Preço unitário...">

                    <label for="formaPagamento">Selecione a forma de pagamento da compra: </label>
                    <select id="formaPagamento" required>
                        <option value="" disabled selected>Selecione uma forma de pagamento...</option>
                        <option value="cartao">Cartão</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="pix">Pix</option>
                        <option value="boleto">Boleto</option>
                    </select>

                    <select id="selecaoAcao">
                        <option value="none">Selecione uma ação...</option>
                        <option value="consultar">Consultar</option>
                        <option value="atualizar">Atualizar</option>
                    </select>
                </form>
                <div id="res"></div>
            `
            atualizarCompra()
        }

        if (page == "compra" && service == "deletar") {
            dynamicMenu.innerHTML = `
                <h2>Excluir Compra</h2>
                <form id="formExcluirCompra">
                    <label for="idCompraExcluir">Digite o COD da compra a ser excluída: </label>
                    <input type="number" id="idCompraExcluir" placeholder="COD da Compra a ser Excluída..." min="1" required><br>
                    <button id="excluirCompra">Excluir</button>
                </form>
                <div id="res"></div>
            `
            excluirCompra()
        }

        if (page == "compra" && service == "relatorio") {
            dynamicMenu.innerHTML = `
                <h2>Relatório de Compras</h2>
                <div id="resRelatCompras"></div><br>

                <h2>Relatório de Estoque Crítico</h2>
                <div id="resRelatCompEstoqCritic"></div><br>

                <h2>Relatório Consolidado</h2>
                <div id="resRelatCompConsolidado"></div><br>
            `
            relatorioComprasCompleto()
        }
    })
}
controleMenu()