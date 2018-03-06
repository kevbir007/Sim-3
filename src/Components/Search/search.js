import React from 'react';
import { Link } from 'react-router-dom';
import './search.css';
import Nav from '../Nav/nav';
import axios from 'axios';
import AddFriend from '../AddFriend/addFriend';
import _ from 'lodash';

export default class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            friend: [],
            sortBy: 'first_name',
            anything: [],
            name: ''
        }
        this.handleSortBy      = this.handleSortBy.bind(this);
        this.searchFirstName   = this.searchFirstName.bind(this);
        this.searchLastName    = this.searchLastName.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.resetButton       = this.resetButton.bind(this);
    }

    getOtherDataInfo() {
        console.log('other data got', this.props)
        return axios ({
            url: '/api/getOtherInfo',
            method: 'get'
        })
        .then((response) => 
        {console.log('looking for other image', response.data) 
        var friendList = _.orderBy(response.data, [this.state.sortBy], ['asc'])
        console.log("this is the friend list", friendList)
        this.setState({
            anything: friendList,
            friend: friendList.map((data) => {
            return <AddFriend key = {data.id} data={data} />
        })})
        })
        .catch((error) => console.log(error))
    }

    handleSortBy(event) {
        var sortBy;
        switch(event.target.value){
            case 'First-name':
                sortBy = 'first_name'
                break;
            case 'Last-name':
                sortBy = 'last_name'
                break;
        }
        var friendList = _.orderBy(this.state.anything, [sortBy], ['asc'])
        this.setState({
            sortBy: sortBy,
            friend: friendList.map((data) => {
                return <AddFriend key = {data.id} data={data} />
        })})
    }

    searchFirstName() {
        return axios ({
            url: '/api/searchFirstName/' + this.state.name,
            method: 'get'
        })
        .then((response) => {console.log('firstname', response.data) 
        this.setState({
            friend: response.data.map((data) => {
                return <AddFriend key = {data.id} data={data} />
        })})
        })
        .catch((error) => console.log(error))
    }

    searchLastName() {
        return axios ({
            url: '/api/searchLastName/' + this.state.name,
            method: 'get'
        })
        .then((response) => {console.log('lastname', response.data) 
        this.setState({
            friend: response.data.map((data) => {
                return <AddFriend key = {data.id} data={data} />
        })})
        })
        .catch((error) => console.log(error))
    }

    handleSearchClick() {
        if(this.state.name === ''){
            this.getOtherDataInfo()
        }else if(this.state.name !== '' && this.state.sortBy === 'first_name' ){
            this.searchFirstName()
        }else if(this.state.name !== '' && this.state.sortBy === 'last_name' ){
        this.searchLastName()
        }
    }

    resetButton() {
        this.setState({
            name: ''
        })
        this.getOtherDataInfo()
    }

    searchName(value){
        this.setState({
            name: value
        })
    }

    componentDidMount() {
        this.getOtherDataInfo()
    }
    
    render() {
        return (
            <div className='Search'>
                <Nav />
                <div className='Searchbar-container'>
                    <select className='Select-page-style' onChange={this.handleSortBy}>
                        <option value='First-name'>First Name</option>
                        <option value='Last-name'>Last Name</option>
                    </select>
                    <input className='Search-input'
                        type="text" 
                        onChange={e => this.searchName(e.target.value)} 
                        value={this.state.name}>
                    </input>
                    <button className='Search-name-button' onClick={this.handleSearchClick}>Search</button>
                    <button className='Reset-button' onClick={this.resetButton}>Reset</button>
                </div>
                <div className='Recommendation-container'>
                {this.state.friend}
                    <div className='Page-number-container'>
                        <div className='Page-number-black'>Page 1</div>
                        <div className='Page-number-white'>2</div>
                    </div>
                </div>
            </div>
        )
    }
}