import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


let list = [
    {
        quote: "Hello",
        author: "Allan"
    },
    {
        quote: '"Inspiration"',
        author: "Flight"
    },
    {
        quote: "I want Iguodala",
        author: "White man"
    },
    {
        quote: "There is a proportionally higher suicide rate with midgets",
        author: "Raymond"
    }
]

/*
let list = [{
    quote: "",
    author: ""
}];*/

const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

export const getListItems = createAsyncThunk('quote/getListItems', async () => {
    const response = fetch(url).then(resp => resp.json()).catch(err => console.log(err));
    return response;
})

const initialState = function(){
    let index = Math.floor(Math.random() * list.length);
    return({
      quote: "",
      author: "",
      isLoading: false
    })
}

const quoteSlice = createSlice({
    name: "newQuote",
    initialState,
    reducers: {
        getQuote: (state) => {
            let index;
            do {
                index = Math.floor(Math.random() * list.length);
            } while(state.quote === list[index].quote);
            
            return{
                quote: list[index].quote,
                author: list[index].author
            }
            
        }
    },
    extraReducers: {
        [getListItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getListItems.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            list = action.payload.quotes;
            
        },
        [getListItems.rejected]: (state) => {
            state.isLoading = false;
        }
    }

    
})

export const {getQuote} = quoteSlice.actions;
export const quoteReducer = quoteSlice.reducer;