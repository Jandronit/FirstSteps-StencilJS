import { Component, State, h, Element } from '@stencil/core';

@Component({
  tag: 'my-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})

export class StockPrice {


  @Element() el: HTMLElement;

  @State() fetchedPrice: number;

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.AV_API_KEY}`
      )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => {
        console.log(err);
      });

    }


  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id='stock-symbol'/>
        <button type='submit'>Fetch</button>
      </form>,
      <div>
        <strong>Price: ${this.fetchedPrice ? this.fetchedPrice : 'Fetching...'}</strong>
      </div>
    ];
  }
}
