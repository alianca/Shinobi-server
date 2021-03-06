var redis = require('redis').createClient();

exports.createOrganization = function(attributes) {
    var organization = new Organization(attributes);
    organization.save();
    return organization;
};

exports.get = function(id, callback) {
    redis.hgetall('Organizacoes:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['id'] = id;
            callback(new Organization(ret));
        } else {
            callback(null);
        }
    });
};

function Organization(attributes) {

    this.nome = attributes.nome;
    this.id = attributes.id;
    this.score = 0;
    this.exp = 0;
    
}

Organization.prototype = {
    'save': function() {
        redis.hmset('Organizacoes:' + this.id + ':atributos',
                    'nome', this.nome,
                    'exp', this.exp,
                    'score', this.score);
    },
    
    'add_member': function(rank, id) {
        redis.zadd('Organizacoes:' + this.id + ':membros', rank, id);
    },
    
    'rem_member': function(id) {
        redis.zrem('Organizacoes:' + this.id + ':membros', id);
    }
}
