var redis = require('redis').createClient();
var jutsus = require('./jutsu');

exports.createCharacter = function(attributes) {
    var character = new Character(attributes);
    character.save();
    return character;
};

exports.get = function(id, callback) {
    redis.hgetall('Personagens:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['id'] = id;
            redis.mget(['Personagens:' + id + ':vila', 
			'Personagens:' + id + ':organizacao', 
			'Personagens:' + id + ':guilda'], 
		       function(err, values) {
			    ret['vila'] = values.vila;
			    ret['organizacao'] = values.organizacao;
			    ret['guilda'] = values.guilda;
			    callback(new Character(ret));
			});
        } else {
            callback(null);
        }
    });
};

function Character(attributes) {

    this.nome = attributes.nome;
    this.exp = 0;
    this.id = attributes.id;
    this.score = 0;
    this.dinheiro = 0;
    this.sexo = attributes.sexo;
    this.hp = 0;
    this.ninjutsu = 0;
    this.genjutsu = 0;
    this.taijutsu = 0;
    this.agilidade = 0;
    this.conhecimento = 0;
    this.forca = 0;
    this.defesa = 0;
    this.cognicao = 0;
    this.inteligencia = 0;
    this.chakra = 0;
    this.stamina = 0;
    this.vila = attributes.vila;
    this.organizacao = attributes.organizacao;
    this.guilda = attributes.guilda;

}

Character.prototype = {
    'save': function() {
        redis.hmset('Personagens:' + this.id + ':atributos',
		    'nome', this.nome,
		    'exp', this.exp,
		    'id', this.id,
		    'score', this.score,
		    'dinheiro', this.dinheiro,
		    'sexo', this.sexo,
		    'hp', this.hp,
		    'ninjutsu', this.ninjutsu,
		    'genjutsu', this.genjutsu,
		    'taijutsu', this.taijutsu,
		    'agilidade', this.agilidade,
		    'conhecimento', this.conhecimento,
		    'forca', this.forca,
		    'defesa', this.defesa,
		    'cognicao', this.cognicao,
		    'inteligencia', this.inteligencia,
		    'chakra', this.chakra,
		    'stamina', this.stamina);
        
        redis.mset('Personagens:' + this.id + ':vila', this.vila,
                   'Personagens:' + this.id + ':organizacao', this.organizacao,
                   'Personagens:' + this.id + ':guilda', this.guilda);
    },
    
    'add_jutsu': function(jutsu, level, callback) {
        redis.zadd('Personagens:' + this.id + ':jutsus', level, jutsu.id, function(err, ret) { callback(ret); });
    },
    
    'advance_jutsu': function(jutsu_id, advance_by, callback) {
        redis.zincrby('Personagens:' + this.id + ':jutsus', advance_by, jutsu_id, function(err, ret) { callback(ret); });
    },
    
    'get_jutsus': function(callback) {
	my_jutsus = [];
	redis.zrange('Personagens:' + this.id + ':jutsus', 0, -1, function(err, ret) {
	    for (var i = 0; i < ret.length; i++) {
		jutsus.get(ret[i], function(j) {
		    my_jutsus.push(j);
		    if (my_jutsus.length == ret.length) {
			callback(my_jutsus);
		    }
		});
	    }
	});
    },
    
    'get_jutsu_properties': function(jutsu, callback) {
	redis.zscore('Personagens:' + this.id + ':jutsus', jutsu.id, function(err, level) {
	    console.log('Jutsu level: ' + level);
	    jutsu.get_properties(level, callback);
	});
    }
};