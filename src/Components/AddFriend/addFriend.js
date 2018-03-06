import React from 'react';
import './addFriend.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateProfile} from '../../Ducks/reducer';

class AddFriend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFriend: this.props.friend
        }

        this.addFriend = this.addFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
    }

    // showFriend() {
    //     this.state.isFriend
    // }

    addFriend() {
        axios.post(`/api/addFriend`, {
            friendId: this.props.data.id, 
            userId: this.props.myId
        })
        .then((response) => {
            console.log('friends added')
            this.setState({
                isFriend: true
            })
        })
        .catch((error) => console.log('error', error))
    }

    removeFriend() {
        axios.delete('/api/removeFriend/' + this.props.data.id + '/' + this.props.myId)
        .then((response) => {
            this.setState({
                isFriend: false
            })
            return response
        })
    }

    componentDidMount() {
        // this.showFriend()
    }

    render() {
        console.log('Muh data', this.props.data.id, this.props.myId)
        return (
            <div className='Add-friend'>
                <div className='Add-friend-pic' style = {{backgroundImage: `url('${this.props.data.myimage}')`}}></div>
                <div className='Add-name-placeholder'>
                    <span>{this.props.data.first_name}</span>
                    <span>{this.props.data.last_name}</span>
                </div>
                {
                    this.state.isFriend === true
                    ?
                    <button className='Remove-friend-button' onClick={this.removeFriend}>Remove Friend</button>
                    :
                    <button className='Add-friend-button' onClick={this.addFriend}>Add Friend</button>
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {updateProfile})(AddFriend);