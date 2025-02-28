const ManagementView = ({ title, createTitle, managerTitle, CreatorComponent, ManagerComponent }) => {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona y crea nuevos elementos</p>
        </div>
  
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="lg:grid lg:grid-cols-3 lg:divide-x divide-gray-100">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800">{createTitle}</h2>
                <p className="mt-1 text-sm text-gray-500">Añade nuevos elementos al sistema</p>
              </div>
              <CreatorComponent />
            </div>
            
            <div className="lg:col-span-2 p-6 bg-gray-50">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800">{managerTitle}</h2>
                <p className="mt-1 text-sm text-gray-500">Visualiza y gestiona los elementos existentes</p>
              </div>
              <ManagerComponent />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManagementView;