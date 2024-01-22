import {LitElement, html, css} from 'lit';
import '@vaadin/icon';
import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/text-area';
import '@vaadin/form-layout';
import '@vaadin/progress-bar';
import '@vaadin/checkbox';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column.js';

export class DemoTitle extends LitElement {

    static styles = css`
      h1 {
        font-family: "Red Hat Mono", monospace;
        font-size: 60px;
        font-style: normal;
        font-variant: normal;
        font-weight: 700;
        line-height: 26.4px;
        color: var(--main-highlight-text-color);
      }

      .title {
        text-align: center;
        padding: 1em;
        background: var(--main-bg-color);
      }
      
      .explanation {
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        text-align: justify;
        font-size: 20px;
      }
      .picture {
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        display: block;
      }
    `

    render() {
        return html`
            <div class="title">
                <h1>Customer Review Triage</h1>
            </div>
            <div class="explanation">
                This demo shows how an LLM can triage customer reviews automatically.
                This frontend lets you write a review and submit it to the backend.
                The backend invokes the LLM (Mistral) to evaluate the review (1) and stores the result into a database (2).
                The LLM is hosted on OpenShift AI using the <code>caikit</code> model runtime.
                The <em>Reviews</em> section shows the last five reviews and their evaluation (3).
            </div>
            <div class="explanation">
                <img class="picture" src="images/application.png"/>
            </div>
        `
    }


}

customElements.define('demo-title', DemoTitle);