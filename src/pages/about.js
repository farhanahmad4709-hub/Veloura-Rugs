// ========================================
// About Page
// ========================================

export function renderAbout(container) {
  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="about-hero">
      <span class="about-hero__text">VELOURA RUGS</span>
    </div>

    <!-- Main About Section -->
    <div class="about-main">
      <div class="about-main__vertical">Weaving the Tradition and Art of History.</div>
      <div class="about-main__image">
        <img src="https://cdn.shopify.com/s/files/1/0462/6808/8473/files/15342.jpg" alt="Traditional Hand Knotted Rug" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div class="about-main__content">
        <h2>About Us</h2>
        <p>Established in the late 1970s by my Grandfather through the art of rug trading at flea markets, this rug enterprise evolved over the years. By the 1980s, we transitioned to crafting our own distinct rugs, and since that point, it has remained under the dedicated stewardship of successive family members.</p>
        <p>Our operational locus lies in Northern Afghanistan, where we have chosen to collaborate with the Turkmen tribe, a decision that resonates deeply with our commitment to authenticity and heritage.</p>
        <a href="#/collection/all-rugs" class="btn btn--primary">Shop Our Rugs →</a>
      </div>
    </div>

    <!-- Impact Section -->
    <div class="about-impact">
      <h2>Weaving Change: <strong>Empowering Over 2,500 Families</strong></h2>
      <p>Notably, our rug weaving workforce primarily comprises skilled women, each of whom contributes to the weaving process from the comfort of their homes. In lieu of expansive factories, we have opted for a more personalized approach, affording our weavers the flexibility to work in tandem with their own schedules. This approach has engendered a harmonious fusion of tradition and modernity within our production model.</p>
      <p>Significantly, our business impacts over 2500 families, functioning as a linchpin of sustenance for numerous households by providing them with a pivotal income stream through rug weaving — a primary livelihood within these regions.</p>
      <p>These indomitable weavers constitute the cornerstone of our motivation as the third generation at the helm. Their unwavering dedication propels us to meticulously chart our course toward the overarching company goal and vision: to uplift the plight of these underprivileged families by creating employment opportunities and engendering positive change through our enterprise.</p>
      <p>Please reach out to me if you want to know more on the story and This shop is manage and control in California, United States and our production partners ( Parent company ) ship the rugs from Istanbul - Turkey and Lahore - Pakistan.</p>
    </div>
  `;
}
