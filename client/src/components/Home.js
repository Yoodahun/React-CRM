import React from 'react';
import './Home.css';
// import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

// const style = (theme) => ({
//     home : {
//         background: 'linear-gradient(to right bottom, #430089, #82ffa1)'
//
//     },
//     menu: {
//         marginTop: 15,
//         marginBottom: 15,
//         display: 'flex',
//         justifyContent: 'center' //가운데 정렬
//     },
// });



class Home extends React.Component {

    render() {

        return (
            <div className='wrapper home'>
                <div className='box'>
                    <h1><Link className='menu' to={'/app'}>React and NodeJS <br/>Practice</Link></h1>
                </div>
            </div>

        )
    }
}

export default Home;