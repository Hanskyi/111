import React from 'react';
import AppToolbar from "../../components/UI/AppToolbar/AppToolbar";
import {Slide} from "react-awesome-reveal";
import NewPostForm from "../../components/NewPostForm";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../User/userSlice";

const NewPosts = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <AppToolbar/>
            <div className="main">
                {user ?
                    <Slide>
                        <h1 className='titles'>Add new post!</h1>
                        <div className="hr"></div>
                        <NewPostForm/>
                    </Slide>
                    :
                    null
                }
            </div>
        </>
    );
};

export default NewPosts;