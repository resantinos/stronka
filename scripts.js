'use strict';

function sanitizeInput(str) {
    if (!str) return '';
    // Allow more characters while still preventing XSS
    return str.replace(/[<>]/g, '').trim();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
                    texts: [
                        "Die BroCet Balance GmbH ist auf die Planung, Herstellung und Montage von Stahlkonstruktionen für Bau und Industrie spezialisiert. Wir arbeiten mit Bauherren und Investoren zusammen, die sich auf dem polnischen und internationalen Markt etabliert haben.",
                        "Unser Angebot umfasst:"
                    ],
                    list: [
                        "Balustraden aus Edelstahl",
                        "Verzinkte und pulverbeschichtete Stahlgeländer",
                        "Glasscharniere",
                        "Pulverbeschichtete Aluminium-Geländer",
                        "Stahlkonstruktionen",
                        "Vordächer etc."
                    ]
                },
                {
                    text: ["Langjährige Erfahrung in der Realisierung von Projekten auf dem polnischen und internationalen Markt garantiert eine zuverlässige Herangehensweise an jedes Projekt.",
                          "Wir verfügen über eigene Produktionsanlagen, und die ständige Weiterbildung unserer Mitarbeiter gewährleistet durchdachte und zuverlässige Lösungen für unsere Kunden."]
                }
            ]
        },
        {
            id: 2,
            title: "Montagearbeiten",
            images: ["./images/services/s2/1.jpg", "./images/services/s2/2.jpg"],
            content: [
                {
                    texts: [
                        "Wir arbeiten in erster Linie für verschiedene Stahlbau- und Metallbauunternehmen in ganz Deutschland.",
                        "Die BroCet Balance GmbH löst Ihr Personalproblem auf verschiedene Arten:"
                    ],
                    list: [
                        "Gutes, praxiserfahrenes Personal unter der jeweiligen Führung des Auftraggebers",
                        "Komplettarbeiten eigenverantwortlich mit fachgeschultem Personal unter der Obhut unserer Obermonteure sowie Bauleiter"
                    ]
                },
                {
                    text: ["Somit sind wir in der Lage, Bauvorhaben (reine Lohn- bzw. Montagekosten) bis 150.000 € abzuwickeln. Arbeiten mit Aluminium, Stahl sowie Glas sind uns geläufig.",
                          "Wir sind im Bereich der Fernmontage flexibel, das heißt z.B. 10-Tages-Rhythmus zu arbeiten: 1. Woche Montag - Samstag, 2. Woche Montag - Donnerstag. Sollte es allerdings zu Termindruck kommen, sind wir auch bereit, Sonntagsarbeit auszuführen.",
                          "Es liegt uns daran, eine solide und dauerhafte Geschäftsbeziehung aufzubauen, was bestimmt auch in Ihrem Interesse ist. Testen Sie uns! Für weitere Fragen stehen wir Ihnen sehr gerne zur Verfügung."]
                }
            ]
        },
        {
            id: 3,
            title: "Schweißarbeiten",
            images: ["./images/services/s3/1.jpg", "./images/services/s3/2.jpg"],
            content: [
                {
                    texts: [
                        "Wir führen Schweißarbeiten für Stahl- und Metallbaubetriebe in ganz Deutschland aus.",
                        "Die BroCet Balance GmbH löst Personalprobleme auf vielfältige Weise:"
                    ],
                    list: [
                        "Gutes, praxiserfahrenes Personal unter entsprechender Kundenbetreuung",
                        "Völlig selbstständiges Arbeiten mit fachlich geschultem Personal unter der Aufsicht unserer Obermonteure und Projektleiter"   
                    ]
                },
                {
                    certText: "Wir haben IWE-zertifiziertes Schweißpersonal. Unsere Schweißer sind zertifiziert und methodisch geschult in:",
                    certList: ["WIG", "MIG", "MAG", "MMA"],
                    text: ["Wir sind bestrebt, eine solide und dauerhafte Geschäftsbeziehung aufzubauen, was sicherlich auch in Ihrem Interesse ist. Sollten Sie weitere Fragen haben, zögern Sie bitte nicht, uns zu kontaktieren."]
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
                    <h5 class="modal-title">${escapeHtml(service.title)}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${encodeURI(service.images[0])}" class="img-fluid mb-3" alt="${escapeHtml(service.title)}">
                            ${service.content[0].texts ? 
                                service.content[0].texts.map(text => `<p>${escapeHtml(text)}</p>`).join('') : 
                                service.content[0].text ? `<p>${escapeHtml(service.content[0].text)}</p>` : ''
                            }
                            ${service.content[0].list ? `
                                <ul class="list-unstyled">
                                    ${service.content[0].list.map(item => `<li><i class="bi bi-check2"></i> ${escapeHtml(item)}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                        <div class="col-md-6">
                            <img src="${encodeURI(service.images[1])}" class="img-fluid mb-3" alt="${escapeHtml(service.title)} extra">
                            ${service.content[1].certText ? `<p>${escapeHtml(service.content[1].certText)}</p>` : ''}
                            ${service.content[1].certList ? `
                                <ul class="list-unstyled">
                                    ${service.content[1].certList.map(item => `<li><i class="bi bi-check2"></i> ${escapeHtml(item)}</li>`).join('')}
                                </ul>
                            ` : ''}
                            ${Array.isArray(service.content[1].text) ? 
                                service.content[1].text.map(text => `<p>${escapeHtml(text)}</p>`).join('') : 
                                service.content[1].text ? `<p>${escapeHtml(service.content[1].text)}</p>` : ''
                            }
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
