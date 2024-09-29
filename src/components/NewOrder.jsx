import  { useState } from "react"

export default function Component() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 9.99 },
    { id: 2, name: "Product 2", price: 14.99 },
    { id: 3, name: "Product 3", price: 19.99 },
    { id: 4, name: "Product 4", price: 24.99 },
    { id: 5, name: "Product 4", price: 24.99 },
    { id: 6, name: "Product 4", price: 24.99 },
    { id: 7, name: "Product 4", price: 24.99 },
    { id: 8, name: "Product 4", price: 24.99 },
    { id: 9, name: "Product 4", price: 24.99 },
  ])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [quantities, setQuantities] = useState({})
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setShowConfirmation(false)
    setSelectedProducts([]);
    setCustomerEmail("")
    setCustomerName("");
    setQuantities({})
  };
  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities }
        delete newQuantities[productId]
        return newQuantities
      })
    } else {
      setSelectedProducts([...selectedProducts, productId])
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 1,
      }))
    }
  }
  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }))
  }
  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value)
  }
  const handleCustomerEmailChange = (e) => {
    setCustomerEmail(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (customerName && customerEmail && selectedProducts.length > 0) {
      setShowConfirmation(true)
    }
  }
  const subtotal = selectedProducts.reduce((total, productId) => {
    const product = products.find((p) => p.id === productId)
    return total + product.price * quantities[productId]
  }, 0)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white max-h-[750px] p-6 shadow-lg sm:p-8 overflow-y-scroll">
        {showConfirmation ? (
          <>
          <div className="flex flex-col items-center justify-center gap-4 relative">
            <div className="flex items-center justify-center rounded-full bg-green-500 p-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Order Confirmed</h2>
            <p className="text-muted-foreground">Thank you for your order, {customerName}. We'll be in touch soon.</p>
          </div>
          <div className="inline-block text-center absolute top-2 right-4 rounded-full shadow-lg w-6 font-semibold text-xl" onClick={closeModal}>
            <i className="fa fa-times"></i>
          </div>
            
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">New Order</h2>
              <button type="button" className="text-muted-foreground hover:bg-muted rounded-full p-2 overflow-y-scroll">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-6">
              <div className="grid gap-2">
                <label htmlFor="name" className="font-medium">
                  Customer Name
                </label>
                <input
                  id="name"
                  value={customerName}
                  onChange={handleCustomerNameChange}
                  required
                  className="rounded-md bg-stone-100 ring-offset-2 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="font-medium">
                  Customer Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={handleCustomerEmailChange}
                  required
                  className="rounded-md bg-stone-100 ring-offset-2 border-gray-300  px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid gap-4">
                <div className="font-semibold">Products</div>
                <div className="grid gap-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductSelect(product.id)}
                          className="h-4 w-4 rounded border-gray-300 bg-white text-primary focus:ring-primary"
                        />
                        <span>{product.name}</span>
                      </div>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selectedProducts.length > 0 && (
                <div className="grid gap-4">
                  <div className="font-semibold">Selected Products</div>
                  <div className="grid gap-2">
                    {selectedProducts.map((productId) => {
                      const product = products.find((p) => p.id === productId)
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span>{product.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              value={quantities[productId]}
                              onChange={(e) => handleQuantityChange(productId, e.target.value)}
                              className="w-16 rounded-md bg-background px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <span>${(product.price * quantities[productId]).toFixed(2)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  disabled={!customerName || !customerEmail || selectedProducts.length === 0}
                  className="rounded-md bg-green-500 px-4 py-2 text-primary-foreground transition-colors hover:bg-green-600 focus:outline-none focus:ring-1 text-white text-md font-semibold focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Crear Orden
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}