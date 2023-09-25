class User{
    constructor(id_user,photo,name,last_name,ubicacion,email,password)
    {
        this.id_user = id_user;
        this.photo = photo;
        this.name = name;
        this.last_name = last_name;
        this.ubicacion = ubicacion;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;