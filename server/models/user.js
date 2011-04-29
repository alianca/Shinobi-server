var redis = require('redis').createClient();

exports.createUser = function(attributes) {
    var user = new User(attributes);
    user.save();
    return user;
};

exports.get = function(id, callback) {
    redis.hgetall('Usuarios:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['login'] = id;
            callback(new User(ret));
        } else {
            callback(null);
        }
    });
};

function User(attributes) {
    this.nome = attributes.nome;
    this.login = attributes.login;
    this.gold = 0;
    this.senha = attributes.senha;
    this.email = attributes.email;
    this.nascimento = attributes.nascimento;
    
    this.save = function() {
        redis.hmset('Usuarios:' + this.login + ':atributos',
                    'gold', this.gold,
                    'nome', this.nome,
                    'senha', this.senha,
                    'email', this.email,
                    'nascimento', this.nascimento);
    };
    
    this.add_character = function(personagem_id) {
        redis.sadd('Usuarios:' + this.login + ':personagens', personagem_id);
    };
    
    this.rem_character = function(personagem_id) {
        redis.srem('Usuarios:' + this.login + ':personagens', personagem_id);
    };
}

