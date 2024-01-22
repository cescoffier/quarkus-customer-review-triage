import {css, html, LitElement} from 'lit';
import '@vaadin/icon';
import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/text-area';
import '@vaadin/form-layout';
import '@vaadin/progress-bar';
import '@vaadin/checkbox';
import '@vaadin/combo-box';
import '@vaadin/horizontal-layout';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import {until} from 'lit/directives/until.js';


/**
 * The list of the stored reviews.
 */
export class DemoReviewList extends LitElement {
    static styles = css`
      .grid {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
      }

      h2 {
        text-align: left;
        color: var(--main-highlight-text-color);
      }

      .customer {
        color: #1478dc;
      }

      .sentiment {
        color: #1478dc;
        font-weight: bold;
      }
    `;

    channel = new BroadcastChannel("triage-completed");


    static properties = {
       reviews: {state: true, type: Array}

    }

    constructor() {
        super();
        this.reviews = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.channel.addEventListener("message", (event) => {
            this._fetch();
        });
        this._fetch();
    }

    _fetch() {
        fetch("/reviews")
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.reviews = json;
            });
    }

    render() {
        return html`${until(this._render(), html`<span>Loading reviews...</span>`)}`;
    }

    _render() {
        if (this.reviews) {
            return html`<div class="grid">
                    <div>
                        <h2>Reviews</h2>
                        ${this.reviews.reverse().map(rv => this._renderReview(rv))}
                    </div>
                </div>`;
        }
    }


    _renderReview(rv) {
        return html`
            <p>Review from <span class="customer">${rv.customerId}</span> processed - detected sentiment is: <span class="sentiment">${rv.sentiment}</span></p>
        `
    }


}

customElements.define('demo-review-list', DemoReviewList);