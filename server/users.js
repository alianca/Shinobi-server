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
	answer('Dados Incompletos.');
    }
}

function after_create(ret, answer) {
    if (ret == 1) {
	answer('Usuario criado.');
    } else {
	answer('Usuario ja existe.');
    }
}

function authenticate(user_data, answer) {
    redis.hget('users', user_data.login, function(err, ret) { auth_after_get(user_data, ret, answer); });
}

function auth_after_get(data, ret, answer) {
    if (ret) {
	ret_data = JSON.parse(ret);

	if (data.password == ret_data.password) {
	    answer(ret);
	} else {
	    answer('Senha Invalida.');
	}
    } else {
	answer('Usuario Invalido.');
    }
}