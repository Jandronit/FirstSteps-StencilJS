import { Component, h, } from '@stencil/core';

@Component({
  tag: 'my-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})

export class StockFinder {

  stockNameInput: HTMLInputElement;

  onFindStocks(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${process.env.AV_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id="stock-symbol"
         ref={el => this.stockNameInput = el } />
        <button type="submit">Find</button>
      </form>
    ];
  }
}
