class RelatedProduct < ApplicationRecord
  belongs_to :product
  belongs_to :related_product

   # Validaciones
   validates :relationship_type, inclusion: { in: %w(Relacionado Subproducto) }
end
