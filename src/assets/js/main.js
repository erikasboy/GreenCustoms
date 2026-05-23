/* Green Customs — main.js */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Scroll-based header shadow
  ---------------------------------------------------------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ----------------------------------------------------------
     2. Shop category filter
  ---------------------------------------------------------- */
  const filterTabs    = document.querySelectorAll('.filter-tab');
  const productCards  = document.querySelectorAll('#product-grid .product-card');
  const acousticMsg   = document.getElementById('acoustic-coming-soon');
  const productGrid   = document.getElementById('product-grid');

  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const filter = tab.dataset.filter;

        // Handle acoustic "coming soon" panel
        if (acousticMsg) {
          if (filter === 'acoustic-guitars') {
            acousticMsg.hidden = false;
            acousticMsg.classList.add('visible');
            if (productGrid) productGrid.style.display = 'none';
          } else {
            acousticMsg.hidden = true;
            acousticMsg.classList.remove('visible');
            if (productGrid) productGrid.style.display = '';
          }
        }

        // Filter product cards
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // Check for ?category= param on page load
    const params = new URLSearchParams(window.location.search);
    const initCategory = params.get('category');
    if (initCategory) {
      const matchTab = document.querySelector(`.filter-tab[data-filter="${initCategory}"]`);
      if (matchTab) matchTab.click();
    }
  }

})();
