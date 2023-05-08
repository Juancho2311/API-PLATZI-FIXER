
function traerProducto() {
    let listProd = ""
    let locStor = localStorage.catego
    let urlPro = `https://api.escuelajs.co/api/v1/products/?categoryId=`
    let urlFetch = `${urlPro}${locStor}`

    fetch(urlFetch)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(element => {
                let id = element.id
                let titulo = element.title
                let imagen = element.images
                let precio = element.price
                let descripcion = element.description
                listProd += ` .
                <div class="card mb-3 mx-2" style="width: 18rem;">
                    <img src="${imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5></br>
                        <h6 class="card-text">$${precio}</h6></br>
                        <p class="card-text">${descripcion}</p></br>
                        <a  onclick="añadirProd('${id}')" class="btn btn-outline-success" style="margin-botom:10px;">Añadir a carrito</a>
                    </div>
                    </div>`
                document.getElementById("card").innerHTML = listProd
                document.getElementById("categoria").innerHTML = ""
            });
        })
}
