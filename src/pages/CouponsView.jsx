import CouponCreator from "../components/CouponCreator"
import CouponManager from "../components/CouponManager"

function CouponsView() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Cupones</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Crear Nuevo Cupón</h2>
            <CouponCreator />
          </div>
          <div className="lg:w-2/3 p-6">
            <h2 className="text-xl font-semibold mb-4">Cupones Existentes</h2>
            <CouponManager />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponsView

