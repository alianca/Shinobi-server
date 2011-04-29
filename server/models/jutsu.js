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
    this.nome = attributes.nome;
    this.tipo = attributes.tipo;
    this.forca = attributes.forca;
    this.cooldown = attributes.cooldown;
    this.ativacao = attributes.ativacao;
    this.duracao = attributes.duracao;
    
    this.save = function() {
        redis.hmset('Jutsus:' + this.id + ':atributos',
                    'nome', this.nome,
                    'exp', this.exp,
                    'score', this.score);
    };
    
    this.set_precisao = function(lv1, lv2, lv3) {
        redis.pushl('Jutsus:' + this.id + ':precisao', lv1);
        redis.pushl('Jutsus:' + this.id + ':precisao', lv2);
        redis.pushl('Jutsus:' + this.id + ':precisao', lv3);
    };
    this.get_precisao = function(level) {
        redis.lindex('Jutsus:' + this.id + ':precisao', level);
    };
    
    this.set_critico = function(lv1, lv2, lv3) {
        redis.pushl('Jutsus:' + this.id + ':critico', lv1);
        redis.pushl('Jutsus:' + this.id + ':critico', lv2);
        redis.pushl('Jutsus:' + this.id + ':critico', lv3);
    };
    this.get_critico = function(level) {
        redis.lindex('Jutsus:' + this.id + ':critico', level);
    };
    
    this.set_modifiers = function(mod_list) { // [{atributo: ..., alvo: ..., valor: [lv1,lv2,lv3]}]
        for (var i = 0; i < mod_list.length; i++) {
            redis.set('Jutsus:' + this.id + ':modificadores', JSON.stringify(mod_list[i]));
        }
    }
    
}
