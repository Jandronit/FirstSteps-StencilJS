class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.75);
                z-index: 10;
                opacity: 0;
                pointer-events: none;
            }

            :host([opened]) #backdrop,
            :host([opened]) #modal
            {
                opacity: 1;
                pointer-events: all;
            }
            #modal {
                position: fixed;
                top: 15vh;
                left: 25%;
                width: 50%;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                z-index: 100;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
            }
            header {
                padding: 1rem;
                border-bottom: 1px solid #ccc;
            }
            ::slotted(h1) {
                font-size: 1.25rem;
            }

            #main {
                padding: 1rem;
            }

            #actions {
                border-top: 1px solid #ccc;
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
            
            }
            #actions button {
                margin: 0 0.25rem;
            }
        </style>    
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">Please confirm payment</slot>
            </header>
            <section id="main">
                <slot name="main"></slot>
            </section>
            <footer id="actions">
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Confirm</button>
            </footer>

        </div>
        `;
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes());
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.hasAttribute('opened')) {
            this.isOpen = true;
    //         if (this.hasAttribute('opened')) {
    //             this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
    //             this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
    //             this.shadowRoot.querySelector('#modal').style.opacity = 1;
    //             this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
            }else{
                this.isOpen = false;
            }
        
    }

    // static get observedAttributes() {
    //     return ['opened'];
    // }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }
}

customElements.define('my-modal', Modal);