import * as ActionTypes from './ActionTypes'
export const blog=(state= {
    blogs:[]
},action)=>{
    switch(action.type){
        //Add blog to new array
        case ActionTypes.ADD_BLOGS:
            return {
                ...state,
                blogs:action.payload
            }
        //Appending new blog to existing array
        case ActionTypes.ADD_BLOG:
            var msg=action.payload
            return {
                ...state,
                blogs:state.blogs.concat(msg)
            }
        default:
            return state;
    }
};