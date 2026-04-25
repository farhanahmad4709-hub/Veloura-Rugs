// ========================================
// Policy Pages
// ========================================

const policies = {
  refund: {
    title: 'Refund Policy',
    content: `
      <h2>Returns</h2>
      <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
      <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
      
      <h2>Refunds (if applicable)</h2>
      <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
      <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
      
      <h2>Late or missing refunds (if applicable)</h2>
      <p>If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.</p>
      <p>Next contact your bank. There is often some processing time before a refund is posted.</p>
      <p>If you've done all of this and you still have not received your refund yet, please contact us at velourarugs@hotmail.com.</p>
      
      <h2>Exchanges (if applicable)</h2>
      <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at velourarugs@hotmail.com.</p>
      
      <h2>Shipping</h2>
      <p>To return your product, you should mail your product to: 4731 Pell Dr, Ste 5, Sacramento, CA 95838.</p>
      <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
    `
  },
  privacy: {
    title: 'Privacy Policy',
    content: `
      <h2>What personal information we collect</h2>
      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
      <p>Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
      
      <h2>How we use your personal information</h2>
      <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
      <ul>
        <li>Screen our orders for potential risk or fraud</li>
        <li>Provide you with information or advertising relating to our products or services</li>
        <li>Improve and optimize our Site</li>
      </ul>
      
      <h2>Sharing your personal information</h2>
      <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. We use Google Analytics to help us understand how our customers use the Site.</p>
      
      <h2>Your rights</h2>
      <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.</p>
      
      <h2>Contact us</h2>
      <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at velourarugs@hotmail.com or by mail at 4731 Pell Dr, Ste 5, Sacramento, CA 95838.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    content: `
      <h2>Overview</h2>
      <p>This website is operated by Veloura Rugs. Throughout the site, the terms "we", "us" and "our" refer to Veloura Rugs. Veloura Rugs offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
      
      <h2>Online Store Terms</h2>
      <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.</p>
      <p>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>
      
      <h2>General Conditions</h2>
      <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted.</p>
      
      <h2>Accuracy of Information</h2>
      <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only.</p>
      
      <h2>Modifications to the Service and Prices</h2>
      <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.</p>
      
      <h2>Contact Information</h2>
      <p>Questions about the Terms of Service should be sent to us at velourarugs@hotmail.com.</p>
    `
  },
  shipping: {
    title: 'Shipping Policy',
    content: '' // Dynamic content generated in renderPolicy
  },
  'contact-info': {
    title: 'Contact Information',
    content: `
      <h2>Our Location</h2>
      <p><strong>Veloura Rugs</strong></p>
      <p>4731 PELL DR, STE 5</p>
      <p>SACRAMENTO, CA 95838</p>
      
      <h2>Business Hours</h2>
      <p>Monday - Saturday: By Appointment Only</p>
      <p>Sunday: Closed</p>
      
      <h2>Contact</h2>
      <p><strong>Phone:</strong> +1 415 565 1579</p>
      <p><strong>Email:</strong> velourarugs@hotmail.com</p>
      
      <h2>Social Media</h2>
      <p>Follow us on Facebook, Pinterest, and Instagram for the latest updates and new arrivals.</p>
      
      <h2>Customer Service</h2>
      <p>For any questions, concerns, or inquiries about our products, orders, or services, please don't hesitate to reach out. We strive to respond to all inquiries within 24 hours during business days.</p>
    `
  }
};

export function renderPolicy(container, params) {
  const type = params.type;
  const policyData = policies[type];
  
  if (!policyData) {
    container.innerHTML = '<div class="section" style="text-align:center;padding:100px;"><h1>Page Not Found</h1></div>';
    return;
  }

  // Generate content dynamically to ensure window.formatPrice is available
  let content = policyData.content;
  if (type === 'shipping') {
    content = `
      <h2>Domestic Shipping (United States)</h2>
      <p>We offer FREE shipping on all orders over ${window.formatPrice(300)} within the continental United States.</p>
      <p>Orders under ${window.formatPrice(300)} will be charged a flat rate shipping fee.</p>
      <p>Standard delivery takes 5-7 business days from the date of shipment.</p>
      
      <h2>Processing Time</h2>
      <p>All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
      
      <h2>Tracking</h2>
      <p>Once your order has shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to monitor the delivery status of your order.</p>
      
      <h2>International Shipping</h2>
      <p>For international orders, please contact us directly at velourarugs@hotmail.com for shipping quotes and estimated delivery times.</p>
      
      <h2>Shipping Insurance</h2>
      <p>All orders are fully insured during transit. If your order arrives damaged, please contact us immediately with photos of the damage and we will arrange a replacement or refund.</p>
    `;
  }

  container.innerHTML = `
    <div class="policy-page">
      <h1>${policyData.title}</h1>
      <div class="policy-content">
        ${content}
      </div>
    </div>
  `;
}


