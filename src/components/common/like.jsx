import React, { Component } from 'react';


// Interface of the component:
// Input: User click, type boolean
// Output: raise an onClick() event to have the resposible parent handle the resquest, alter the icon and change the database
// The component itseft does not deal with movies at all, is a simple like component. It just renders an empty or full heart

const Like = (props) => {
    let classes = "fa fa-heart"
    if(!props.liked)
        classes+='-o'
    return (
        <i onClick={props.onClick} style={{cursor:'pointer'}}className={classes} aria-hidden="true"></i> //*3*/
    );
}

 
export default Like;