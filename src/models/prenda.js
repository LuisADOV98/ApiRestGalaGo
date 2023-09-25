class Prenda{
    constructor(id_Prenda,titulo,precio,descripcion,ubicacion,estado,evento,tipo,talla,imagenes,id_user)
    {
        this.id_Prenda = id_Prenda;
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.estado = estado;
        this.talla = talla;
        this.evento = evento;
        this.tipo = tipo;
        this.imagenes = imagenes;
        this.id_user = id_user;
    }
}

module.exports = Prenda;