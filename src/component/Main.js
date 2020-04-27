import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase/config'
import { Posts } from '../context/postsContext'
import {Input}from 'reactstrap';

const Main = () => {

    const { state, dispatch } = React.useContext(Posts)
    const getPosts = async () => {
        const postsArray = await firebase.getPosts().catch(err => {
            console.log(err);
            return err
        })

        return dispatch({
            type: "FETCH_POSTS",
            payload: postsArray
        })
    }

    useEffect(() => {
        getPosts()
    }, [])

    


    return (
        <React.Fragment>
            <header>
                <div >
                    <h1>WELCOME TO PHIPHIGUIDE</h1>
                </div>
            </header>
            <div className="search">
            <Input className="formSearch" type="text" placeholder="Search"></Input>
           </div> 
           <div className="posts">
                {state.posts.map(post => {
                    return (
                        <div className="post" key={post.id}>
                            <Link to={"post/" + post.id}>
                                <div style={{ backgroundImage: "url(" + post.data.cover + ")" }} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default Main