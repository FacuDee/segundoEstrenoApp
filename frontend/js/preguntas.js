// Preguntas para "¿Querés comprar?"
const faqsComprar = [
  {
    pregunta: "¿Cuánto tiempo tarda la entrega?",
    respuesta: "El tiempo de entrega depende del método de envío y tu ubicación. Consulta los detalles en la sección de envíos."
  },
  {
    pregunta: "¿Cómo puedo rastrear mi pedido?",
    respuesta: "Puedes rastrear tu pedido en la página de seguimiento ingresando tu número de orden."
  },
  {
    pregunta: "¿Puedo cancelar una compra después de pagar?",
    respuesta: "Sí, puedes cancelar tu compra dentro del período permitido. Consulta las políticas de cancelación."
  },
  {
    pregunta: "¿Cómo funcionan las devoluciones?",
    respuesta: "Las devoluciones deben solicitarse dentro del plazo establecido. Se pueden hacer desde tu perfil de usuario."
  },
  {
    pregunta: "¿Cómo contacto al vendedor antes de comprar?",
    respuesta: "Puedes contactar al vendedor mediante la sección de mensajes en la plataforma."
  }
];

// Preguntas para "¿Querés vender?"
const faqsVender = [
  {
    pregunta: "¿Cómo publico un producto en la plataforma?",
    respuesta: "Para publicar un producto, ve a tu cuenta y sigue los pasos para subir imágenes, descripción y precio."
  },
  {
    pregunta: "¿Cuáles son los costos y comisiones por vender?",
    respuesta: "Las comisiones varían según la categoría del producto y el método de pago elegido."
  },
  {
    pregunta: "¿Cómo recibiré el pago por mis ventas?",
    respuesta: "Los pagos se procesan automáticamente a la cuenta registrada en la plataforma. Puedes consultar los detalles."
  },
  {
    pregunta: "¿Qué pasa si un comprador solicita una devolución?",
    respuesta: "Si un comprador solicita una devolución, debes seguir el proceso de devolución y reembolso indicado en la plataforma."
  },
  {
    pregunta: "¿Qué tipo de productos admite la plataforma?",
    respuesta: "La plataforma permite la venta de una amplia variedad de productos, pero hay restricciones para artículos prohibidos. Revisa las políticas de publicación."
  }
];

function cargarFAQ(faqs, containerId) {
  const faqContainer = document.getElementById(containerId);
  if (faqContainer) {
    faqs.forEach(faq => {
      faqContainer.insertAdjacentHTML('beforeend', `
        <div class="faq-title">
          ${faq.pregunta}
          <span class="faq-arrow">
            <svg width="16" height="16" viewBox="0 0 20 20">
              <path d="M2,6 l8,8,8,-8" stroke="#885a89" stroke-width="2" fill="none"/>
            </svg>
          </span>
        </div>
        <div class="faq-content" style="display:none;">
          ${faq.respuesta}
        </div>
      `);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  cargarFAQ(faqsComprar, "faq-comprar");
  cargarFAQ(faqsVender, "faq-vender");

  // Animación de flecha y mostrar/ocultar respuesta
  document.querySelectorAll('.faq-title').forEach(function(title) {
    title.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content && (content.style.display === "none" || content.style.display === "")) {
        content.style.display = "block";
      } else if (content) {
        content.style.display = "none";
      }
    });
  });
});