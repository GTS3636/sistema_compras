let chartProd = null
export async function exibirGraficoProd() {
    let resGrafProd = document.getElementById("resGrafProd").getContext("2d")
    let exibirGraficoProd = document.getElementById("exibirGraficoProd")

    exibirGraficoProd.addEventListener("click", async (e) => {
        e.preventDefault()

        if (chartProd) {
            chartProd.destroy()
        }
        
        let limiteGrafProd = Number(document.getElementById("limiteGrafProd").value)
        let minGrafProd = Number(document.getElementById("minGrafProd").value)

        if (limiteGrafProd <= 0 || minGrafProd < 0) {
            alert("Coloque um limite maior que 0 para os produtos")
            return
        }
        else if (minGrafProd >= 10) {
            alert("Coloque um mínimo menor que 10 para os produtos")
            return
        }
        else {
            resGrafProd.clearRect(0, 0, resGrafProd.canvas.width, resGrafProd.canvas.height)
            // Limpa o canvas antes de desenhar o novo gráfico
            resGrafProd.canvas.width = 400 // Define a largura do canvas
            resGrafProd.canvas.height = 400 // Define a altura do canvas

            await fetch("http://localhost:3000/produto") //colocar url dps
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error("Erro na resposta da API externa.")
                    } return resp.json()
                })
                .then(produtos => {
                    let estoque = []
                    let labels = []
                    for (let i = minGrafProd; i < limiteGrafProd; i++) {
                        estoque.push(produtos[i].estoque)
                        labels.push(produtos[i].titulo)
                    }
                    chartProd = new Chart(resGrafProd, {
                        type: 'bar', // Tipo de gráfico (barra)
                        data: {
                            labels: labels,  // Títulos dos produtos no eixo X
                            datasets: [{
                                label: 'Estoque',  // Nome da série de dados
                                data: estoque,  // Quantidade de estoque de cada produto
                                borderWidth: 1,  // Largura da linha
                                borderColor: 'rgba(75, 192, 192, 1)',  // Cor da linha
                                backgroundColor: 'rgba(75, 192, 192, 0.2)'  // Cor de fundo da área
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true  // Começar o eixo Y do zero
                                }
                            }
                        }
                    })
                })
                .catch((err) => {
                    console.error("Erro na obtenção dos dados do banco de dados e na criação dos gráficos: ", err)
                })
        }
    })
}

let chartUser = null
export async function exibirGraficoUser() {
    let resGrafUser = document.getElementById("resGrafUser").getContext("2d")
    let exibirGraficoUser = document.getElementById("exibirGraficoUser")


    exibirGraficoUser.addEventListener("click", async (e) => {
        e.preventDefault()

        if (chartUser) {
            chartUser.destroy()
        }

        let limiteGrafUser = Number(document.getElementById("limiteGrafUser").value)
        let minGrafUser = Number(document.getElementById("minGrafUser").value)

        if (limiteGrafUser <= 0 || minGrafUser < 0) {
            alert("Coloque um limite maior que 0")
        }
        else if (limiteGrafUser > 10) {
            alert("Coloque um limite menor ou igual a 10")
        }
        else if (minGrafUser >= 10) {
            alert("Coloque um mínimo menor que 10")
        }
        else {
            resGrafUser.clearRect(0, 0, resGrafUser.canvas.width, resGrafUser.canvas.height)
            // Limpa o canvas antes de desenhar o novo gráfico
            resGrafUser.canvas.width = 400 // Define a largura do canvas
            resGrafUser.canvas.height = 400 // Define a altura do canvas

            await fetch("http://localhost:3000/usuario") //colocar url dps
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error("Erro na resposta do banco de dados.")
                    } return resp.json()
                })
                .then(usuarios => {
                    let nome = []
                    let idade = []

                    for (let i = minGrafUser; i < limiteGrafUser; i++) {
                        nome.push(`${usuarios[i].primeiroNome} ${usuarios[i].segundoNome}`)
                        idade.push(usuarios[i].idade)
                    }

                    chartUser = new Chart(resGrafUser, {
                        type: 'bar', // Tipo de gráfico (barra)
                        data: {
                            labels: nome,  // Nome dos usuários no eixo X
                            datasets: [{
                                label: 'Idade',  // Nome da série de dados
                                data: idade,  // Idade de cada usuário
                                borderWidth: 1,  // Largura da linha
                                borderColor: 'rgba(248, 162, 3, 0.8)',  // Cor da linha
                                backgroundColor: 'rgba(190, 133, 41, 0.34)'  // Cor de fundo da área
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true  // Começar o eixo Y do zero
                                }
                            }
                        }
                    })
                })
                .catch((err) => {
                    console.error("Erro na obtenção dos dados do banco de dados e na criação dos gráficos: ", err)
                })
        }
    })
}