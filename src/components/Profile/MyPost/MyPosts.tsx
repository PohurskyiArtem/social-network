import React, { FC } from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import cn from "classnames";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import { useForm } from "react-hook-form";
import { Textarea } from '../../common/formsControls/FormsControls';
import Info from '../../common/Info/Info';
import { connect } from 'react-redux';
import { addNewPost } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/store';
import { PostType, ProfileType } from '../../../redux/types';

type MapStateToPropsType = {
    posts: Array<PostType>
}
type MapDispatchToPropsType = {
    addNewPost: (newPostbody: string, avatar: string) => void
}
type OwnPropsType = {
    profile: ProfileType
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

type FormPropsType = {
    avatar: string
    onSubmit: (newPostbody: string, avatar: string) => void
}

const AddPostForm:FC<FormPropsType> = ({onSubmit, avatar}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();

    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data.newPostbody, avatar);
            reset();
        })} className={styles.form}>
            <Textarea
                register={register}
                name="newPostbody"
                errors={errors}
                required
                maxLength={250}
                placeholder="Enter post text here..." 
                onBlur={() => clearErrors()} 
            />
            <button className={cn(styles.addPostBtn, "submit_btn")}>Add post</button>
        </form>
    )
}

const MyPosts:FC<PropsType> = React.memo(({posts, addNewPost, profile}) => {
    return (
        <section className={styles.myPosts}>
            <Info text={"This is a test component. Current version of API not supporting this functional yet"}/>
            <h3 className={styles.header}>Add new post:</h3>
            <AddPostForm onSubmit={addNewPost} avatar={profile.photos.large || defaultAvatar}/>
            <h4 className={styles.header}>Recent Posts:</h4>
            <ul>
                { posts.map((post: PostType) => <Post postText={post.postText} key={post.id} id={post.id} image={profile.photos.large || defaultAvatar}/>) }
            </ul>
        </section>
    )
})

const mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    posts: state.profilePage.postsData
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, { addNewPost })(MyPosts)