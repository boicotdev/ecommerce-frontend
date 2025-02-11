import CategorieCreator from "../components/CategorieCreator";
import CategorieManager from "../components/CategorieManager";

function CategorieView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gestión de Categorias
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Crear Nueva Categoria</h2>
            <CategorieCreator />
          </div>
          <div className="lg:w-2/3 p-6">
            <h2 className="text-xl font-semibold mb-4">Categorias Existentes</h2>
            <CategorieManager />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorieView;
