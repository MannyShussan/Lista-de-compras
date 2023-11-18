let listaDeItens = JSON.parse(localStorage.getItem('lista')) || []
const listaDeCompras = document.getElementById('lista-de-itens')
const formulario = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const itensComprados = document.getElementById("itens-comprados")
let itemAEditar = -1

if (listaDeItens.length >= 1) mostraItens()

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    salvaItens()
    mostraItens()
    itensInput.focus()
})

function salvaItens() {
    const comprasItem = itensInput.value
    const existe = listaDeItens.find((element) => element.valor.toUpperCase() === comprasItem.toUpperCase())
    if (existe == undefined) {
        listaDeItens.push({ valor: comprasItem, checar: false })
    }
    else {
        alert("Esse item já foi incluido anteriormente")
    }
    itensInput.value = ''
}

function mostraItens() {
    listaDeCompras.innerHTML = ''
    itensComprados.innerHTML = ''
    listaDeItens.forEach((elemento, index) => {
        if (elemento.checar) {
            itensComprados.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`
        } else {
            listaDeCompras.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
            </div>
            <div>
            ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'} <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div >
            </li > `
        }
    })

    const input = document.querySelectorAll('input[type="checkbox"]')
    input.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostraItens()
        })
    })

    const botaoDeletar = document.querySelectorAll('.deletar')
    botaoDeletar.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento, 1)
            mostraItens()
        })
    })

    const editarItens = document.querySelectorAll('.editar')
    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostraItens()
        })
    })
    salvalista()
}

function salvarEdicao() {
    if (itemAEditar != -1) {
        const itemEditado = document.querySelectorAll('.is-size-5')
        listaDeItens[itemAEditar].valor = itemEditado[itemAEditar].value
        itemAEditar = -1
        mostraItens()
    }
}

function salvalista() {
    localStorage.setItem("lista", JSON.stringify(listaDeItens))
}