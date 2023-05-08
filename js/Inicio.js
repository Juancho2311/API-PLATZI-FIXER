
const apiCate = "https://api.escuelajs.co/api/v1/categories";
const apiProd = "https://api.escuelajs.co/api/v1/products/?title="

// llamado a la categoria
function mostrarCategoria() {
    let listCate = ""
    fetch(apiCate)
        .then(response => response.json())
        .then((data => {

            data.forEach(element => {
                let nombre = element.name
                let imagen = element.image
                let id = element.id

                listCate += `
                <div class="card mb-3 mx-2" style="width: 18rem;">
                    <a onclick="llamarProduct('${id}')">
                    <img src="${imagen}" class="card-img-top">
                    </a>
                    <div">
                    <h5 class="card-title">${nombre}</h5>              
                    </div>
                </div>`
            });
            document.getElementById("categoria").innerHTML = listCate
        }))
}

// funcion de llamar a los productos
function llamarProduct(urlCate) {
    localStorage.setItem("catego", urlCate)
}

// funcion de busqeuda de productos
function BusqProd() {
    let autoCom = ""
    let nomPro = document.getElementById("Buscar").value;
    let Link = `${apiProd}${nomPro}`
    fetch(Link)
    
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let id = element.id
                let titulo = element.title
                let precio = element.price
                let descripcion = element.description
                let imagen = element.images[0]
                autoCom += `<div class="card mb-3 mx-2" style="width: 18rem;">
                    <img src="${imagen}" class="card-img-top">
                    <div>
                    <h5 class="card-title">${titulo}</h5>
                    <h6 class="card-text">$${precio}</h6>
                    <p class="card-text">${descripcion}</p></br>
                    <a onclick="añadirProd('${id}')" class="btn btn-outline-success mb-3">Añadir a carrito</a>                    
                    </div>
                </div>`
            })
            document.getElementById("producto").innerHTML = autoCom;
            document.getElementById("categoria").innerHTML = ""
        })
}

// guardad los productos en local para el carrito
let carrito = [localStorage.ids]
carrito = JSON.parse(carrito)
function añadirProd(id) {
    carrito.push(id)
}

// funcion de mostrar al carrito
function mostraCarrito() {
    let carrt = ""
    let total = 0
    carrito.forEach(element => {
        const url = `https://api.escuelajs.co/api/v1/products/`
        let cons = `${url}${element}`
        fetch(cons)
            .then(response => response.json())
            .then(data => {
                let imagen = data.images[0]
                let titulo = data.title
                let precio = data.price
                let id = data.id
                total += precio
                carrt += `<div class="card mb-3" style="width: 18rem; margin-top:15px;">
            <img src="${imagen}" class="card-img-top" alt="...">
            <div>
            <h5 class="card-title">${titulo}</h5>
            <h6 id="targeta${id}" class="card-text">$${precio}</h6>   
            <a onclick="eliminarProd('${id}')" class="btn btn-outline-success">eliminar</a>         
            </div>
        </div>`
                document.getElementById("car").innerHTML = carrt
                document.getElementById("total").innerHTML = "$" + total
                localStorage.setItem("ids", JSON.stringify(carrito))
            })
    })
}
// funcion de eleminar producto
function eliminarProd(id) {
    if (carrito.includes(id)) {
        let posic = carrito.indexOf(`${id}`)
        carrito.splice(posic, 1)
        mostraCarrito()
    }
}
// funcion de cambio de divisas
function cambioD() {
    totConv = 0;
    carrito.forEach((element) => {
        fetch(`https://api.escuelajs.co/api/v1/products/${element}`)
            .then((response) => response.json())
            .then((data) => {
                let precio = data.price
                let id = data.id
                var eleccion = document.getElementById("escogerDiv")
                var value = eleccion.options[eleccion.selectedIndex].value

                var myHeaders = new Headers();
                myHeaders.append("apikey", "5p2Uf23ck2QBaSNFNYVgWmhvJUyC5EI6");

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                    headers: myHeaders
                };

                fetch(`https://api.apilayer.com/fixer/convert?to=${value}&from=USD&amount=${precio}`, requestOptions)
                    .then((response) => response.json())
                    .then((resultado) => {
                        document.getElementById(`targeta${id}`).innerHTML = resultado.result;
                        totConv += resultado.result;
                        document.getElementById("total").innerHTML = "$" + totConv;
                    })
            })
    })

}
