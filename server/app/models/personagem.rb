class Personagem < Ohm::Model
  attribute :nome
  attribute :experiencia
  attribute :dinheiro

  set :inventario, Item
  
  reference :cabelo, Cabelo
end
