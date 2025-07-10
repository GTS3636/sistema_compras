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
        }
        else {
            if (!selectionServices.querySelector("option[value='lote']")) {
                let optionLote = document.createElement("option")
                optionLote.value = "lote"
                optionLote.textContent = "Lote"
                selectionServices.appendChild(optionLote)
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
                  <input type="text" id="titulo" placeholder="Título do Produto" required><br><br>

                  <textarea id="descricao" placeholder="Descrição do Produto"></textarea><br><br>

                  <input type="text" id="categoria" placeholder="Categoria do Produto" required><br><br>

                  <input type="number" id="preco" placeholder="Preço do Produto" step="0.01" required><br><br>

                  <input type="number" id="percetualDesconto" placeholder="Percentual de Desconto (opcional)" step="0.01"><br><br>

                  <input type="number" id="estoque" placeholder="Estoque Disponível" required><br><br>

                  <input type="text" id="marca" placeholder="Marca do Produto" required><br><br>
                  
                  <input type="file" id="thumbnail" required><br><br>

                  <button id="cadastroProduto">Cadastrar</button>
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
                    <input type="text" id="idProduto" placeholder="ID do Produto" required><br><br>

                    <input type="text" name="titulo" placeholder="Novo Título do Produto"><br><br>

                    <textarea name="descricao" placeholder="Nova Descrição do Produto"></textarea><br><br>

                    <input type="text" id="categoria" placeholder="Nova Categoria do Produto"><br><br>

                    <input type="number" id="preco" placeholder="Novo Preço do Produto" step="0.01"><br><br>

                    <input type="number" id="percetualDesconto" placeholder="Novo Percentual de Desconto (opcional)" step="0.01"><br><br>

                    <input type="number" id="estoque" placeholder="Novo Estoque Disponível"><br><br>

                    <input type="text" id="marca" placeholder="Nova Marca do Produto"><br><br>

                    <select id="selecaoAcao">
                        <option value="none">Selecione uma ação</option>
                        <option value="consultar">Consultar</option>
                        <option value="atualizar">Atualizar</option>
                    </select><br><br>
                </form>
                <div id="res"></div>
            `
        }

        if (page == "produto" && service == "deletar") {
            dynamicMenu.innerHTML = `
                <h2>Excluir Produto</h2>
                <form id="formExcluirProduto">
                    <input type="number" id="idProdutoExcluir" placeholder="COD do Produto a ser Excluído..." required><br><br>
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
                    <input type="text" id="idProdutoConsultar" placeholder="ID do Produto a ser Consultado..." required><br><br>
                    <button id="consultarProduto">Consultar</button>
                </form>
                <div id="res"></div>
            `
            consultarProduto()
        }

        // ===================================================

        if (page == "usuario" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
                <h2>Cadastrar Usuário</h2>
                <form id="formCadastroUsuario">
                    <label for="primeiroNome">Digite o primeiro nome do usuário: </label><br><br>
                    <input type="text" id="primeiroNome" placeholder="Primeiro nome do Usuário..." required><br><br>

                    <label for="segundoNome">Digite o segundo nome do usuário: </label><br><br>
                    <input type="text" id="segundoNome" placeholder="Segundo nome do Usuário..." required><br><br>
                    
                    <label for="idade">Digite a idade do usuário: </label><br><br>
                    <input type="number" id="idade" placeholder="Idade do Usuário..." required><br><br>
                    
                    <label for="telefone">Digite o telefone do usuário: </label><br><br>
                    <input type="text" id="telefone" placeholder="Telefone do Usuário..." required><br><br>
                    
                    <label for="endereco">Digite o endereço do usuário: </label><br><br>
                    <input type="text" id="endereco" placeholder="Endereço do Usuário..." required><br><br>
                    
                    <label for="cidade">Digite a cidade do usuário: </label><br><br>
                    <input type="text" id="cidade" placeholder="Cidade do Usuário..." required><br><br>
                    
                    <label for="estado">Digite o estado do usuário: </label><br><br>
                    <input type="text" id="estado" placeholder="Estado do Usuário..." required><br><br>
                    
                    <label for="dataNascimento">Digite a data de nascimento do usuário: </label><br><br>
                    <input type="date" id="dataNascimento" placeholder="Data de nascimento do Usuário..." required><br><br>
                    
                    <label for="email">Digite o email do usuário: </label><br><br>
                    <input type="email" id="email" placeholder="Email do Usuário" required><br><br>

                    <button id="cadastroUsuario">Cadastrar</button>
                </form><br><br>
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
                    <label for="idUsuario">Digite o COD do usuário: </label><br><br>
                    <input type="number" id="idUsuario" placeholder="ID do Usuário" required><br><br>
                    
                    <label for="primeiroNome">Digite o primeiro do usuário: </label><br><br>
                    <input type="text" id="primeiroNome" placeholder="Novo Primeiro Nome do Usuário"><br><br>
                    
                    <label for="segundoNome">Digite o segundo do usuário: </label><br><br>
                    <input type="text" id="segundoNome" placeholder="Novo Segundo Nome do Usuário"><br><br>
                    
                    <label for="idade">Digite a idade do usuário: </label><br><br>
                    <input type="number" id="idade" placeholder="Nova Idade do Usuário"><br><br>
                    
                    <label for="telefone">Digite o telefone do usuário: </label><br><br>
                    <input type="text" id="telefone" placeholder="Novo Telefone do Usuário"><br><br>
                    
                    <label for="endereco">Digite o endereco do usuário: </label><br><br>
                    <input type="text" id="endereco" placeholder="Novo Endereço do Usuário"><br><br>
                    
                    <label for="cidade">Digite a cidade do usuário: </label><br><br>
                    <input type="text" id="cidade" placeholder="Nova Cidade do Usuário"><br><br>
                    
                    <label for="estado">Digite o estado do usuário: </label><br><br>
                    <input type="text" id="estado" placeholder="Novo Estado do Usuário"><br><br>
                    
                    <label for="dataNascimento">Digite a data de nascimento do usuário: </label><br><br>
                    <input type="date" id="dataNascimento" placeholder="Nova Data de Nascimento do Usuário"><br><br>

                    <select id="selecaoAcao">
                        <option value="none">Selecione uma ação...</option>
                        <option value="consultar">Consultar</option>
                        <option value="atualizar">Atualizar</option>
                    </select><br><br>
                </form>
                <div id="res"></div>
            `
            atualizarProduto()
        }

        if (page == "usuario" && service == "deletar") {
            dynamicMenu.innerHTML = `
                <h2>Excluir Usuário</h2>
                <form id="formExcluirUsuario">
                    <label for="idUsuarioExcluir">Digite o COD do usuário a ser excluído: </label><br><br>
                    <input type="number" id="idUsuarioExcluir" placeholder="COD do Usuário a ser Excluído..." required><br><br>
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
            cadastrarLoteUsuarios()
        }

        if (page == "usuario" && service == "consultar") {
            dynamicMenu.innerHTML = `
                <h2>Consultar Usuário</h2>
                <form id="formConsultarUsuario">
                    <label for="idUsuarioConsultar">Digite o COD do usuário a ser consultado: </label><br><br>
                    <input type="number" id="idUsuarioConsultar" placeholder="COD do Usuário a ser Consultado..." required><br><br>
                    <button id="consultarUsuario">Consultar</button>
                </form>
                <div id="res"></div>
            `
            consultarUsuario()
        }

        // ===================================================

        if (page == "compra" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
                <h2>Cadastrar Compra</h2>
                <form id="formCadastroCompra">
                    <label for="idUsuario">Digite o COD do usuário: </label><br><br>
                    <input type="number" id="idUsuario" placeholder="ID do Usuário..." required><br><br>

                    <label for="idProduto">Digite o COD do produto: </label><br><br>
                    <input type="number" id="idProduto" placeholder="ID do Produto..." required><br><br>

                    <label for="quantidade">Digite a quantidade: </label><br><br>
                    <input type="number" id="quantidade" placeholder="Quantidade..." required><br><br>
                    
                    <label for="dataCompra">Digite a data da compra: </label><br><br>
                    <input type="date" id="dataCompra" placeholder="Data da compra..." required><br><br>

                    <label for="precoUnitario">Digite o preço unitário da compra: </label><br><br>
                    <input type="number" id="precoUnitario" placeholder="Preço unitário..." required><br><br>

                    <label for="formaPagamento">Digite a forma de pagamento da compra: </label><br><br>
                    <input type="text" id="formaPagamento" placeholder="Forma de pagamento..." required><br><br>
                    
                    <label for="status">Digite o status da compra: </label><br><br>
                    <input type="text" id="status" placeholder="Status..." required><br><br>

                    <button id="cadastrarCompra">Cadastrar</button>
                </form><br><br>
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
                    <label for="idCompra">Digite o COD da compra: </label><br><br>
                    <input type="number" id="idCompra" placeholder="ID da Compra..." required><br><br>

                    <label for="idUsuario">Digite o COD do usuário: </label><br><br>
                    <input type="number" id="idUsuario" placeholder="ID do Usuário..."><br><br>

                    <label for="idProduto">Digite o COD do produto: </label><br><br>
                    <input type="number" id="idProduto" placeholder="ID do Produto..."><br><br>

                    <label for="quantidade">Digite a quantidade: </label><br><br>
                    <input type="number" id="quantidade" placeholder="Quantidade..."><br><br>

                    <label for="dataCompra">Digite a data da compra: </label><br><br>
                    <input type="date" id="dataCompra" placeholder="Data da compra..."><br><br>

                    <label for="precoUnitario">Digite o preço unitário da compra: </label><br><br>
                    <input type="number" id="precoUnitario" placeholder="Preço unitário..."><br><br>

                    <label for="formaPagamento">Digite a forma de pagamento da compra: </label><br><br>
                    <input type="text" id="formaPagamento" placeholder="Forma de pagamento..."><br><br>

                    <select id="selecaoAcao">
                        <option value="none">Selecione uma ação...</option>
                        <option value="consultar">Consultar</option>
                        <option value="atualizar">Atualizar</option>
                    </select><br><br>
                </form>
                <div id="res"></div>
            `
            atualizarCompra()
        }

        if (page == "compra" && service == "deletar") {
            dynamicMenu.innerHTML = `
                <h2>Excluir Compra</h2>
                <form id="formExcluirCompra">
                    <label for="idCompraExcluir">Digite o COD da compra a ser excluída: </label><br><br>
                    <input type="number" id="idCompraExcluir" placeholder="COD da Compra a ser Excluída..." required><br><br>
                    <button id="excluirCompra">Excluir</button>
                </form>
                <div id="res"></div>
            `
            excluirCompra()
        }

        if (page == "compra" && service == "consultar") {
            dynamicMenu.innerHTML = `
                <h2>Consultar Compra</h2>
                <form id="formConsultarCompra">
                    <label for="idCompraConsultar">Digite o COD da compra a ser consultada: </label><br><br>
                    <input type="number" id="idCompraConsultar" placeholder="COD da Compra a ser Consultada..." required><br><br>
                    <button id="consultarCompra">Consultar</button>
                </form>
                <div id="res"></div>
            `
            consultarCompra()
        }
    })
}
controleMenu()

// ------------------------------------
// Funções para manipulação de produtos
// ------------------------------------

function cadastrarProduto() {
    let cadastroProduto = document.getElementById("cadastroProduto")
    let res = document.getElementById("res")
    cadastroProduto.disabled = false
    cadastroProduto.textContent = "Cadastrar"
    res.innerHTML = ``

    cadastroProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        let titulo = document.getElementById("titulo").value
        let descricao = document.querySelector("textarea[id='descricao']").value
        let categoria = document.getElementById("categoria").value
        let preco = parseFloat(document.getElementById("preco").value)
        let percentualDesconto = parseFloat(document.getElementById("percetualDesconto").value) || 0
        let estoque = parseInt(document.getElementById("estoque").value)
        let marca = document.getElementById("marca").value
        let thumbnail = document.getElementById("thumbnail").files[0]

        const valores = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            preco: preco,
            percentualDesconto: percentualDesconto,
            estoque: estoque,
            marca: marca,
            thumbnail: thumbnail ? thumbnail.name : null
        }

        cadastroProduto.textContent = "Cadastrando..."
        cadastroProduto.disabled = true

        await fetch("http://localhost:3000/produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar produto")
                return resp.json()
            })
            .then(produto => {
                res.innerHTML = ``
                res.innerHTML += `
                    <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Desconto</th>
                                        <th>Estoque</th>
                                        <th>Marca</th>
                                        <th>Thumbnail</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyProdutos">
                                    <tr>
                                        <td>${produto.id}</td>
                                        <td>${produto.titulo}</td>
                                        <td>${produto.descricao}</td>
                                        <td>${produto.categoria}</td>
                                        <td>R$ ${produto.preco.toFixed(2)}</td>
                                        <td>${produto.percentualDesconto ? produto.percentualDesconto + "%" : "Não possui desconto"}</td>
                                        <td>${produto.estoque}</td>
                                        <td>${produto.marca || "Sem marca registrada"}</td>
                                        <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" max-width="75" max-height="60"></td>
                                    </tr>
                                </tbody>
                            </table>
                `
                alert("Produto cadastrado com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar produto:", err)
                alert("Erro ao cadastrar produto. Verifique os dados e tente novamente.")
                cadastroProduto.textContent = "Cadastrar"
                cadastroProduto.disabled = false
            })
            .finally(() => {
                document.getElementById("formCadastroProduto").reset()
                cadastroProduto.textContent = "Cadastrar"
                cadastroProduto.disabled = false
            })
    })
}

async function listarProdutos() {
    let res = document.getElementById("res")
    res.innerHTML = ``

    listarProdutos.textContent = "Carregando..."
    listarProdutos.disabled = true

    await fetch("http://localhost:3000/produto")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao receber a resposta no listar produtos")
            return resp.json()
        })
        .then(data => {
            res.innerHTML = ``
            if (data.length <= 0) {
                res.innerHTML += `<p>Nenhum produto cadastrado.</p>`
            } else {
                res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Desconto</th>
                                        <th>Estoque</th>
                                        <th>Marca</th>
                                        <th>Thumbnail</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyProdutos">
                                    
                                </tbody>
                            </table>
                        `
                data.forEach(produto => {
                    res.querySelector("#tbodyProdutos").innerHTML += `
                            <tr>
                                <td>${produto.id}</td>
                                <td>${produto.titulo}</td>
                                <td>${produto.descricao}</td>
                                <td>${produto.categoria}</td>
                                <td>R$ ${produto.preco.toFixed(2)}</td>
                                <td>${produto.percentualDesconto ? produto.percentualDesconto + "%" : "Não possui desconto"}</td>
                                <td>${produto.estoque}</td>
                                <td>${produto.marca || "Sem marca registrada"}</td>
                                <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" max-width="75" max-height="60"></td>
                            </tr>
                        `
                })
            }
            listarProdutos.textContent = "Listar Produtos"
            listarProdutos.disabled = false
        })
        .catch((err) => {
            console.error("Erro ao listar produtos: ", err)
            alert("Erro ao listar produtos. Tente novamente.")
            listarProdutos.textContent = "Listar Produtos"
            listarProdutos.disabled = false
        })
}

function atualizarProduto() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()
        let idProduto = document.getElementById("idProduto").value
        let titulo = document.querySelector("input[name='titulo']").value
        let descricao = document.querySelector("textarea[name='descricao']").value
        let categoria = document.getElementById("categoria").value
        let preco = parseFloat(document.getElementById("preco").value)
        let percentualDesconto = parseFloat(document.getElementById("percetualDesconto").value) || 0
        let estoque = parseInt(document.getElementById("estoque").value)
        let marca = document.getElementById("marca").value

        if (selecaoAcao.value === "none") {
            return
        } else if (selecaoAcao.value === "consultar" || "atualizar" && !idProduto) {
            res.innerHTML = `<p>Por favor, informe o ID do produto para consulta.</p>`
            alert("Por favor, informe o ID do produto para consulta.")
            return
        } else if (selecaoAcao.value === "consultar") {
            await fetch(`http://localhost:3000/produto/consultar/${idProduto}`)
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                    return resp.json()
                })
                .then(data => {
                    if (data) {
                        res.innerHTML = `
                            <h3>Produto Consultado:</h3>
                            <p>Título: ${data.titulo}</p>
                            <p>Descrição: ${data.descricao}</p>
                            <p>Categoria: ${data.categoria}</p>
                            <p>Preço: R$${data.preco.toFixed(2)}</p>
                            <p>Estoque: ${data.estoque}</p>
                            <p>Marca: ${data.marca}</p>
                        `
                    } else {
                        res.innerHTML = `<p>Produto não encontrado.</p>`
                        alert("Produto não encontrado. Verifique o ID e tente novamente.")
                    }
                    marca = data.marca ? data.marca : "Sem marca registrada"
                    titulo = data.titulo ? data.titulo : titulo
                    descricao = data.descricao ? data.descricao : descricao
                    categoria = data.categoria ? data.categoria : categoria
                    preco = data.preco ? parseFloat(data.preco) : preco
                    estoque = data.estoque ? parseInt(data.estoque) : estoque
                    percentualDesconto = data.percentualDesconto ? parseFloat(data.percentualDesconto) : percentualDesconto
                })
                .catch((err) => {
                    console.error("Erro ao consultar produto:", err)
                    alert("Erro ao consultar produto. Verifique o ID e tente novamente.")
                })
        }
        else if (selecaoAcao.value === "atualizar") {

        }

        const valores = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            preco: preco,
            percentualDesconto: percentualDesconto,
            estoque: estoque,
            marca: marca
        }

        if (selecaoAcao.value === "consultar") {
            // Implementar lógica de consulta aqui
            res.innerHTML = `<p>Consulta realizada com sucesso!</p>`
        } else if (selecaoAcao.value === "atualizar") {
            // Implementar lógica de atualização aqui
            res.innerHTML = `<p>Atualização realizada com sucesso!</p>`
        } else {
            res.innerHTML = `<p>Selecione uma ação válida.</p>`
        }
    })
}

function excluirProduto() {
    let excluirProduto = document.getElementById("excluirProduto")
    let res = document.getElementById("res")
    excluirProduto.disabled = false
    excluirProduto.textContent = "Excluir"

    excluirProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        let idProdutoExcluir = document.getElementById("idProdutoExcluir").value

        if (!idProdutoExcluir) {
            alert("Por favor, informe o ID do produto a ser excluído.")
            return
        }

        excluirProduto.textContent = "Excluindo..."
        excluirProduto.disabled = true

        await fetch(`http://localhost:3000/produto/${idProdutoExcluir}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir produto")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                res.innerHTML += `<p>${data.message}</p>`
                res.innerHTML += `<p>Produto ID ${idProdutoExcluir} excluído com sucesso!</p>`
                alert("Produto excluído com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao excluir produto:", err)
                alert("Erro ao excluir produto. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formExcluirProduto").reset()
                excluirProduto.textContent = "Excluir"
                excluirProduto.disabled = false
            })
    })
}

function consultarProduto() {
    let consultarProduto = document.getElementById("consultarProduto")
    let res = document.getElementById("res")
    consultarProduto.disabled = false
    consultarProduto.textContent = "Consultar"

    consultarProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        let idProdutoConsultar = document.getElementById("idProdutoConsultar").value

        if (!idProdutoConsultar) {
            alert("Por favor, informe o ID do produto a ser consultado.")
            return
        }

        consultarProduto.textContent = "Consultando..."
        consultarProduto.disabled = true

        await fetch(`http://localhost:3000/produto/consultar/${idProdutoConsultar}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                if (data) {
                    res.innerHTML = `<h3>Produto Consultado:</h3>`
                    res.innerHTML += `
                    <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Desconto</th>
                                        <th>Estoque</th>
                                        <th>Marca</th>
                                        <th>Thumbnail</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyProdutos">
                                    <tr>
                                        <td>${produto.id}</td>
                                        <td>${produto.titulo}</td>
                                        <td>${produto.descricao}</td>
                                        <td>${produto.categoria}</td>
                                        <td>R$ ${produto.preco.toFixed(2)}</td>
                                        <td>${produto.percentualDesconto ? produto.percentualDesconto + "%" : "Não possui desconto"}</td>
                                        <td>${produto.estoque}</td>
                                        <td>${produto.marca || "Sem marca registrada"}</td>
                                        <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" max-width="75" max-height="60"></td>
                                    </tr>
                                </tbody>
                            </table>
                    `
                } else {
                    res.innerHTML += `<p>Produto não encontrado.</p>`
                    alert("Produto não encontrado. Verifique o ID e tente novamente.")
                }
            })
            .catch((err) => {
                console.error("Erro ao consultar produto:", err)
                alert("Erro ao consultar produto. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                consultarProduto.textContent = "Consultar"
                consultarProduto.disabled = false
            })
    })
}

function loteProduto() {
    let cadastrarLote = document.getElementById("cadastrarLote")
    let res = document.getElementById("res")
    cadastrarLote.disabled = false
    cadastrarLote.textContent = "Cadastrar Lote"

    cadastrarLote.addEventListener("click", async (e) => {
        e.preventDefault()
        await fetch("https://dummyjson.com/products")
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote")
                return resp.json()
            })
            .then(data => {
                cadastrarLote.disabled = true
                cadastrarLote.textContent = "Cadastrando Lote..."
                res.innerHTML = ``
                res.innerHTML += `
                                <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Desconto</th>
                                        <th>Estoque</th>
                                        <th>Marca</th>
                                        <th>Thumbnail</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyProdutos">
                                    
                                </tbody>
                            </table>
                            `
                data.forEach(async produto => {
                    const valores = {
                        titulo: produto.title,
                        descricao: produto.description,
                        categoria: produto.category,
                        preco: produto.price,
                        percentualDesconto: produto.discountPercentage || 0,
                        estoque: produto.stock,
                        marca: produto.brand || "Sem marca registrada",
                        thumbnail: produto.thumbnail
                    }
                    await fetch("http://localhost:3000/produto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(valores)
                    })
                        .then(resp => {
                            if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote")
                            return resp.json()
                        })
                        .then(produto => {
                            res.querySelector("#tbodyProdutos").innerHTML += `
                                        <tr>
                                            <td>${produto.id}</td>
                                            <td>${produto.titulo}</td>
                                            <td>${produto.descricao}</td>
                                            <td>${produto.categoria}</td>
                                            <td>R$ ${produto.preco.toFixed(2)}</td>
                                            <td>${produto.percentualDesconto ? produto.percentualDesconto + "%" : "Não possui desconto"}</td>
                                            <td>${produto.estoque}</td>
                                            <td>${produto.marca || "Sem marca registrada"}</td>
                                            <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" max-width="75" max-height="60"></td>
                                        </tr>
                                    `
                        })
                        .catch((err) => {
                            console.error("Erro ao cadastrar lote de produtos:", err)
                            alert("Erro ao cadastrar lote de produtos. Verifique os dados e tente novamente.")
                        })
                        .finally(() => {
                            cadastrarLote.textContent = "Cadastrar Lote"
                            cadastrarLote.disabled = false
                        })
                })
            })
            .catch((err) => {
                console.error("Erro ao cadastrar lote de produtos:", err)
                alert("Erro ao cadastrar lote de produtos. Tente novamente.")
            })
    })
}

// ------------------------------------
// Funções para manipulação de usuários
// ------------------------------------

function cadastrarUsuario() {
    let cadastroUsuario = document.getElementById("cadastroUsuario")
    let res = document.getElementById("res")
    cadastroUsuario.disabled = false
    cadastroUsuario.textContent = "Cadastrar"

    cadastroUsuario.addEventListener("click", async (e) => {
        e.preventDefault()

        let primeiroNome = document.getElementById("primeiroNome").value
        let segundoNome = document.getElementById("segundoNome").value
        let idade = parseInt(document.getElementById("idade").value)
        let telefone = document.getElementById("telefone").value
        let endereco = document.getElementById("endereco").value
        let cidade = document.getElementById("cidade").value
        let estado = document.getElementById("estado").value
        let dataNascimento = document.getElementById("dataNascimento").value
        let email = document.getElementById("email").value

        if (!nome || !email || !senha || !telefone || !endereco || !cidade || !estado || !dataNascimento) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        const valores = {
            primeiroNome: primeiroNome,
            segundoNome: segundoNome,
            idade: idade,
            telefone: telefone,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            dataNascimento: dataNascimento,
            email: email
        }

        cadastroUsuario.textContent = "Cadastrando..."
        cadastroUsuario.disabled = true

        await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar usuário")
                return resp.json()
            })
            .then(usuario => {
                res.innerHTML = ``
                res.innerHTML += `<h2>Usuário cadastrado com sucesso!</h2>`
                res.innerHTML += `
                    <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    <tr>
                                        <td>${usuario.id}</td>
                                        <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                        <td>${usuario.idade}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.telefone}</td>
                                        <td>${usuario.endereco}</td>
                                        <td>${usuario.cidade}</td>
                                        <td>${usuario.estado}</td>
                                        <td>${usuario.dataNascimento}</td>
                                    </tr>
                                </tbody>
                            </table>
                `
                alert("Usuário cadastrado com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar usuário:", err)
                alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formCadastroUsuario").reset()
                cadastroUsuario.textContent = "Cadastrar"
                cadastroUsuario.disabled = false
            })
    })
}

async function listarUsuarios() {
    let res = document.getElementById("res")
    res.innerHTML = ``

    listarUsuarios.textContent = "Carregando..."
    listarUsuarios.disabled = true

    await fetch("http://localhost:3000/usuario")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao receber a resposta no listar usuários")
            return resp.json()
        })
        .then(data => {
            res.innerHTML = ``
            if (data.length <= 0) {
                res.innerHTML += `<p>Nenhum usuário cadastrado.</p>`
            } else {
                res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    
                                </tbody>
                            </table>
                        `
                data.forEach(usuario => {
                    res.querySelector("#tbodyUsuarios").innerHTML += `
                            <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                <td>${usuario.idade}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.telefone}</td>
                                <td>${usuario.endereco}</td>
                                <td>${usuario.cidade}</td>
                                <td>${usuario.estado}</td>
                                <td>${usuario.dataNascimento}</td>
                            </tr>
                        `
                })
            }
        })
        .catch((err) => {
            console.error("Erro ao listar usuários: ", err)
            alert("Erro ao listar usuários. Tente novamente.")
        })
        .finally(() => {
            listarUsuarios.textContent = "Listar Usuários"
            listarUsuarios.disabled = false
        })
}

function atualizarUsuario() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    let primeiroNome = document.getElementById("primeiroNome")
    let segundoNome = document.getElementById("segundoNome")
    let idade = parseInt(document.getElementById("idade"))
    let telefone = document.getElementById("telefone")
    let endereco = document.getElementById("endereco")
    let cidade = document.getElementById("cidade")
    let estado = document.getElementById("estado")
    let dataNascimento = document.getElementById("dataNascimento")

    primeiroNome.disabled = true
    segundoNome.disabled = true
    idade.disabled = true
    telefone.disabled = true
    endereco.disabled = true
    cidade.disabled = true
    estado.disabled = true
    dataNascimento.disabled = true

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()
        let idUsuario = document.getElementById("idUsuario").value

        if (selecaoAcao.value === "consultar" || "atualizar" && !idUsuario) {
            res.innerHTML = `<p>Por favor, informe o ID do usuário.</p>`
            alert("Por favor, informe o ID do usuário.")
            return
        }

        switch (selecaoAcao.value) {
            case "none":
                return
            case "consultar":
                await fetch(`http://localhost:3000/usuario/${idUsuario}`)
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar usuário")
                        return resp.json()
                    })
                    .then(usuario => {
                        if (usuario) {
                            primeiroNome.value = usuario.primeiroNome
                            segundoNome.value = usuario.segundoNome
                            idade.valueOf = usuario.idade
                            telefone.value = usuario.telefone
                            endereco.value = usuario.endereco
                            cidade.value = usuario.cidade
                            estado.value = usuario.estado
                            dataNascimento.value = usuario.dataNascimento

                            res.innerHTML = ``
                            res.innerHTML += `<h3>Usuário Consultado:</h3>`
                            res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    <tr>
                                        <td>${usuario.id}</td>
                                        <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                        <td>${usuario.idade}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.telefone}</td>
                                        <td>${usuario.endereco}</td>
                                        <td>${usuario.cidade}</td>
                                        <td>${usuario.estado}</td>
                                        <td>${usuario.dataNascimento}</td>
                                    </tr>
                                </tbody>
                            </table>
                            `

                            primeiroNome.disabled = false
                            segundoNome.disabled = false
                            idade.disabled = false
                            telefone.disabled = false
                            endereco.disabled = false
                            cidade.disabled = false
                            estado.disabled = false
                            dataNascimento.disabled = false
                        } else {
                            res.innerHTML += `
                            <p>Usuário não encontrado.</p>
                            `
                            alert("Usuário não encontrado. Verifique o ID e tente novamente.")
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar usuário:", err)
                        alert("Erro ao consultar usuário. Verifique o ID e tente novamente.")
                    })
                    .finally(() => {
                        selecaoAcao.value = "none"
                    })
            case "atualizar":
                const valores = {
                    primeiroNome: primeiroNome.value,
                    segundoNome: segundoNome.value,
                    idade: idade.value,
                    telefone: telefone.value,
                    endereco: endereco.value,
                    cidade: cidade.value,
                    estado: estado.value,
                    dataNascimento: dataNascimento.value
                }
                await fetch(`http://localhost:3000/usuario/${idUsuario}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no atualizar usuário")
                        return resp.json()
                    })
                    .then(usuario => {
                        res.innerHTML = ``
                        res.innerHTML += `<h3>Usuário Atualizado:</h3>`
                        res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    <tr>
                                        <td>${usuario.id}</td>
                                        <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                        <td>${usuario.idade}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.telefone}</td>
                                        <td>${usuario.endereco}</td>
                                        <td>${usuario.cidade}</td>
                                        <td>${usuario.estado}</td>
                                        <td>${usuario.dataNascimento}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                        alert("Usuário atualizado com sucesso!")
                    })
                    .catch((err) => {
                        console.error("Erro ao atualizar usuário:", err)
                        alert("Erro ao atualizar usuário. Verifique os dados e tente novamente.")
                    })
                    .finally(() => {
                        primeiroNome.value = ""
                        segundoNome.value = ""
                        idade.valueOf = ""
                        telefone.value = ""
                        endereco.value = ""
                        cidade.value = ""
                        estado.value = ""
                        dataNascimento.value = ""
                        selecaoAcao.value = "none"
                    })
        }
    })
}

function excluirUsuario() {
    let excluirUsuario = document.getElementById("excluirUsuario")
    let res = document.getElementById("res")
    excluirUsuario.disabled = false
    excluirUsuario.textContent = "Excluir"

    excluirUsuario.addEventListener("click", async (e) => {
        e.preventDefault()
        let idUsuarioExcluir = document.getElementById("idUsuarioExcluir").value

        if (!idUsuarioExcluir) {
            alert("Por favor, informe o ID do usuário a ser excluído.")
            return
        }

        excluirUsuario.disabled = true
        excluirUsuario.textContent = "Excluindo..."

        await fetch(`http://localhost:3000/usuario/${idUsuarioExcluir}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir usuário")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                res.innerHTML += `<p>${data.message}</p>`
                res.innerHTML += `<p>Usuário ID ${idUsuarioExcluir} excluído com sucesso!</p>`
                alert("Usuário excluído com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao excluir usuário:", err)
                alert("Erro ao excluir usuário. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formExcluirUsuario").reset()
                excluirUsuario.textContent = "Excluir"
                excluirUsuario.disabled = false
            })
    })
}

function cadastrarLoteUsuarios() {
    let cadastrarLoteUsuarios = document.getElementById("cadastrarLoteUsuarios")
    let res = document.getElementById("res")
    cadastrarLoteUsuarios.disabled = false
    cadastrarLoteUsuarios.textContent = "Cadastrar Lote"

    cadastrarLoteUsuarios.addEventListener("click", async (e) => {
        e.preventDefault()
        await fetch("https://dummyjson.com/users")
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote de usuários")
                return resp.json()
            })
            .then(data => {
                cadastrarLoteUsuarios.disabled = true
                cadastrarLoteUsuarios.textContent = "Cadastrando Lote..."
                res.innerHTML = ``
                res.innerHTML += `<h2>Usuários Cadastrados:</h2>`
                res.innerHTML += `
                                <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    
                                </tbody>
                            </table>
                            `
                data.users.forEach(async usuario => {
                    const valores = {
                        primeiroNome: usuario.firstName,
                        segundoNome: usuario.lastName,
                        idade: usuario.age,
                        telefone: usuario.phone,
                        endereco: usuario.address.address,
                        cidade: usuario.address.city,
                        estado: usuario.address.state,
                        dataNascimento: usuario.birthDate,
                        email: usuario.email
                    }
                    await fetch("http://localhost:3000/usuario", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(valores)
                    })
                        .then(resp => {
                            if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote de usuários")
                            return resp.json()
                        })
                        .then(usuario => {
                            res.querySelector("#tbodyUsuarios").innerHTML += `
                                <tr>
                                    <td>${usuario.id}</td>
                                    <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                    <td>${usuario.idade}</td>
                                    <td>${usuario.email}</td>
                                    <td>${usuario.telefone}</td>
                                    <td>${usuario.endereco}</td>
                                    <td>${usuario.cidade}</td>
                                    <td>${usuario.estado}</td>
                                    <td>${usuario.dataNascimento}</td>
                                </tr>
                            `
                        })
                        .catch((err) => {
                            console.error("Erro ao cadastrar lote de usuários:", err)
                            alert("Erro ao cadastrar lote de usuários. Verifique os dados e tente novamente.")
                        })
                })
            })
            .catch((err) => {
                console.error("Erro ao cadastrar lote de usuários:", err)
                alert("Erro ao cadastrar lote de usuários. Tente novamente.")
            })
            .finally(() => {
                cadastrarLoteUsuarios.textContent = "Cadastrar Lote"
                cadastrarLoteUsuarios.disabled = false
            })
    })
}

function consultarUsuario() {
    let consultarUsuario = document.getElementById("consultarUsuario")
    let res = document.getElementById("res")
    consultarUsuario.disabled = false
    consultarUsuario.textContent = "Consultar"

    consultarUsuario.addEventListener("click", async (e) => {
        e.preventDefault()
        let idUsuarioConsultar = document.getElementById("idUsuarioConsultar").value

        if (!idUsuarioConsultar) {
            alert("Por favor, informe o ID do usuário a ser consultado.")
            return
        }

        consultarUsuario.textContent = "Consultando..."
        consultarUsuario.disabled = true

        await fetch(`http://localhost:3000/usuario/${idUsuarioConsultar}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar usuário")
                return resp.json()
            })
            .then(usuario => {
                res.innerHTML = ``
                if (usuario) {
                    res.innerHTML += `<h3>Usuário Consultado:</h3>`
                    res.innerHTML += `
                        <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    <tr>
                                        <td>${usuario.id}</td>
                                        <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                        <td>${usuario.idade}</td>
                                        <td>${usuario.email}</td>
                                        <td>${usuario.telefone}</td>
                                        <td>${usuario.endereco}</td>
                                        <td>${usuario.cidade}</td>
                                        <td>${usuario.estado}</td>
                                        <td>${usuario.dataNascimento}</td>
                                    </tr>
                                </tbody>
                            </table>
                    `
                } else {
                    res.innerHTML += `<p>Usuário não encontrado.</p>`
                    alert("Usuário não encontrado. Verifique o ID e tente novamente.")
                }
            })
            .catch((err) => {
                console.error("Erro ao consultar usuário:", err)
                alert("Erro ao consultar usuário. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                consultarUsuario.textContent = "Consultar"
                consultarUsuario.disabled = false
            })
    })
}

// ------------------------------------
// Funções para manipulação de compras
// ------------------------------------

function cadastrarCompra() {
    let cadastroCompra = document.getElementById("cadastroCompra")
    let res = document.getElementById("res")
    cadastroCompra.disabled = false
    cadastroCompra.textContent = "Cadastrar"

    cadastroCompra.addEventListener("click", async (e) => {
        e.preventDefault()

        let idUsuario = document.getElementById("idUsuarioCompra").value
        let idProduto = document.getElementById("idProdutoCompra").value
        let quantidade = parseInt(document.getElementById("quantidade").value)
        let dataCompra = new Date().toISOString().slice(0, 10) || document.getElementById("dataCompra").value // Formato YYYY-MM-DD
        let formaPagamento = document.getElementById("formaPagamento").value
        let precoUnitario = parseFloat(document.getElementById("precoUnitario").value)
        let status = document.getElementById("status").value


        if (!idUsuario || !idProduto || !quantidade) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        const valores = {
            idUsuario: idUsuario,
            idProduto: idProduto,
            quantidade: quantidade,
            dataCompra: dataCompra,
            formaPagamento: formaPagamento,
            precoUnitario: precoUnitario,
            status: status
        }

        cadastroCompra.textContent = "Cadastrando..."
        cadastroCompra.disabled = true

        await fetch("http://localhost:3000/compra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar compra")
                return resp.json()
            })
            .then(compra => {
                res.innerHTML = ``
                res.innerHTML += `<h2>Compra cadastrada com sucesso!</h2>`
                res.innerHTML += `
                    <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD Compra</th>
                                        <th>COD Usuário</th>
                                        <th>COD Produto</th>
                                        <th>Quantidade</th>
                                        <th>Data da compra</th>
                                        <th>Preço unitário</th>
                                        <th>Forma de pagamento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyCompras">
                                    <tr>
                                        <td>${compra.id}</td>
                                        <td>${compra.idUsuario}</td>
                                        <td>${compra.idProduto}</td>
                                        <td>${compra.quantidade}</td>
                                        <td>${compra.dataCompra}</td>
                                        <td>${compra.precoUnitario}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                `
                alert("Compra cadastrada com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar compra:", err)
                alert("Erro ao cadastrar compra. Verifique os dados e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formCadastroCompra").reset()
                cadastroCompra.textContent = "Cadastrar"
                cadastroCompra.disabled = false
            })
    })
}

function listarCompras() {
    let res = document.getElementById("res")
    res.innerHTML = ``
    res.innerHTML += `Carregando...`

    fetch("http://localhost:3000/compra")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao receber a resposta no listar compras")
            return resp.json()
        })
        .then(data => {
            res.innerHTML = ``
            if (data.length <= 0) {
                res.innerHTML += `<p>Nenhuma compra cadastrada.</p>`
                return
            }
            res.innerHTML += `
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>COD Compra</th>
                                    <th>COD Usuário</th>
                                    <th>COD Produto</th>
                                    <th>Quantidade</th>
                                    <th>Data da compra</th>
                                    <th>Preço unitário</th>
                                    <th>Forma de pagamento</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyCompras">
                                
                            </tbody>
                        </table>
                    `
            data.forEach(compra => {
                res.querySelector("#tbodyCompras").innerHTML += `
                        <tr>
                            <td>${compra.id}</td>
                            <td>${compra.idUsuario}</td>
                            <td>${compra.idProduto}</td>
                            <td>${compra.quantidade}</td>
                            <td>${compra.dataCompra}</td>
                            <td>${compra.precoUnitario.toFixed(2)}</td>
                            <td>${compra.formaPagamento}</td>
                            <td>${compra.status}</td>
                        </tr>
                    `
            })
        })
        .catch((err) => {
            console.error("Erro ao listar compras: ", err)
            alert("Erro ao listar compras. Tente novamente.")
        })
}

function atualizarCompra() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    let idUsuario = document.getElementById("idUsuarioCompra")
    let idProduto = document.getElementById("idProdutoCompra")
    let quantidade = parseInt(document.getElementById("quantidade"))
    let dataCompra = document.getElementById("dataCompra")
    let formaPagamento = document.getElementById("formaPagamento")
    let precoUnitario = parseFloat(document.getElementById("precoUnitario").value)
    let status = document.getElementById("status")

    idUsuario.disabled = true
    idProduto.disabled = true
    quantidade.disabled = true
    dataCompra.disabled = true
    formaPagamento.disabled = true
    precoUnitario.disabled = true
    status.disabled = true

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()

        let idCompra = document.getElementById("idCompra").value

        if (selecaoAcao.value === "none") {
            return
        } else if (selecaoAcao.value === "consultar" || "atualizar" && !idCompra) {
            res.innerHTML = `<p>Por favor, informe o ID da compra.</p>`
            alert("Por favor, informe o ID da compra.")
            return
        }

        switch (selecaoAcao.value) {
            case "consultar":
                await fetch(`http://localhost:3000/compra/${idCompra}`)
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar compra")
                        return resp.json()
                    })
                    .then(compra => {
                        if (compra) {
                            idUsuario.value = compra.idUsuario
                            idProduto.value = compra.idProduto
                            quantidade.valueOf = compra.quantidade
                            dataCompra.value = compra.dataCompra
                            formaPagamento.value = compra.formaPagamento
                            precoUnitario.valueOf = compra.precoUnitario
                            status.value = compra.status

                            res.innerHTML = ``
                            res.innerHTML += `<h3>Compra Consultada:</h3>`
                            res.innerHTML += `
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>COD Compra</th>
                                            <th>COD Usuário</th>
                                            <th>COD Produto</th>
                                            <th>Quantidade</th>
                                            <th>Data da compra</th>
                                            <th>Preço unitário</th>
                                            <th>Forma de pagamento</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCompras">
                                        <tr>
                                            <td>${compra.id}</td>
                                            <td>${compra.idUsuario}</td>
                                            <td>${compra.idProduto}</td>
                                            <td>${compra.quantidade}</td>
                                            <td>${compra.dataCompra}</td>
                                            <td>${compra.precoUnitario.toFixed(2)}</td>
                                            <td>${compra.formaPagamento}</td>
                                            <td>${compra.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                `
                            idUsuario.disabled = false
                            idProduto.disabled = false
                            quantidade.disabled = false
                            dataCompra.disabled = false
                            formaPagamento.disabled = false
                            precoUnitario.disabled = false
                            status.disabled = false
                        } else {
                            res.innerHTML += `<p>Compra não encontrada.</p>`
                            alert("Compra não encontrada. Verifique o ID e tente novamente.")
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar compra:", err)
                        alert("Erro ao consultar compra. Verifique o ID e tente novamente.")
                    })
                    .finally(() => {
                        selecaoAcao.value = "none"
                    })
            case "atualizar":
                const valores = {
                    idUsuario: idUsuario.value,
                    idProduto: idProduto.value,
                    quantidade: quantidade.value,
                    dataCompra: dataCompra.value,
                    formaPagamento: formaPagamento.value,
                    precoUnitario: precoUnitario,
                    status: status.value
                }
                await fetch(`http://localhost:3000/compra/${idCompra}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no atualizar compra")
                        return resp.json()
                    })
                    .then(compra => {
                        res.innerHTML = ``
                        res.innerHTML += `<h2>Compra Atualizada:</h2>`
                        res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD Compra</th>
                                        <th>COD Usuário</th>
                                        <th>COD Produto</th>
                                        <th>Quantidade</th>
                                        <th>Data da compra</th>
                                        <th>Preço unitário</th>
                                        <th>Forma de pagamento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyCompras">
                                    <tr>
                                        <td>${compra.id}</td>
                                        <td>${compra.idUsuario}</td>
                                        <td>${compra.idProduto}</td>
                                        <td>${compra.quantidade}</td>
                                        <td>${compra.dataCompra}</td>
                                        <td>${compra.precoUnitario.toFixed(2)}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                        alert("Compra atualizada com sucesso!")
                    })
                    .catch((err) => {
                        console.error("Erro ao atualizar compra:", err)
                        alert("Erro ao atualizar compra. Verifique os dados e tente novamente.")
                    })
                    .finally(() => {
                        idUsuario.value = ""
                        idProduto.value = ""
                        quantidade.valueOf = ""
                        dataCompra.value = ""
                        formaPagamento.value = ""
                        precoUnitario.valueOf = ""
                        status.value = ""

                        selecaoAcao.value = "none"

                        idUsuario.disabled = true
                        idProduto.disabled = true
                        quantidade.disabled = true
                        dataCompra.disabled = true
                        formaPagamento.disabled = true
                        precoUnitario.disabled = true
                        status.disabled = true
                    })
        }
    })
}

function excluirCompra() {
    let excluirCompra = document.getElementById("excluirCompra")
    let res = document.getElementById("res")
    excluirCompra.disabled = false
    excluirCompra.textContent = "Excluir"

    excluirCompra.addEventListener("click", async (e) => {
        e.preventDefault()
        let idCompraExcluir = document.getElementById("idCompraExcluir").value

        if (!idCompraExcluir) {
            alert("Por favor, informe o ID da compra a ser excluída.")
            return
        }

        excluirCompra.disabled = true
        excluirCompra.textContent = "Excluindo..."

        await fetch(`http://localhost:3000/compra/${idCompraExcluir}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir compra")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                res.innerHTML += `<p>${data.message}</p>`
                res.innerHTML += `<p>Compra ID ${idCompraExcluir} excluída com sucesso!</p>`
                alert("Compra excluída com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao excluir compra:", err)
                alert("Erro ao excluir compra. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formExcluirCompra").reset()
                excluirCompra.textContent = "Excluir"
                excluirCompra.disabled = false
            })
    })
}

function consultarCompra() {
    let consultarCompra = document.getElementById("consultarCompra")
    let res = document.getElementById("res")
    consultarCompra.disabled = false
    consultarCompra.textContent = "Consultar"

    consultarCompra.addEventListener("click", async (e) => {
        e.preventDefault()
        let idCompraConsultar = document.getElementById("idCompraConsultar").value

        if (!idCompraConsultar) {
            alert("Por favor, informe o ID da compra a ser consultada.")
            return
        }

        consultarCompra.textContent = "Consultando..."
        consultarCompra.disabled = true

        await fetch(`http://localhost:3000/compra/${idCompraConsultar}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar compra")
                return resp.json()
            })
            .then(compra => {
                res.innerHTML = ``
                if (compra) {
                    res.innerHTML += `<h3>Compra Consultada:</h3>`
                    res.innerHTML += `
                        <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD Compra</th>
                                        <th>COD Usuário</th>
                                        <th>COD Produto</th>
                                        <th>Quantidade</th>
                                        <th>Data da compra</th>
                                        <th>Preço unitário</th>
                                        <th>Forma de pagamento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyCompras">
                                    <tr>
                                        <td>${compra.id}</td>
                                        <td>${compra.idUsuario}</td>
                                        <td>${compra.idProduto}</td>
                                        <td>${compra.quantidade}</td>
                                        <td>${compra.dataCompra}</td>
                                        <td>${compra.precoUnitario.toFixed(2)}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                    `
                } else {
                    res.innerHTML += `<p>Compra não encontrada.</p>`
                    alert("Compra não encontrada. Verifique o ID e tente novamente.")
                }
            })
            .catch((err) => {
                console.error("Erro ao consultar compra:", err)
                alert("Erro ao consultar compra. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                consultarCompra.textContent = "Consultar"
                consultarCompra.disabled = false
            })
    })
}