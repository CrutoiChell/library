import { createSlice } from "@reduxjs/toolkit";

let profileStore = JSON.parse(localStorage.getItem('profiles')) || [];
let isAuth = JSON.parse(localStorage.getItem('isAuth')) || false;
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

let profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profiles: profileStore,
        isAuth: isAuth,
        loggedInUser: loggedInUser
    },
    reducers: {
        registration: (state, action) => {
            let checkUser = state.profiles.find(item => {
                return item.email == action.payload.email & item.nickname == action.payload.nickname
            })

            if (!checkUser) {
                state.profiles.push(action.payload)
                state.isAuth = true;
                state.loggedInUser = action.payload
                localStorage.setItem('profiles', JSON.stringify(state.profiles))
                localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
                localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
            } else {
                console.warn('уже есть подобный пользователь');
            }

        },
        logining: (state, action) => {
            let findUser = state.profiles.find(item => {
                return item.email === action.payload.email && item.password === action.payload.password
            })

            if (findUser) {
                console.log('Успешный вход:', findUser);
                state.isAuth = true;
                state.loggedInUser = findUser;
                localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
                localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
            } else {
                console.warn('Не удалось войти: неверная почта или пароль');
                return state;
            }
        },
        logout: (state, action) => {
            state.isAuth = false
            localStorage.setItem('isAuth', JSON.stringify(state.isAuth));
            localStorage.removeItem('loggedInUser')
        },
        addBook: (state, action) => {
            let book = action.payload;
        
            let findUser = state.profiles.find(item => 
                item.email === loggedInUser.email && item.password === loggedInUser.password
            );
            
            if (findUser) {
                if (!findUser.books) findUser.books = [];
                
                let isBookAlreadyAdded = findUser.books.some(existingBook => existingBook.title === book.title);
                
                if (!isBookAlreadyAdded) {
                    findUser.books.push(book);
                    localStorage.setItem('profiles', JSON.stringify(state.profiles));
                }
            }
        }
        
    }
})

export default profileSlice.reducer

export let { registration, logining, logout, addBook } = profileSlice.actions