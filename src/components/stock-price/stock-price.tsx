import { Component, State, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'my-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})

export class StockPrice {

  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid: boolean;
  @State() error: string;

  @Prop({mutable: true, reflect: true}) stockSymbol: string;

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    const stockSymbol = this.stockInput.value;
    this.fetchStockPrice(stockSymbol);
    }

    componentWillLoad() {
      console.log('componentWillLoad');
      this.fetchedPrice = 0;
    }

    componentDidLoad() {
      console.log('componentDidLoad');
      if (this.stockSymbol) {
        this.fetchStockPrice(this.stockSymbol);
      }
    }

    componentWillUpdate() {
      console.log('componentWillUpdate');
    }

    componentDidUpdate() {
      console.log('componentDidUpdate');
    }

    disconnectedCallback() {
      console.log('disconnectedCallback');
    }

    fetchStockPrice(stockSymbol: string) {

    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.AV_API_KEY}`
      )
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid!');
        }
        return res.json();
      })
      .then(parsedRes => {
        if (!parsedRes['Global Quote']['05. price']) {
          throw new Error('Invalid Symbol!');
        }
        this.error = null;
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => {
        this.error = err.message;
      });

  }

    render() {
    let dataContent = <strong>Please enter a symbol!</strong>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <strong>Price: ${this.fetchedPrice}</strong>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id='stock-symbol'
         ref={el => this.stockInput = el}
         value={this.stockUserInput}
         onInput={this.onUserInput.bind(this)}/>
        <button type='submit'
        disabled={!this.stockInputValid}
        >Fetch</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ];
  }
}
