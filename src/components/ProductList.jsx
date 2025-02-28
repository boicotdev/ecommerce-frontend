import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../api/actions.api";
import { toast } from "react-hot-toast";
import { DataTable } from "./DataTable";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      key: "main_image",
      header: "Imagen",
      image: true,
    },
    {
      key: "name",
      header: "Nombre",
    },
    {
      key: "category",
      header: "Categoría",
      render: (product) => product.category?.name,
    },
    {
      key: "price",
      header: "Precio",
      render: (product) => `$${product.price.toFixed(2)}`,
    },
    {
      key: "stock",
      header: "Stock",
    },
  ];

  const handleDelete = async (product) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const response = await deleteProduct({ sku: product.sku });
        if (response.status === 204) {
          toast.success("Producto eliminado exitosamente");
          setProducts(products.filter((p) => p.sku !== product.sku));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error al eliminar el producto");
      }
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        toast.error("Error al cargar los productos");
        console.error(error);
      }
    };
    loadProducts();
  }, []);

  return (
    <DataTable
      data={products}
      columns={columns}
      title="Productos"
      subtitle="Gestiona el catálogo de productos"
      searchPlaceholder="Buscar productos..."
      filterOptions={[...new Set(products.map((product) => product.category?.name))]}
      filterKey="category"
      onDelete={handleDelete}
      onEdit={(product) => navigate(`/shop/products/edit/${product.sku}/`)}
      onView={(product) => navigate(`/dashboard/products/${product.sku}/`)}
      createButton={{
        path: "/shop/create-product/",
        label: "Nuevo Producto",
      }}
      itemsPerPage={5}
    />
  );
}

export default ProductList;