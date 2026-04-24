// ========================================
// FAQ Page
// ========================================

export function renderFaq(container) {
  container.innerHTML = `
    <div class="faq-page">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <div class="product-accordion">
        ${[
          { q: 'Where are your rugs made?', a: 'All our rugs are handcrafted in Northern Afghanistan by skilled artisan weavers from the Turkmen tribe. We also work with production partners in Turkey and Pakistan.' },
          { q: 'What materials are used in your rugs?', a: 'Our rugs are made from premium Afghan Ghazni Wool with cotton foundations. We use natural vegetable dyes to create vibrant, long-lasting colors.' },
          { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days within the US. For international orders, please contact us for estimated delivery times.' },
          { q: 'What is your return policy?', a: 'All rugs come with a 30-day return policy. Items must be in their original, unused condition. Please contact us at velourarugs@hotmail.com to initiate a return.' },
          { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all rug orders over $300. For orders under $300, a flat shipping fee applies.' },
          { q: 'How do I care for my hand-knotted rug?', a: 'We recommend regular vacuuming (without the beater bar), rotating the rug periodically for even wear, and professional cleaning when needed. Avoid direct sunlight for extended periods.' },
          { q: 'Are your prices negotiable?', a: 'Our listed prices are already discounted up to 60% off retail. Additionally, you can use code EXTRA15%OFF for an extra 15% discount on your entire order.' },
          { q: 'Can I visit your showroom?', a: 'Yes! Our showroom is located at 4731 Pell Dr, Ste 5, Sacramento, CA 95838. We are open Monday-Saturday by appointment only. Please call +1 415 565 1579 to schedule a visit.' },
          { q: 'Do you offer rug pads?', a: 'Yes, we carry premium anti-slip dual surface rug pads that protect your floors and keep your rug in place. You can find them in our Rug Pads collection.' },
          { q: 'How can I determine the right rug size?', a: 'We recommend measuring your room and furniture placement before ordering. For living rooms, the rug should be large enough for at least the front legs of furniture to sit on it. For dining rooms, add 24 inches to each side of the table.' }
        ].map((faq, i) => `
          <div class="product-accordion__item">
            <button class="product-accordion__header ${i === 0 ? 'active' : ''}" data-faq="${i}">
              <span>${faq.q}</span>
              <span class="product-accordion__icon">${i === 0 ? '↕' : '↓'}</span>
            </button>
            <div class="product-accordion__content ${i === 0 ? 'active' : ''}" id="faq-${i}">
              <p>${faq.a}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Accordion functionality
  container.querySelectorAll('.product-accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const faqId = header.dataset.faq;
      const content = document.getElementById(`faq-${faqId}`);
      header.classList.toggle('active');
      content?.classList.toggle('active');
    });
  });
}
