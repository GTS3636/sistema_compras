let selectionPages = document.getElementById("selectionPages")
let selectionServices = document.getElementById("selectionServices")

let dynamicMenu = document.getElementById("card")

let head = document.querySelector("head")
let lastScript = `Código preventivo`

function writeCardWelcome() {
    dynamicMenu.innerHTML = `
        <h2>Bem-vindo ao sistema</h2>
        <p><span></span>Use os seletores acima para navegar entre diferentes funcionalidades do sistema.</p>
        <p><span></span>Você pode cadastrar, consultar, atualizar ou excluir dados de produtos, compras e usuários por aqui.</p>
    `
}
writeCardWelcome()

function changeHead(link) {
    if (head.contains(link)) {
        head.removeChild(link)
    } 
    else if (link !== "" || " " || null || undefined) {
        head.appendChild(link)
    }
}

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
        if (page == "produto" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
                <h2>Cadastrar Produto</h2>
                <form>
                  <input type="text" name="titulo" placeholder="Título do Produto" required><br><br>

                  <textarea name="descricao" placeholder="Descrição do Produto"></textarea><br><br>

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
            document.getElementById("cadastroProduto").addEventListener("click", (e) => {
                e.preventDefault()
                if (!lastScript == `<script src="./js/cadastroProduto.js" defer></script>`) {
                    changeHead(`<script src="./js/cadastroProduto.js" defer></script>`)
                    lastScript = `<script src="./js/cadastroProduto.js" defer></script>`
                }
                // Aqui você pode adicionar a lógica para cadastrar o produto
            })
        }
    })
    document.addEventListener("click", (e) => {
        e.preventDefault()
        if (!selectionPages.contains(e.target)) {

        }
    })
}
controleMenu()