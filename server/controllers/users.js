var redis = require('redis').createClient();
var user = require('../models/user');

exports.create = create;
exports.authenticate = authenticate;

/* Public functions */

function create(user_data, answer) {
    if (user_data.nome && user_data.login && user_data.senha && user_data.email && user_data.nascimento) {
        redis.exists('Usuarios:' + user_data.login + ':atributos', function(err, ret) { 
            if (ret == 0) {
                user.createUser(user_data);
                answer(201, 'Usuario criado.');
            } else {
                answer(304, 'Usuario ja existe.');
            }
        });
    } else {    
        answer(400, 'Dados Incompletos.');
    }
}

function authenticate(user_data, answer) {
    user.get(user_data.login, function(ret_user) {
        if (ret_user) {
            console.log('['+user_data.senha+']['+ret_user.senha+']');
            if (user_data.senha == ret_user.senha) {
                answer(202, JSON.stringify(ret_user));
            } else {
                answer(401, 'Senha Invalida.');
            }
        } else {
            answer(401, 'Usuario Invalido.');
        }
    });
}
