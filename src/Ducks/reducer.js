import axios from 'axios';

const initialState = {
    ID:          '',
    First_Name:  '',
    Last_Name:   '',
    Gender:      '',
    Hair_Color:  '',
    Eye_Color:   '',
    Hobby:       '',
    Birth_Day:   '',
    Birth_Month: '',
    Birth_Year:  '',
    MyImage:     '',
    Auth_Id:     ''
}

const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_ID      = "UPDATE_ID";

function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_PROFILE:
        console.log(action.payload.myImage)
            return Object.assign({}, state, {
                First_Name: action.payload.first_name,
                Last_Name: action.payload.last_name, 
                Gender: action.payload.gender, 
                Hair_Color: action.payload.hair_color, 
                Eye_Color: action.payload.eye_color, 
                Hobby: action.payload.hobby, 
                Birth_Day: action.payload.birth_day, 
                Birth_Month: action.payload.birth_month, 
                Birth_Year: action.payload.birth_year,
                ID: action.payload.id,
                MyImage: action.payload.myImage
            });

        case UPDATE_ID:
        console.log(action)
        console.log(action.payload.id)
            return Object.assign({}, state, {
                ID: action.payload.id
            });

        default: return state;
    }
}

export function updateProfile( first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year, id, myImage) {
    return {
        type: UPDATE_PROFILE,
        payload: { first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year, id, myImage }
    }
}

export function updateId(data) {
    console.log('reducer', data)
    let id = data.id
    console.log(id)
    return {
        type: UPDATE_ID,
        payload: {id} 
    }
}

export default reducer