import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Nav from '../Nav/nav';
import AddFriend from '../AddFriend/addFriend';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {updateProfile} from '../../Ducks/reducer';
import _ from 'lodash';

class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            friend: [],
            sortBy: '',
            anything: [],
            loggedinUserId: 0
        }
        this.handleSortBy = this.handleSortBy.bind(this)
    }

    checkUser() {
        return axios ({
            url: '/api/checkUser',
            method: 'get'
        })
        .then(res => {
            var id = res.data[0].id;
            this.setState({
                loggedinUserId: res.data[0].id
            })
            console.log(res.data[0].id)
            if(res.length === 0){
                console.log('no one found')
            }else{
                this.getDataInfo(id)
            }
        })
        .catch((error) => console.log(error))
    }

    getDataInfo(id) {
        console.log('data got', this.props)
        return axios ({
            url: '/api/getinfo/' + id,
            method: 'get'
        })
        .then((response) => 
        {console.log('looking for image', response.data) 
            this.props.updateProfile(response.data[0].first_name, response.data[0].last_name, response.data[0].gender, response.data[0].hair_color, response.data[0].eye_color, response.data[0].hobby, response.data[0].birth_day, response.data[0].birth_month, response.data[0].birth_year, response.data[0].id, response.data[0].myimage)
        })
        .catch((error) => console.log(error))
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
            return <AddFriend key = {data.id} data={data} myId={this.state.loggedinUserId}/>
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
            case 'Gender':
                sortBy = 'gender'
                break;
            case 'Hobby':
                sortBy = 'hobby'
                break;
            case 'Hair-color':
                sortBy = 'hair_color'
                break;
            case 'Eye-color':
                sortBy = 'eye_color'
                break;
            case 'Birthday':
                sortBy = 'birth_day'
                break;

        }
        var friendList = _.orderBy(this.state.anything, [sortBy], ['asc'])
        this.setState({
            sortBy: sortBy,
            friend: friendList.map((data) => {
                return <AddFriend key = {data.id} data={data} myId={this.state.loggedinUserId} />
        })})
    }

    componentDidMount() {
        this.checkUser()
        this.getDataInfo()
        this.getOtherDataInfo()
    }

    render() {
        console.log(this.props)
        console.log('check sort by', this.state)
        return (
            <div className='Dashboard'>
            {/* 54G */}
                <Nav />
                <div className='User-and-info-containers'>
                    <div className='Profile-box'>
                        <div className='Pic-box' style = {{backgroundImage: `url('${this.props.MyImage}')`}}></div>
                        <div className='Name-container'>
                            <div className='First-name'>{this.props.First_Name}</div>
                            <div className='Last-name'>{this.props.Last_Name}</div>
                            <div className='Button-spacer'></div>
                            <Link to='/profile'>
                                <button className='Edit-profile-button'>Edit Profile</button>
                            </Link>
                        </div>
                    </div>
                    <div className='Info-box'>
                        <h4>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</h4>
                    </div>
                </div>
                <div className='Recommended-friends-container'>
                    <div className='Rec-top'>
                        <span className='Rec-friends-text'>Recommended Friends</span>
                        <div className='Sort-side'>
                            <span className='Sort-by-text'>Sorted by</span>
                            <select className='Selector' onChange={this.handleSortBy}>
                                <option value='First-name'>First Name</option>
                                <option value='Last-name'>Last Name</option>
                                <option value='Gender'>Gender</option>
                                <option value='Hobby'>Hobby</option>
                                <option value='Hair-color'>Hair Color</option>
                                <option value='Eye-color'> Eye Color</option>
                                <option value='Birthday'>Birthday</option>
                            </select>
                        </div>
                    </div>
                        <div className='Recommendations'></div>
                    <div className='Add-friend-container'>
                    {this.state.friend}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {updateProfile})(Dashboard);