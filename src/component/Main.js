import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase/config'
import { Posts } from '../context/postsContext'

const Main = () => {

    const {state, dispatch} = React.useContext(Posts)
    const getPosts = async() => {
        const postsArray = await firebase.getPosts().catch(err => {
            console.log(err);
            return err
        })

        return dispatch({
            type: "FETCH_POSTS",
            payload: postsArray
        })
    }

    useEffect(() =>{
        getPosts()
    }, [])


    return (
        <React.Fragment>
            <header>
                <div>
                    <h1>React</h1>
                </div>
            </header>
            <div className="posts">
                {state.posts.map(post => {
                    return (
                        <div className="post" key={post.id}>
                            <Link to={"post/"+ post.id}>
                                <div style={{backgroundImage: "url(" + post.data.cover + ")" }} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default Main