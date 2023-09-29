class Chat{
    // constructor(idchat,datehour, id_prenda, iduser)
    // {   
    //     this.idchat = idchat;
    //     this.foto = foto;
    //     this.nombre = nombre;
    //     this.datehour = datehour;
    //     this.id_prenda = id_prenda;
    //     this.iduser = iduser;
    // }

    constructor(id_chat, foto, nombre, hora, id_prenda, id_usuario)
    {   
        this.id_chat = id_chat;
        this.foto = foto;
        this.nombre = nombre;
        this.hora = hora;
        this.id_prenda = id_prenda;
        this.id_usuario = id_usuario;
    }

}

module.exports = Chat;