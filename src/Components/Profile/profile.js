import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import Nav from '../Nav/nav';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateProfile} from '../../Ducks/reducer';
import {updateId} from '../../Ducks/reducer';
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name:  this.props.First_Name,
            last_name:   this.props.Last_Name,
            gender:      this.props.Gender,
            hair_color:  this.props.Hair_Color,
            eye_color:   this.props.Eye_Color,
            hobby:       this.props.Hobby,
            birth_day:   this.props.Birth_Day,
            birth_month: this.props.Birth_Month,
            birth_year:  this.props.Birth_Year,
            ID:          this.props.ID,
            myImage:     this.props.MyImage
        }
        this.createProfile     = this.createProfile.bind(this);
        this.updateUserProfile = this.updateUserProfile.bind(this);
        this.setProfile        = this.setProfile.bind(this);
    }

    revertChanges() {
        this.setState({
            first_name:  this.props.First_Name,
            last_name:   this.props.Last_Name,
            gender:      this.props.Gender,
            hair_color:  this.props.Hair_Color,
            eye_color:   this.props.Eye_Color,
            hobby:       this.props.Hobby,
            birth_day:   this.props.Birth_Day,
            birth_month: this.props.Birth_Month,
            birth_year:  this.props.Birth_Year
        })
    }

    createProfile() {
        axios.post(`/api/create`, {
            first_name:  this.state.first_name,
            last_name:   this.state.last_name,
            gender:      this.state.gender,
            hair_color:  this.state.hair_color,
            eye_color:   this.state.eye_color,
            hobby:       this.state.hobby,
            birth_day:   this.state.birth_day,
            birth_month: this.state.birth_month,
            birth_year:  this.state.birth_year,
            myImage:     `https://robohash.org/${this.state.first_name}%20${this.state.last_name}`
        })
        .then((response) => {
            console.log('data got', response.data.id) 
            return this.props.updateId(response.data)

        })
        .catch((error) => console.log('error', error))
    }

    updateUserProfile() {
        axios.put(`/api/update`, {
            first_name:  this.state.first_name,
            last_name:   this.state.last_name,
            gender:      this.state.gender,
            hair_color:  this.state.hair_color,
            eye_color:   this.state.eye_color,
            hobby:       this.state.hobby,
            birth_day:   this.state.birth_day,
            birth_month: this.state.birth_month,
            birth_year:  this.state.birth_year,
            id:          this.props.ID,
            myImage:     `https://robohash.org/${this.state.first_name}%20${this.state.last_name}`
        })
        .then((response) => {console.log('data got', response.data) 
        })
        .catch((error) => console.log(error))
    }

    setProfile() {
        console.log(this.props.ID)
        console.log(this.state.myImage)
        this.props.updateProfile(this.state.first_name, this.state.last_name, this.state.gender, this.state.hair_color, this.state.eye_color, this.state.hobby, this.state.birth_day, this.state.birth_month, this.state.birth_year, this.state.myImage)
        if(this.props.ID){
            console.log('update')
            return this.updateUserProfile()
        } else {
            console.log('create')
            return this.createProfile()
        }
    }

    setFirstName(value){
        console.log(this.firstName)
        this.setState({
            first_name: value
        })
    }

    setLastName(value){
        this.setState({
            last_name: value
        })
    }

    setGender(value){
        this.setState({
            gender: value
        })
    }

    setHairColor(value){
        this.setState({
            hair_color: value
        })
    }

    setEyeColor(value){
        this.setState({
            eye_color: value
        })
    }

    setHobby(value){
        this.setState({
            hobby: value
        })
    }

    setBirthDay(value){
        this.setState({
            birth_day: value
        })
    }

    setBirthMonth(value){
        this.setState({
            birth_month: value
        })
    }
    setBirthYear(value){
        this.setState({
            birth_year: value
        })
    }

    render() {
        console.log('this one', this.props)
        return (
            <div className='Profile'>
                <Nav />
                <div className='Profile-user'>
                    <div className='Profile-info'>
                        <div className='Profile-pic' style = {{backgroundImage: `url('${this.props.MyImage}')`}}></div>
                        <div className='Name-container'>
                            <span className='First-name'>{this.props.First_Name}</span>
                            <span className='Last-name'>{this.props.Last_Name}</span>
                        </div>
                    </div>
                    <div className='Buttons'>
                        <button className='Update-button' onClick={this.setProfile}>Update
                        </button>
                        <button className='Cancel-button' onClick={() => {this.revertChanges()}}>Cancel</button>
                    </div>
                </div>
                <div className='User-info'>
                    <div className='Left-right-container'>
                        <div className='Left-info'>
                            <span className='Left-user-input'>First Name</span>
                            <input className='User-name-input' 
                                type="text" 
                                onChange={e => this.setFirstName(e.target.value)} 
                                value={this.state.first_name}>
                            </input>
                            <span className='Left-user-input'>Last Name</span>
                            <input className='User-name-input' 
                                type="text" 
                                onChange={e => this.setLastName(e.target.value)} 
                                value={this.state.last_name}>
                            </input>
                            <span className='Left-user-input'>Gender</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setGender(e.target.value)} 
                                value={this.state.gender}>
                                {// 26E}
                                <option value='' selected disabled>--Select--</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <span className='Left-user-input'>Hair Color</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setHairColor(e.target.value)} 
                                value={this.state.hair_color}>
                                <option value='' selected disabled>--Select--</option>
                                <option value='Brown'>Brown</option>
                                <option value='Blue'>Blue</option>
                                <option value='Green'>Green</option>
                                <option value='Red'>Red</option>
                                <option value='Blonde'>Blonde</option>
                                <option value='White'>White</option>
                            </select>
                            <span className='Left-user-input'>Eye Color</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setEyeColor(e.target.value)} 
                                value={this.state.eye_color}>
                                <option value='' selected disabled>--Select--</option>
                                <option value='Blue'>Blue</option>
                                <option value='Green'>Green</option>
                                <option value='Brown'>Brown</option>
                            </select>
                        </div>
                        <div className='Right-info'>
                            <span className='Right-user-input'>Hobby</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setHobby(e.target.value)} 
                                value={this.state.hobby}>
                                <option value='' selected disabled>--Select--</option>
                                <option value='Video-games'>Video Games</option>
                                <option value='Hiking'>Hiking</option>
                                <option value='Fishing'>Fishing</option>
                                <option value='Rafting'>Rafting</option>
                            </select>
                            <span className='Right-user-input'>Birthday Day</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setBirthDay(e.target.value)} 
                                value={this.state.birth_day}>
                                {

                                }
                                <option value='' selected disabled>--Select--</option>
                                <option value='01'>01</option>
                                <option value='02'>02</option>
                                <option value='03'>03</option>
                                <option value='04'>04</option>
                                <option value='05'>05</option>
                                <option value='06'>06</option>
                                <option value='07'>07</option>
                                <option value='08'>08</option>
                                <option value='09'>09</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='22'>22</option>
                                <option value='23'>23</option>
                                <option value='24'>24</option>
                                <option value='25'>25</option>
                                <option value='26'>26</option>
                                <option value='27'>27</option>
                                <option value='28'>28</option>
                                <option value='29'>29</option>
                                <option value='30'>30</option>
                                <option value='31'>31</option>
                            </select>
                            <span className='Right-user-input'>Birthday Month</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setBirthMonth(e.target.value)} 
                                value={this.state.birth_month}>
                                <option value='' selected disabled>--Select--</option>
                                <option value='Janurary'>Janurary</option>
                                <option value='February'>February</option>
                                <option value='March'>March</option>
                                <option value='April'>April</option>
                                <option value='May'>May</option>
                                <option value='June'>June</option>
                                <option value='July'>July</option>
                                <option value='August'>August</option>
                                <option value='September'>September</option>
                                <option value='October'>October</option>
                                <option value='November'>November</option>
                                <option value='December'>December</option>
                            </select>
                            <span className='Right-user-input'>Birthday Year</span>
                            <select className='Select-style'                                type="text" 
                                onChange={e => this.setBirthYear(e.target.value)} 
                                value={this.state.birth_year}>
                                <option value='' selected disabled>--Select--</option>
                                <option value='2017'>2017</option>
                                <option value='2016'>2016</option>
                                <option value='2015'>2015</option>
                                <option value='2014'>2014</option>
                                <option value='2013'>2013</option>
                                <option value='2012'>2012</option>
                                <option value='2011'>2011</option>
                                <option value='2010'>2010</option>
                                <option value='2009'>2009</option>
                                <option value='2008'>2008</option>
                                <option value='2007'>2007</option>
                                <option value='2006'>2006</option>
                                <option value='2005'>2005</option>
                                <option value='2004'>2004</option>
                                <option value='2003'>2003</option>
                                <option value='2002'>2002</option>
                                <option value='2001'>2001</option>
                                <option value='2000'>2000</option>
                                <option value='1999'>1999</option>
                                <option value='1998'>1998</option>
                                <option value='1997'>1997</option>
                                <option value='1996'>1996</option>
                                <option value='1995'>1995</option>
                                <option value='1994'>1994</option>
                                <option value='1993'>1993</option>
                                <option value='1992'>1992</option>
                                <option value='1991'>1991</option>
                                <option value='1990'>1990</option>
                            </select>
                            <div className='Makin-space'></div>
                        </div>
                    </div>
                    {/* <span className='Error-message'>Required fields: Birthday day, month, and year.</span> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.MyImage)
    return {
        ID: state.ID,
        First_Name: state.First_Name,
        Last_Name: state.Last_Name,
        Gender: state.Gender,
        Hair_Color: state.Hair_Color,
        Eye_Color: state.Eye_Color,
        Hobby: state.Hobby,
        Birth_Day: state.Birth_Day,
        Birth_Month: state.Birth_Month,
        Birth_Year: state.Birth_Year,
        MyImage: state.MyImage
    }
}

export default connect(mapStateToProps, {updateProfile, updateId})(Profile);