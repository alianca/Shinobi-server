var redis = require('redis').createClient();

exports.createVillage = function(attributes) {
    var village = new Village(attributes);
    village.save();
    return village;
};

exports.get = function(id, callback) {
    redis.hgetall('Vilas:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['id'] = id;
            callback(new Village(ret));
        } else {
            callback(null);
        }
    });
};

function Village(attributes) {

    this.nome = attributes.nome;
    this.id = attributes.id;
    this.counter = 0;
    
}

Village.prototype = {
    'save': function() {
        redis.hmset('Vilas:' + this.id + ':atributos',
                    'nome', this.nome,
                    'counter', this.counter);
    },
    
    'add_related': function(id, type) {
        redis.sadd('Vilas:' + this.id + ':' + type,  id);
    },
    
    'rem_related': function(id, type) {
        redis.srem('Vilas:' + this.id + ':' + type,  id);
    }
}
