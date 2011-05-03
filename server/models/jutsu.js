var redis = require('redis').createClient();

exports.createJutsu = function(attributes) {
    var jutsu = new Jutsu(attributes);
    jutsu.save();
    return jutsu;
};

exports.get = function(id, callback) {
    redis.hgetall('Jutsus:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['id'] = id;
            callback(new Jutsu(ret));
        } else {
            callback(null);
        }
    });
};

function Jutsu(attributes) {

    this.nome = attributes.nome;
    this.id = attributes.id;
    
    this.natureza = attributes.natureza;
    this.level_minimo = attributes.level_minimo;
    this.descricao = attributes.descricao;
    this.tipo = attributes.tipo;
    this.forca = attributes.forca;
    this.cooldown = attributes.cooldown;
    this.ativacao = attributes.ativacao;
    this.duracao = attributes.duracao;
    
}

Jutsu.prototype = {
    'save': function() {
        redis.hmset('Jutsus:' + this.id + ':atributos',
                    'nome', this.nome,
                    'natureza', this.natureza,
                    'level_minimo', this.level_minimo,
		    'descricao', this.descricao,
		    'tipo', this.tipo,
		    'forca', this.forca,
		    'cooldown', this.cooldown,
		    'ativacao', this.ativacao,
		    'duracao', this.duracao);
    },
    
    'set_properties': function(precisao, critico, modificadores) {
	redis.multi()
            .rpush('Jutsus:' + this.id + ':precisao', precisao[0])
            .rpush('Jutsus:' + this.id + ':precisao', precisao[1])
            .rpush('Jutsus:' + this.id + ':precisao', precisao[2])
            .rpush('Jutsus:' + this.id + ':critico', critico[0])
            .rpush('Jutsus:' + this.id + ':critico', critico[1])
            .rpush('Jutsus:' + this.id + ':critico', critico[2])
	    .set('Jutsus:' + this.id + ':modificadores', JSON.stringify(modificadores))
    },

    'get_properties': function(level, callback) {
	redis.multi()
            .lindex('Jutsus:' + this.id + ':precisao', level)
	    .lindex('Jutsus:' + this.id + ':critico', level)
	    .get('Jutsus:' + this.id + ':modificadores')
	    .exec(function(err, replies) {
		var mods = JSON.parse(replies[2]);
		for (var i = 0; i < mods.length; i++) {
		    var values = mods[i].valor;
		    mods[i].valor = values[level];
		}
		callback({
		    'critico' : replies[0],
		    'precisao' : replies[1],
		    'modifiers' : mods
		});
	    });
    }
};
