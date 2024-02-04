import { Component, State, h, Event, EventEmitter} from '@stencil/core';

@Component({
  tag: 'my-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})

export class StockFinder {

  stockNameInput: HTMLInputElement;

  @State() searchResults: {name: string, symbol: string}[] = [];

  @Event({ bubbles: true, composed: true }) mySymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${process.env.AV_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      this.searchResults = data['bestMatches'].map(match => {
        return { name: match['2. name'], symbol: match['1. symbol'] };
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  onSelectSymbol(symbol: string) {
    this.mySymbolSelected.emit(symbol);
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id="stock-symbol"
         ref={el => this.stockNameInput = el } />
        <button type="submit">Find</button>
      </form>,
      <ul>
        {this.searchResults.map(result => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>
        ))}
      </ul>
    ];
  }
}
