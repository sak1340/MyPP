import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import firebase from '../firebase/config';
import { Spinner } from 'reactstrap'

const Create = (props) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [cover, setCover] = useState("")
    const [isBusy, setIsBusy] = useState(false)
    const [routeRedirect, setRedirect] = useState(false)

    const addPost = async (e) => {
        e.preventDefault();
        setIsBusy(true);

        let post = {
            title,
            content,
            cover: cover[0],
            email: ""
        }
        await firebase.createPost(post).then(() => {
            console.log("post create success");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
            setIsBusy(false);
        })
    }
    useEffect(() => {
        firebase.getUserState().then(user => {
            if (!user) {
                props.history.replace("/login")
            }
        })
    })

    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/" />
    }


    let createForm;
    if (isBusy) {
        createForm = (
            <div className="precessing">
                <Spinner color="warning" />
            </div>
        )
    } else {
        createForm = (
            <form onSubmit={addPost}>
                <p>Create</p>

                <label htmlFor="title">POST TITLE</label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="content">POST CONTENT</label>
                <textarea name="content" onChange={(e) => setContent(e.target.value)} ></textarea>

                <label htmlFor="cover" className="cover">COVER</label>
                <input type="file" onChange={(e) => setCover(e.target.files)} />

                <input type="submit" value="create post" />
            </form>
        )
    }
    return (
        <React.Fragment>
            {createForm}
        </React.Fragment>
    )
}

export default withRouter(Create);