exports.createUser = function(attributes) {
    return new User(attributes);
}

function User(attributes) {

    this.name = attributes.name;
    this.login = attributes.login;
    this.password = attributes.password;
    this.email = attributes.email;
    this.birth_date = attributes.birth_date;

}