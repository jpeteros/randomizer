import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    items: [],
    random: '',
    previousItem: ''
  }

  handleAdd = this.handleAdd.bind(this);
  randomAll = this.randomAll.bind(this);

  handleAdd() {
    var newItems = this.state.items;
    if(this.refs.input.value) {
      newItems.push(this.refs.input.value);
      this.refs.input.value = '';
      this.setState({ items: newItems });
    }
  };

  shuffle(item){
    this.setState({
      random: this.state.items[item]
    });
  }

  randomAll(e) {
    e.preventDefault();
    if(this.state.items.length > 1){
      let currentItem = '';
      currentItem = this.state.items[Math.floor(Math.random()* this.state.items.length)];

      do {
        currentItem = Math.floor(Math.random() * this.state.items.length);
        if(currentItem !== this.state.previousItem){
            this.shuffle(currentItem);
        }
      } while(currentItem === this.state.previousItem)
      
      this.setState({
        previousItem: currentItem
      });
    }
  };

  handleRemove(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({ items: newItems, random: '' });
  }

  render() {
    const {random} = this.state;
    var items = this.state.items.map((item, i) => (
      <div key={i} onClick={() => this.handleRemove(i)}>
        <button className="btn-remove"> <i className="fa fa-trash"></i> </button> {item} 
      </div>
    ));
    return (
      <div className="container">
        <h2>Simple Randomizer App</h2>
        <input ref="input" placeholder="Enter items.." onFocus={()=>this.refs.input.select()} />
        <button onClick={this.handleAdd}>Add Item</button> <br/><br/>
        {items} 

        <div className="m-y">
          <button className="btn btn-random" onClick={this.randomAll || ''}>Randomize
          </button>
        </div>
        <div className="name">
          <div>
            <span className="random">{random}</span>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
