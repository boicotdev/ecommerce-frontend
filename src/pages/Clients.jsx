import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserClients } from "../api/actions.api";
import { toast } from "react-hot-toast";
import { DataTable } from "../components/DataTable";
import { formatDate } from "../utils/utils";

function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      key: "avatar",
      header: "Usuario",
      render: (client) => (
        <div className="flex items-center gap-3">
          <img
            src={`http://127.0.0.1:8000/${client.avatar}`}
            alt={client.username}
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <div className="font-medium text-gray-900">{client.username}</div>
            <div className="text-sm text-gray-500">{client.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "rol",
      header: "Rol",
      render: (client) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          client.rol === 'Cliente' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-sky-50 text-sky-700 border border-sky-200'
        }`}>
          {client.rol}
        </span>
      ),
    },
    {
      key: "date_joined",
      header: "Fecha de registro",
      render: (client) => (
        <div className="text-sm text-gray-600">
          {formatDate(client.date_joined)}
        </div>
      ),
    },
    {
      key: "orders_count",
      header: "Pedidos",
      render: (client) => (
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {client.orders_count || 0}
          </span>
        </div>
      ),
    },
  ];

  const handleDelete = async (client) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        // Aquí iría la llamada a la API para eliminar
        setClients(clients.filter((c) => c.id !== client.id));
        toast.success("Cliente eliminado exitosamente");
      } catch (error) {
        toast.error("Error al eliminar el cliente");
      }
    }
  };

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response = await getUserClients();
        if (response.status === 200) {
          setClients(response.data);
        }
      } catch (error) {
        toast.error("Error al cargar los clientes");
        console.error(error);
      }
    };
    loadClients();
  }, []);

  return (
    <DataTable
      data={clients}
      columns={columns}
      title="Clientes"
      subtitle="Gestiona los clientes de la tienda"
      searchPlaceholder="Buscar por nombre o email..."
      filterOptions={['Cliente', 'Administrador']}
      filterKey="rol"
      onDelete={handleDelete}
      onEdit={(client) => navigate(`/dashboard/customers/${client.id}/edit`)}
      onView={(client) => navigate(`/dashboard/customers/${client.id}`)}
      createButton={{
        path: "/dashboard/customers/create",
        label: "Nuevo Cliente",
      }}
      itemsPerPage={10}
      emptyMessage="No hay clientes registrados"
    />
  );
}

export default Clients;