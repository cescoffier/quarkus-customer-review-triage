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

/**
 * Contains a field to enter the review, the submit button and the message from the backend.
 */
export class DemoReview extends LitElement {
    static styles = css`
      .button {
        cursor: pointer;
      }

      vaadin-text-area {
        width: 20em;
        height: 10rem;
      }

      vaadin-button {
        margin-top: 1em;
      }
    `;

    static properties = {
        review: String,
        complete: Boolean,
        customerIds: Array,
        customer: String
    }

    channel = new BroadcastChannel("triage-completed");

    constructor() {
        super();
        this.complete = true;
        this.review = "";
        this.customer = "";
        this.customerIds = ["customer-1", "customer-2", "customer-3", "customer-4", "customer-5"];
    }

    render() {

        return html`
            <vaadin-vertical-layout theme="spacing padding">
                <vaadin-combo-box
                        label="Customer"
                        item-label-path="name"
                        item-value-path="customerId"
                        .items="${this.customerIds}"
                        helper-text="Select the customer id"
                        @value-changed="${event => {
                            this.customer = event.detail.value;
                        }}"
                ></vaadin-combo-box>
                <vaadin-text-area
                        label="Write your review:"
                        .maxlength=1024
                        .helperText="${`${this.review.length}/1024`}"
                        .value=${this.review}
                        @value-changed="${event => {
                            this.review = event.detail.value;
                        }}"
                >
                </vaadin-text-area>
                <vaadin-button
                        arial-label="Submit your review"
                        ?disabled=${!this.complete}
                        @click=${this._submit} class="button primary">
                    Submit
                </vaadin-button>
            </vaadin-vertical-layout>`;
    }

    _submit() {
        this.complete = false;
        fetch(`/reviews`, {
            method: "POST",
            body: JSON.stringify({
                review: this.review,
                customerId: this.customer
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(data => {
                this.complete = true;
                this.review = "";
                this.channel.postMessage({
                    "success": true
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

}

customElements.define('demo-review', DemoReview);