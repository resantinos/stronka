'use strict';

function sanitizeInput(str) {
    return str.replace(/[^\w. ]/gi, '');
}

function createElementWithAttributes(tag, attributes = {}) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

document.addEventListener('DOMContentLoaded', function () {
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
                bootstrapCollapse.hide();
            }
        });
    });

    const products = [
        { id: 1, thumbnail: './images/Products/produkt_1_min.png', detail: './images/Products/Detail/produkt_1.png', module: './images/Products/Detail/produkt_1_module.png' },
        { id: 2, thumbnail: './images/Products/produkt_2_min.png', detail: './images/Products/Detail/produkt_2.png', module: './images/Products/Detail/produkt_2_module.png' },
        { id: 3, thumbnail: './images/Products/produkt_3_min.png', detail: './images/Products/Detail/produkt_3.png', module: './images/Products/Detail/produkt_3_module.png' },
        { id: 4, thumbnail: './images/Products/produkt_4_min.png', detail: './images/Products/Detail/produkt_4.png', module: './images/Products/Detail/produkt_4_module.png' },
        { id: 5, thumbnail: './images/Products/produkt_5_min.png', detail: './images/Products/Detail/produkt_5.png', module: './images/Products/Detail/produkt_5_module.png' },
        { id: 6, thumbnail: './images/Products/produkt_6_min.png', detail: './images/Products/Detail/produkt_6.png', module: './images/Products/Detail/produkt_6_module.png' },
        { id: 7, thumbnail: './images/Products/produkt_7_min.png', detail: './images/Products/Detail/produkt_7.png', module: './images/Products/Detail/produkt_7_module.png' },
        { id: 8, thumbnail: './images/Products/produkt_8_min.png', detail: './images/Products/Detail/produkt_8.png', module: './images/Products/Detail/produkt_8_module.png' }
    ].map(product => ({
        ...product,
        // Sanitize all URLs
        thumbnail: encodeURI(product.thumbnail),
        detail: encodeURI(product.detail),
        module: encodeURI(product.module)
    }));

    const galleryContainer = document.getElementById('gallery-container');
    const modalsContainer = document.getElementById('modals-container');

    // Gallery generation
    products.forEach(product => {
        // Create gallery item using DOM methods
        const galleryItem = createElementWithAttributes('div', {
            class: 'col-md-3 mb-3'
        });

        const galleryInner = createElementWithAttributes('div', {
            class: 'gallery-item',
            'data-bs-toggle': 'modal',
            'data-bs-target': `#productModal${sanitizeInput(product.id.toString())}`
        });

        const img = createElementWithAttributes('img', {
            src: product.thumbnail,
            class: 'img-fluid rounded shadow',
            alt: `Product ${product.id}`
        });

        galleryInner.appendChild(img);
        galleryItem.appendChild(galleryInner);
        galleryContainer.appendChild(galleryItem);

        // Create modal using DOM methods
        const modal = createElementWithAttributes('div', {
            class: 'modal fade',
            id: `productModal${product.id}`,
            tabindex: '-1'
        });

        const modalDialog = createElementWithAttributes('div', {
            class: 'modal-dialog modal-xl'
        });

        const modalContent = createElementWithAttributes('div', {
            class: 'modal-content'
        });

        // Create modal header
        const modalHeader = createElementWithAttributes('div', {
            class: 'modal-header'
        });

        const modalTitle = createElementWithAttributes('h5', {
            class: 'modal-title'
        });
        modalTitle.textContent = `Projekt ${product.id}`;

        const closeButton = createElementWithAttributes('button', {
            type: 'button',
            class: 'btn-close',
            'data-bs-dismiss': 'modal'
        });

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        // Create modal body
        const modalBody = createElementWithAttributes('div', {
            class: 'modal-body'
        });

        const row = createElementWithAttributes('div', {
            class: 'row'
        });

        // Detail image column
        const detailCol = createElementWithAttributes('div', {
            class: 'col-md-6 mb-3'
        });
        const detailImg = createElementWithAttributes('img', {
            src: product.detail,
            class: 'img-fluid',
            alt: `Projekt ${product.id} Detail`
        });
        detailCol.appendChild(detailImg);

        // Module image column
        const moduleCol = createElementWithAttributes('div', {
            class: 'col-md-6 mb-3'
        });
        const moduleImg = createElementWithAttributes('img', {
            src: product.module,
            class: 'img-fluid',
            alt: `Projekt ${product.id} Modul`
        });
        moduleCol.appendChild(moduleImg);

        row.appendChild(detailCol);
        row.appendChild(moduleCol);
        modalBody.appendChild(row);

        // Create modal footer
        const modalFooter = createElementWithAttributes('div', {
            class: 'modal-footer'
        });

        const footerCloseButton = createElementWithAttributes('button', {
            type: 'button',
            class: 'btn btn-secondary',
            'data-bs-dismiss': 'modal'
        });
        footerCloseButton.textContent = 'Schließen';
        modalFooter.appendChild(footerCloseButton);

        // Assemble modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        modalsContainer.appendChild(modal);
    });

    // Services data
    const services = [
        {
            id: 1,
            title: "Schlosserarbeiten",
            images: ["./images/services/s1/1.jpg", "./images/services/s1/2.jpg"],
            content: [
                {
                    text: "Brocet Balance GmbH ist spezialisiert auf die Planung, Produktion und Montage von Stahlkonstruktionen für Bau und Industrie. Wir arbeiten mit Entwicklern und Investoren zusammen, die eine etablierte Position auf dem polnischen und internationalen Markt haben.",
                    list: [
                        "Edelstahlgeländer",
                        "verzinkte und pulverbeschichtete Stahlgeländer",
                        "Glasgeländer",
                        "pulverbeschichtete Aluminiumgeländer",
                        "Stahlkonstruktionen",
                        "Vordächer, Überdachungen usw."
                    ]
                },
                {
                    text: ["Langjährige Erfahrung bei der Durchführung von Projekten auf dem polnischen und internationalen Markt garantiert einen zuverlässigen Ansatz für jedes Projekt.",
                          "Wir verfügen über eigene Produktionsanlagen, und die kontinuierliche Entwicklung unseres Personals bietet unseren Kunden durchdachte und zuverlässige Lösungen."]
                }
            ]
        },
        {
            id: 2,
            title: "Montagearbeiten",
            images: ["./images/services/s2/1.jpg", "./images/services/s2/2.jpg"],
            content: [
                {
                    text: "Brocet Balance GmbH ist spezialisiert auf die Planung, Produktion und Montage von Stahlkonstruktionen für Bau und Industrie. Wir arbeiten mit Entwicklern und Investoren zusammen, die eine etablierte Position auf dem polnischen und internationalen Markt haben.",
                    list: [
                        "Edelstahlgeländer",
                        "verzinkte und pulverbeschichtete Stahlgeländer",
                        "Glasgeländer",
                        "pulverbeschichtete Aluminiumgeländer",
                        "Stahlkonstruktionen",
                        "Vordächer, Überdachungen usw."
                    ]
                },
                {
                    text: ["Langjährige Erfahrung bei der Durchführung von Projekten auf dem polnischen und internationalen Markt garantiert einen zuverlässigen Ansatz für jedes Projekt.",
                          "Wir verfügen über eigene Produktionsanlagen, und die kontinuierliche Entwicklung unseres Personals bietet unseren Kunden durchdachte und zuverlässige Lösungen."]
                }
            ]
        },
        {
            id: 3,
            title: "Schweißarbeiten",
            images: ["./images/services/s3/1.jpg", "./images/services/s3/1.jpg"],
            content: [
                {
                    text: "Brocet Balance GmbH ist spezialisiert auf die Planung, Produktion und Montage von Stahlkonstruktionen für Bau und Industrie. Wir arbeiten mit Entwicklern und Investoren zusammen, die eine etablierte Position auf dem polnischen und internationalen Markt haben.",
                    list: [
                        "Edelstahlgeländer",
                        "verzinkte und pulverbeschichtete Stahlgeländer",
                        "Glasgeländer",
                        "pulverbeschichtete Aluminiumgeländer",
                        "Stahlkonstruktionen",
                        "Vordächer, Überdachungen usw."
                    ]
                },
                {
                    text: ["Langjährige Erfahrung bei der Durchführung von Projekten auf dem polnischen und internationalen Markt garantiert einen zuverlässigen Ansatz für jedes Projekt.",
                          "Wir verfügen über eigene Produktionsanlagen, und die kontinuierliche Entwicklung unseres Personals bietet unseren Kunden durchdachte und zuverlässige Lösungen."]
                }
            ]
        }
        // Add other services here if needed
    ];

    function generateServiceModals() {
        services.forEach(service => {
            const modal = createElementWithAttributes('div', {
                class: 'modal fade',
                id: `servmodal${service.id}`,
                tabindex: '-1'
            });

            const modalContent = createElementWithAttributes('div', {
                class: 'modal-dialog modal-dialog-centered modal-lg'
            });

            const content = createElementWithAttributes('div', {
                class: 'modal-content'
            });

            content.innerHTML = `
                <div class="modal-header">
                    <h5 class="modal-title">${sanitizeInput(service.title)}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${encodeURI(service.images[0])}" class="img-fluid mb-3" alt="${sanitizeInput(service.title)}">
                            <p>${sanitizeInput(service.content[0].text)}</p>
                            ${service.content[0].list ? `
                                <p>Unser Angebot umfasst:
                                    <ul>
                                        ${service.content[0].list.map(item => `<li>${sanitizeInput(item)}</li>`).join('')}
                                    </ul>
                                </p>` : ''}
                        </div>
                        <div class="col-md-6">
                            <img src="${encodeURI(service.images[1])}" class="img-fluid mb-3" alt="${sanitizeInput(service.title)} extra">
                            ${service.content[1].text.map(text => `<p>${sanitizeInput(text)}</p>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                </div>
            `;

            modalContent.appendChild(content);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        });
    }

    // Initialize service modals
    generateServiceModals();

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Script error:', e);
        return false;
    });
});
