import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;
        if (!formData.name) {
            newErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = 'El email es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El formato del email no es válido.';
            isValid = false;
        }
        if (!formData.message) {
            newErrors.message = 'El mensaje es obligatorio.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form data submitted:', formData);
            alert('¡Formulario enviado con éxito!');
            // Here you would typically send the form data to a server
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }
    };


  return (
    <section id="contacto" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Contáctenos</h2>
          <p className="text-gray-600 mt-2">Estamos listos para su próximo proyecto.</p>
          <div className="w-24 h-1 bg-[#7cb342] mx-auto mt-4"></div>
        </div>
        <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Información de Contacto</h3>
                <div className="space-y-4 text-gray-600">
                  <p><strong>Teléfonos:</strong> +(57) 1 467.2384 - 467.2385</p>
                  <p><strong>Email:</strong> <a href="mailto:info@ingecon.com.co" className="text-[#809419] hover:underline">info@ingecon.com.co</a></p>
                  <p><strong>Dirección:</strong> Calle 148 No. 7G-42 Barrio Cedritos, Bogotá, Colombia</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <div>
                    <input type="text" name="name" placeholder="Su Nombre" value={formData.name} onChange={handleChange} className={`w-full bg-gray-50 text-gray-800 p-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#a4bf20]`} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Su Email" value={formData.email} onChange={handleChange} className={`w-full bg-gray-50 text-gray-800 p-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#a4bf20]`} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <textarea name="message" placeholder="Su Mensaje" rows={4} value={formData.message} onChange={handleChange} className={`w-full bg-gray-50 text-gray-800 p-3 rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#a4bf20]`}></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="w-full bg-[#7cb342] hover:bg-[#689f38] text-white font-bold py-3 px-6 rounded-md transition duration-300">
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-12">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.223933276813!2d-74.03212808573756!3d4.731778942621434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8f7b1c3e3a4f%3A0x6a0c5c8d6d84a566!2sCl.%20148%20%237g-42%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1683226786183!5m2!1ses!2sco" 
                    width="100%" 
                    height="450" 
                    className="border-0 rounded-lg shadow-md"
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Ingecon S.A.S.">
                </iframe>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;