import React,{Component} from 'react';

class Product extends Component {
    state = { 
        name: "Burger",
        count: 3,
        imgUrl: "logo192.png"
     } 
     IncrementHandler = () => {
        this.setState({count: this.state.count + 1});
     }
    render() { 
        return (<div>
            <img src={this.state.imgUrl} alt=''/>
            <span>{this.state.name}</span>
            <span> {this.state.count} </span>
            <button
            onClick={this.IncrementHandler} 
            className="btn btn-primary">+</button>


        </div>);
    }
}
 
export default Product;
