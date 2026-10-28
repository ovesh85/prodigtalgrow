PRODIGITALGROW WEBSITE: QUICK SETUP
==============================
Pages: index.html (Home), linkedin-profile-management.html, meta-ads.html,
product-video.html, digital-marketing.html. Shared styles and scripts are in assets/.

Replace these placeholders before going live:
1. WhatsApp number and email: assets/main.js, CONFIG at the top (one place for all pages).
2. Phone number in the footer: search each page for "+91 99999 99999" / "tel:+919999999999".
3. Founder photo: add assets/img/tushar-panchal.jpg (portrait, about 800x1000).
   Until you add it, the page shows a "TP" initials placeholder.
4. Social links in the footer (href="#").
5. Forms: right now they send the enquiry to WhatsApp (no backend needed).
   To email the enquiry instead, add action="your-endpoint" to the <form>,
   or swap the form for Contact Form 7 / WPForms in WordPress.

Brand files (logo SVGs, favicon) are in assets/img/.
