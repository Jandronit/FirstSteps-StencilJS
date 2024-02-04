import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-tooltip',
  styleUrl: './tooltip.css',
  shadow: true
})

export class Tooltip {

  @State() showText: boolean = false;

  @Prop() text: string;

  onToggle() {
    this.showText = !this.showText;
  }

  render() {
    let tooltip = null;
    if (this.showText) {
      tooltip = <div id="tooltip-text">{this.text}</div>;
    }
    return [
      <slot />,
      <span id="tooltip-icon" onClick={this.onToggle.bind(this)}>?</span>,
      tooltip
    ];
  }
}
