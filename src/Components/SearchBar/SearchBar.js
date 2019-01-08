import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    search = () => {
        this.props.onSearch(this.state.term)
    }

    handleTermChange = (e) => {
        this.setState({
            term: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.search()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="SearchBar">
                    <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                    <button type="submit" >SEARCH</button>
                </div>
            </form>
        );
    }

}

export default SearchBar;

//http://kokopelli84-jammmin.surge.sh/