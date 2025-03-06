
import PropTypes from "prop-types";

const TarificationForm = ({ formData, setFormData }) => {
    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
          setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (name === "isPaid") {
          setFormData(prev => ({ ...prev, isPaid: value === "payant" }));
        } else if (name.startsWith("tickets")) {  // Utilisation de "tickets" pour tous les champs de ticket
          if (index === undefined) return;
          const [, field] = name.split(".");
          const updatedTickets = formData.tickets.map((ticket, i) =>
            i === index ? { ...ticket, [field]: value } : ticket
          );
          setFormData(prev => ({ ...prev, tickets: updatedTickets }));
        } else {
          setFormData(prev => ({ ...prev, [name]: value }));
        }
      };
    
      const addTicketType = () => {
        if (formData.tickets.length < 4) {
          setFormData(prev => ({
            ...prev,
            tickets: [...prev.tickets, { typeTicket: "", qte: "", price: "" }],
          }));
        }
      };
    
      const removeTicketType = (index) => {
        setFormData(prev => ({
          ...prev,
          tickets: prev.tickets.filter((_, i) => i !== index),
        }));
      };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Tarification</h3>
      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="isPaid"
            value="gratuit"
            checked={!formData.isPaid}
            onChange={handleChange}
            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 transition-all duration-200"
          />
          <span className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            Gratuit
          </span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="isPaid"
            value="payant"
            checked={formData.isPaid}
            onChange={handleChange}
            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 transition-all duration-200"
          />
          <span className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            Payant
          </span>
        </label>
      </div>

      {formData.isPaid && (
        <div className="mt-6 space-y-6 bg-gray-50 p-6 rounded-xl shadow-inner animate-fade-in">
          <h4 className="text-md font-semibold text-gray-700">Types de tickets</h4>
          {formData.tickets.map((ticket, index) => (
            <div key={index} className="flex items-center space-x-6">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Type de ticket
                  </label>
                  <input
                    type="text"
                    name="tickets.typeTicket"
                    value={ticket.typeTicket}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                    placeholder="Ex: Standard"
                  />
                </div>
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Quantité
                  </label>
                  <input
                    type="number"
                    name="tickets.qte"
                    value={ticket.qte}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                    placeholder="Ex: 100"
                    min="0"
                  />
                </div>
                <div className="relative group">
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Prix
                  </label>
                  <input
                    type="text"
                    name="tickets.price"
                    value={ticket.price}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                    placeholder="Ex: 1000 CFA"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                {formData.tickets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicketType(index)}
                    className="p-3 bg-red-100 rounded-full hover:bg-red-200 transition-all duration-300"
                  >
                    <span className="w-4 h-4 text-red-600">X</span>
                  </button>
                )}
                {index === formData.tickets.length - 1 &&
                  formData.tickets.length < 4 && (
                    <button
                      type="button"
                      onClick={addTicketType}
                      className="p-3 bg-green-100 rounded-full hover:bg-green-200 transition-all duration-300"
                    >
                      <span className="w-4 h-4 text-green-600">+</span>
                    </button>
                  )}
              </div>
            </div>
          ))}
          {formData.tickets.length >= 4 && (
            <p className="text-sm text-gray-500">
              Maximum de 4 types de tickets atteint.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="relative group">
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Début de la vente
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="saleStartDate"
                  value={formData.saleStartDate}
                  onChange={(e) => handleChange(e)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800"
                />
                
              </div>
            </div>
            <div className="relative group">
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Fin de la vente
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="saleEndDate"
                  value={formData.saleEndDate}
                  onChange={(e) => handleChange(e)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800"
                />
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TarificationForm.propTypes = {
  formData: PropTypes.shape({
    
    isPaid: PropTypes.bool,
    tickets: PropTypes.arrayOf(
      PropTypes.shape({
        typeTicket: PropTypes.string,
        qte: PropTypes.string,
        price: PropTypes.string,
      })
    ),
    saleStartDate: PropTypes.string,
    saleEndDate: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default TarificationForm;
