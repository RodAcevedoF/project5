import { getBookQuote } from '../../api/quotesApi';
import './QuoteWidget.css';

const QuoteWidget = () => {
  const container = document.createElement('div');
  container.classList.add('quote-div');

  const loadingMessage = document.createElement('p');
  loadingMessage.textContent = 'Cargando cita...';
  container.appendChild(loadingMessage);

  getBookQuote()
    .then(quote => {
      if (!quote) throw new Error('No quote data found');

      container.innerHTML = ''; // Limpia el mensaje de carga

      const quoteTxt = document.createElement('h4');
      quoteTxt.textContent = `"${quote.quote}"`;

      const quoteAuth = document.createElement('p');
      quoteAuth.textContent = `- ${quote.author || 'Anónimo'}`;

      container.appendChild(quoteTxt);
      container.appendChild(quoteAuth);
    })
    .catch(error => {
      console.error('Error loading quote', error);
      container.innerHTML = '<p>Error al cargar la cita</p>';
    });

  return container;
};

export default QuoteWidget;
