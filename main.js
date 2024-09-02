// Inventario
const TIENDA = "FLORICIENTA";
let productos = [];
let stock = 0;


function agregarProducto(nombre, precio, cantidad) {
  productos.push({ nombre, precio, cantidad });
  stock = stock + cantidad;
  // para guardar en localStorage
  localStorage.setItem("productos" , JSON.stringify(productos));
  localStorage.setItem("stock", stock);
  // para actualizar la  lista de stock
  actualizarListaStock();
}


function eliminarProducto(nombre) {
  const PRODUCTO = productos.find(function(p) {
    return p.nombre === nombre;
  });//utilizo el metodo find (recodatorio, es para buscar el PRODUCTO en el array productos que tenga estrictamente el mismo nombre que el parametro nombre)

  if (PRODUCTO) {
    productos = productos.filter(function(p) {
      return p.nombre !== nombre;
    });//(recordatorio, con el metodo .filter() me devuelve el array productos que no incluya el que busque con el metodo .find, quedan todos los demas)

    stock = stock - PRODUCTO.cantidad;

    //para guardar en el localStorage
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("stock", stock);
   
    actualizarListaStock();
  }
}

function verInformes() {
  console.log("Stock total: " + stock);//solo me muestra la cantidad. no la cantidad con nombre, agregar para que detalle por producto..
  productos.forEach(p => console.log("Producto: " + p.nombre + " - Cantidad: " + p.cantidad)); //recordatorio, utilizo el metodo .forEach con la funcion flecha para que me muestre los parametros del array productos.
  
  actualizarListaStock();
}

function actualizarListaStock() {
    const listaStock = document.getElementById("listaStock");
    listaStock.innerHTML = '';
    productos.forEach(p => {
      const li = document.createElement("li");
      li.textContent = "Producto: " + p.nombre +  " - Precio: $" + p.precio + " - Cantidad: " + p.cantidad;
      listaStock.appendChild(li);
    });
  }
  

//cargar los datos desde el localStorage
if (localStorage.getItem("productos")) {
  productos = JSON.parse(localStorage.getItem("productos"));
  stock = localStorage.getItem("stock");
}

//eventos
const formulario = document.getElementById("formulario");
const agregarBtn = document.getElementById("agregar");
const eliminarBtn = document.getElementById("eliminar");
const verStockBtn = document.getElementById("verStock");

agregarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const cantidad = document.getElementById("cantidad").value;
  agregarProducto(nombre, precio, cantidad);
  formulario.reset();
});

eliminarBtn.addEventListener("click", () => {
  const nombreEliminar = prompt("Ingrese el nombre del producto que quiere eliminar");
  eliminarProducto(nombreEliminar);
});

verStockBtn.addEventListener("click", () => {
  verInformes();
});

