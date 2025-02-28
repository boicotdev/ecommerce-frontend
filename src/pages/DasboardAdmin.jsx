import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../api/actions.api";
import { formatPrice, formatDate } from "../utils/utils";
import { toast } from "react-hot-toast";
import { DataTable } from "../components/DataTable";

const orderStatusColors = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  SHIPPED: "bg-blue-50 text-blue-700 border-blue-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
};

const orderStatusLabels = {
  PENDING: "Pendiente",
  SHIPPED: "Preparada",
  DELIVERED: "Entregada",
  CANCELLED: "Cancelada",
};

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const columns = [
    {
      key: "id",
      header: "Pedido #",
      render: (order) => (
        <div className="font-medium text-gray-900">#{order.id}</div>
      ),
    },
    {
      key: "customer",
      header: "Cliente",
      render: (order) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {order.customer.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{order.customer}</div>
            <div className="text-sm text-gray-500">{formatDate(order.date)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (order) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${orderStatusColors[order.status]}`}>
          {orderStatusLabels[order.status]}
        </span>
      ),
    },
    {
      key: "total",
      header: "Total",
      render: (order) => (
        <div className="text-right font-medium text-gray-900">
          ${formatPrice(order.total)}
        </div>
      ),
    },
  ];

  const handleSort = (key) => {
    setSortConfig((currentSort) => ({
      key,
      direction:
        currentSort.key === key && currentSort.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key === 'total') {
      return sortConfig.direction === 'asc'
        ? a.total - b.total
        : b.total - a.total;
    }
    
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getOrders();
        if (response.status === 200) {
          const formattedOrders = response.data.map((order) => ({
            id: order.id,
            customer: `${order.user.first_name} ${order.user.last_name}`,
            date: order.creation_date,
            status: order.status,
            total: order.total,
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        toast.error("Error al cargar los pedidos");
        console.error(error);
      }
    };
    loadOrders();
  }, []);

  const customActions = (order) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate(`/orders/order-details/${order.id}/`)}
        className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        title="Ver detalles"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      <button
        onClick={() => navigate(`/orders/edit/${order.id}/`)}
        className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        title="Editar pedido"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      {order.status === 'PENDING' && (
        <button
          onClick={() => {/* Implementar cancelación */}}
          className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
          title="Cancelar pedido"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <DataTable
      data={sortedOrders}
      columns={columns}
      title="Pedidos"
      subtitle="Gestiona los pedidos de la tienda"
      searchPlaceholder="Buscar por # de pedido o cliente..."
      filterOptions={Object.keys(orderStatusLabels)}
      filterKey="status"
      onSort={handleSort}
      sortConfig={sortConfig}
      customActions={customActions}
      createButton={{
        path: "/orders/create",
        label: "Nuevo Pedido",
      }}
      itemsPerPage={10}
      emptyMessage="No hay pedidos registrados"
      headerActions={
        <div className="flex gap-2">
          <button
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => {/* Implementar exportación */}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar
          </button>
          <button
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => {/* Implementar impresión */}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
        </div>
      }
    />
  );
}

export default OrderManager;