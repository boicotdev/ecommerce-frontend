import { useState } from "react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="w-full max-w-md p-4 shadow-lg border rounded-2xl bg-white text-center">
        <div className="space-y-4">
          <div className="mx-auto text-green-600 text-3xl">📩</div>
          <h2 className="text-xl font-semibold">Suscríbete a nuestro boletín</h2>
          <p className="text-gray-600 text-sm">
            Recibe las mejores ofertas y novedades sobre nuestros productos agrícolas.
          </p>
          {subscribed ? (
            <p className="text-green-600 font-medium">¡Gracias por suscribirte!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
              />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg">
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
