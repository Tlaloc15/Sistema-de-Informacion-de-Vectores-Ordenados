class Articulo{
    constructor(codigo, nArticulo, precio, cantidad, descripcion)
    {
        this._codigo = codigo;
        this._nArticulo = nArticulo;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
    }
    get codigo() {
        return this._codigo;
    }
    toString() {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nArticulo + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion ;
    }
}

class Inventario {
    constructor(tabla, clave) 
        {
            this._articulo = [];
            this._tabla = tabla;
            this._clave = clave;
            this._sumador = 0;
        }
        get articulo(){
            return this._articulo;
        }
        get clave(){
            return this._clave;
        }
        agregar(ubicacion, nArticulo, precio, cantidad, descripcion, clave) {   
            if(this._articulo.length < 20) { 
                    if (ubicacion === '' || ubicacion === (this._sumador + 1).toString()) {
                        this._clave = clave;
                        for(var i = this._sumador; i < (this._sumador+1); i++) {
                            this._articulo[i] = new Articulo(this._clave, nArticulo, precio, cantidad, descripcion);
                        }
                        
                        this._sumador++;
                        this._clave++;
                        alert('articulo agregado');
                    } 
                    else if (Number(ubicacion) > 0 && Number(ubicacion) < this._sumador) {
                        for (let i = this._sumador; i >= Number(ubicacion); i--) {
                            this._articulo[i] = this._articulo[i - 1];
                        }
                        this._articulo[Number(ubicacion) - 1] = new Articulo(this._clave, nArticulo, precio, cantidad, descripcion);
                        this._clave++;
                        alert('articulo agregado correctamente');
                    } 
                    else {
                        alert('Posicion no válida');
                    }
                    this.mostrarTa();
                }
            else {
                alert('inventario lleno');
            }
        }
        buscar(codigo) {
            codigo = Number(codigo);
            let buscador = '';1
            let lSuperior = (this._sumador-1);
            let lInferior = 0;
            let mitad = Math.trunc(lSuperior/2);
            if(this._sumador > 2){
                    if (this.revision(codigo) === 1) {
                        while((lSuperior - lInferior) > 1) {
                                if(this._articulo[mitad]._codigo < codigo) {
                                    lInferior = mitad;
                                    mitad += Math.trunc((lSuperior - lInferior)/2); 
                                }
                                else if(this._articulo[mitad]._codigo > codigo) {
                                    lSuperior = mitad;
                                    mitad = Math.trunc((lSuperior - lInferior)/2); 
                                }
                                else {
                                    buscador = this._articulo[mitad];
                                    break;
                                }
                        }
                    } 
                    if(this._articulo[mitad]._codigo === codigo) {
                        alert('El Articulo se encontró en la posicion. '+ mitad);
                    }
                    else {
                        alert('No se pudo encontrar el articulo');
                    }
                }
            else {
                alert('Cantidad de articulos insuficiente para hacer una busqueda');
            }
                return buscador;
        }
        eliminar(codigo) {
            codigo = Number(codigo);
            if (this.revision(codigo) === 1) {
                if (codigo != this.articulo.length) {
                    for (let i = codigo - 1; i < this._articulo.length - 1; i++) {
                        this._articulo[i] = this._articulo[i + 1];
                    }
                    this._articulo[this._sumador] = "";
                    this._sumador--;
    
                } 
                else {
                    this._articulo[this._sumador] = "";
                    this._sumador--;
    
                }
                alert('Se ha eliminado el articulo correctamente');
            } else {
                alert('El código ingresado no existe, por favor verifique de nuevo');
            }
            this.mostrarTa();
        }
        revision(codigo) {
            let existe = 0;
            for (let i = 0; i < this._sumador; i++) {
                if (this._articulo[i]._codigo === codigo) {
                    existe = 1;
                    break;
                }
            }
            return existe;
        }
        mostrarTa() {
            this._tabla.innerHTML = '';
            let etiquetarA = [];
            this.ordenar();
            for (let i = 0; i < this._sumador; i++) {
                etiquetarA[i] = document.createElement('p');
            }
            for (let i = 0; i < this._sumador; i++) {
                etiquetarA[i].innerHTML = this._articulo[i].toString();
                this._tabla.appendChild(etiquetarA[i]);
            }
        }
        ordenar()
        {
            let auxiliar = [];
            for (let i = 0; i < this._sumador; i++) {
                for (let j = 0; j < this._sumador; j++) {
                        if(this._articulo[i]._codigo > this._articulo[j]._codigo) {
                            auxiliar = this._articulo[i]; 
                            this._articulo[i] = this._articulo[j];
                            this._articulo[j] = auxiliar;
                        }
                    }
            }
        }
    }

class Main{
    constructor(){


var inventario = new Inventario(document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
document.querySelector('#agregar').addEventListener('click', () => {
    let clave = Number(document.querySelector('#codigo').value);
    let ubicacion = document.querySelector('#ubicacion').value;
    let nArticulo = document.querySelector('#nArticulo').value;
    let precio = Number(document.querySelector('#precio').value);
    let cantidad = Number(document.querySelector('#cantidad').value);
    let descripcion = document.querySelector('#descripcion').value;

    inventario.agregar(ubicacion, nArticulo, precio, cantidad, descripcion, clave);
    document.querySelector('#codigo').value = inventario.clave;
});
document.querySelector('#buscar').addEventListener('click', () => {
    let buscarArticulo = inventario.buscar(document.querySelector('#buscarArt').value);
    document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
});
document.querySelector('#eliminar').addEventListener('click', () => {
    inventario.eliminar(document.querySelector('#eliminarCodigo').value);
    document.querySelector('#codigo').value = inventario.clave;
});
    }
}

new Main();