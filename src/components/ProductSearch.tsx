import React, { useState } from 'react';
import { searchProducts, Product } from '@/services/mercadoLibreService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const results = await searchProducts(query);
    setProducts(results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Buscador de Productos de Mercado Libre</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-lg mx-auto">
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Buscar
        </Button>
      </form>

      {loading && <p className="text-center text-gray-600">Cargando productos...</p>}
      {!loading && products.length === 0 && query.trim() && (
        <p className="text-center text-gray-600">No se encontraron productos para "{query}".</p>
      )}
      {!loading && products.length === 0 && !query.trim() && (
        <p className="text-center text-gray-600">Ingresa un término de búsqueda para empezar.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;