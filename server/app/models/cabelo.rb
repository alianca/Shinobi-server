class Cabelo < Ohm::Model
  attribute :caminho
  attribute :posicao
  reference :cor, CoresCabelo
end
