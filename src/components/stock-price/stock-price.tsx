import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})

export class StockPrice {

  onFetchStockPrice(event: Event) {
    event.preventDefault();

  }
  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id='stock-symbol'/>
        <button type='submit'>Fetch</button>
      </form>,
      <div>
        <strong>Price:{0}</strong>
      </div>
    ];
  }
}
