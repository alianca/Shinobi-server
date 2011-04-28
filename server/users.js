var redis = require('redis').createClient();

exports.create = create;
exports.authenticate = authenticate;


/* Public functions */

function create(user_data, answer) {
    if (user_data.name &&
	user_data.login &&
	user_data.password &&
	user_data.email &&
	user_data.birth_date) {
	redis.hsetnx('users', user_data.login, JSON.stringify(user_data), function(err, ret) { after_create(ret, answer); });
    } else {
	answer(400, 'Dados Incompletos.');
    }
}

function after_create(ret, answer) {
    if (ret == 1) {
	answer(201, 'Usuario criado.');
    } else {
	answer(304, 'Usuario ja existe.');
    }
}

function authenticate(user_data, answer) {
    redis.hget('users', user_data.login, function(err, ret) { auth_after_get(user_data, ret, answer); });
}

function auth_after_get(data, ret, answer) {
    if (ret) {
	ret_data = JSON.parse(ret);

	if (data.password == ret_data.password) {
	    answer(202, ret);
	} else {
	    answer(401, 'Senha Invalida.');
	}
    } else {
	answer(401, 'Usuario Invalido.');
    }
}