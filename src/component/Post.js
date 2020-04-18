import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../firebase/config'

const Post = (props) => {
    const [timer, setTimer] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [userState, setUserState] = useState(false)
    const [isBusy, setIsBusy] = useState(false)
    const [post, setPost] = useState("")
    const [loading, setLoading] = useState("")

    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const fileRef = useRef(null)

    const [postid, setPostId] = useState("")
    const [routeRedirect, setRedirect] = useState(false)

    const getPost = async (postid) => {
        const _post = await firebase.getPost(postid).catch(err => {
            console.log(err);
            return err
        })
        setPost(_post)
    }
    useEffect(() => {
        setTimer(true)
        setPostId(props.match.params.id)
        getPost(props.match.params.id)

        firebase.getUserState().then(user => {
            if (user) {
                setUserState(user)
            }
        })
        setTimeout(() => setTimer(false), 1000)
    }, [props.match.params.id])

    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/" />
    }

    let currentPosts
    let editButton
    let deleteButton

    const update = (e) => {
        e.preventDefault()
        setIsBusy(true)

        //Create Object
        //Update

        setIsBusy(false)
        setRedirect(true)
    }

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const deleteCurrentPost = () => {
        firebase.deletePost(postid, post.fileref)
            .then(() => {
                setRedirect(true)
            }).catch(err => {
                console.log(err);
            })
    }

    let updateForm
    if (editMode) {
        deleteButton = <button className="delete" onClick={(e) => deleteCurrentPost()}>Delete</button>

        if (isBusy) {
            updateForm = (
                <div className="precessing">
                    <p>ReQuest is ProCessing </p>
                    <div className="loader">Loading...</div>
                </div>
            )
        } else {
            updateForm = (
                <React.Fragment>
                    <form className="editForm" onSubmit={update}>
                        <p>Update the current post</p>

                        <label htmlFor="title">Post Title: </label>
                        <input type="text" name="title" ref={titleRef} defaultValue={post.title} />

                        <label htmlFor="content">Post Content: </label>
                        <textarea name="content" ref={contentRef} defaultValue={post.content} ></textarea>

                        <label htmlFor="cover" className="cover">Cover</label>
                        <input type="file" ref={fileRef} />

                        <input type="submit" value="update post" />
                    </form>

                    {deleteButton}
                </React.Fragment>
            )
        }
    }
    if (timer) {
        currentPosts = (
            <div className="precessing">
                <p>ReQuest is ProCessing </p>
                <div className="loader">Loading...</div>
            </div>
        )
    } else {
        if (userState) {
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}>Edit Post</button>
        }
        currentPosts = (
            <div className="single">
                <img src={post.cover} alt="post cover" />
                <h2>{post.title}</h2>
                <div>{post.content}</div>
                {editButton}
                {updateForm}
            </div>
        )
    }

    return (
        <React.Fragment>
            {currentPosts}
        </React.Fragment>
    )
}

export default Post