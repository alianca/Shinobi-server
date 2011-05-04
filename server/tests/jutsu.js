var jutsus = require('../models/jutsu');
var personagens = require('../models/character');

var vows = require('vows');

vows.describe('Jutsu').addBatch({
    'A character': {
        topic: personagens.createCharacter({
            'nome' : 'Edric Garran',
            'id' : 'plr12132',
            'sexo' : 'm',
            'vila' : '0',
            'organizacao' : '0',
            'guild' : '0'
        }),

        'that knows a level 0 jutsu': {
            topic: function(character) {
                var jutsu = jutsus.createJutsu({
                    'nome' : 'Whatjutsuever',
                    'id' : '111',
                    'natureza' : 'whatever',
                    'level_minimo' : '42',
                    'requerimento_cla' : '',
                    'descricao' : 'whatever',
                    'tipo' : '',
                    'forca' : '42',
                    'cooldown' : '42',
                    'ativacao' : '42',
                    'duracao' : '42'
                });

                jutsu.set_properties([16, 23, 42], [4, 8, 15], []);

                character.add_jutsu(jutsu, 0, function(ret){});

                return {
                    'jutsu': jutsu,
                    'character': character
                };
            },
            
            'should have level 0 jutsu stats': function(topic) {
                topic.character.get_jutsu_properties(topic.jutsu, function(prop) {
                    assert.equal(prop.critico, 16);
                    assert.equal(prop.precisao, 4);
                });
            },

            'when the character advances the jutsu': {
                topic: function(jutsu, character) {
                    character.advance_jutsu(jutsu, 1, function(ret) {});
                    return {
                        'jutsu': jutsu,
                        'character': character
                    };
                },
                
                'should have level 1 jutsu stats': function(topic) {
                    topic.character.get_jutsu_properties(topic.jutsu, function(prop) {
                        assert.equal(prop.critico, 23);
                        assert.equal(prop.precisao, 8);
                    });
                }
            }
        }
    }
}).export(module);
