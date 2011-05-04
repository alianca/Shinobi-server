var redis = require('redis').createClient();

exports.createClan = function(name, jutsus, villages, modifiers) {
    var clan = new Clan(name, jutsus, villages, modifiers);
    redis.incr('Clans:counter', 1, function(id) {
        clan.id = id;
        clan.save();
    });

    return clan;
};

exports.get = function(id, callback) {
    redis.hgetall('Clas:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['id'] = id;
            callback(new Clan(ret));
        } else {
            callback(null);
        }
    });
};


function Clan(name, jutsus, villages, modifiers) {
    this.nome = name;
    this.jutsus = jutsus;
    this.vilas = villages;
    this.modificadores = modifiers;
}

Clan.prototype = {
    'save': function() {
        redis.hset('Clas:' + this.id + ':atributos', 'nome', this.nome);
        for (var i = 0; i < this.jutsus.length; i++) {
            redis.zadd('Clas:' + this.id + ':jutsus',
                       this.jutsus[i].level_minimo,
                       this.jutsus[i].id);
        }
        for (var i = 0; i < this.modificadores.length; i++) {
            redis.zadd('Clas:' + this.id + ':modificadores',
                       this.modificadores[i].valor,
                       this.modificadores[i].atributo);
        }
        for (var i = 0; i < this.vilas; i++) {
            redis.sadd('Clas:' + this.id + ':vilas', this.vilas[i].id);
        }
    },

    'get_jutsus_for_level': function(level, callback) {
        redis.zrangebyscore('Clas:' + this.id + ':jutsus', level, level, function(err, ret) {
	    if (ret) {
	        callback(ret);
	    } else {
	        callback(null);
	    }
        });
    }
};
