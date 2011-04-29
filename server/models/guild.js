var redis = require('redis').createClient();

exports.createGuild = function(attributes) {
    var guild = new Guild(attributes);
    guild.save();
    return guild;
};

exports.get = function(id, callback) {
    redis.hgetall('Guildas:' + id + ':atributos', function(err, ret) {
        if (ret.nome) {
            ret['id'] = id;
            callback(new Guild(ret));
        } else {
            callback(null);
        }
    });
};

function Guild(attributes) {

    this.nome = attributes.nome;
    this.id = attributes.id;
    this.score = 0;
    this.exp = 0;
    
    this.save = function() {
        redis.hmset('Guildas:' + this.id + ':atributos',
                    'nome', this.nome,
                    'exp', this.exp,
                    'score', this.score);
    };
    
    this.add_member = function(rank) {
        redis.zadd('Guildas:' + this.id + ':membros', rank, id);
    };
    
    this.rem_member = function(id) {
        redis.zrem('Guildas:' + this.id + ':membros', id);
    };
}
