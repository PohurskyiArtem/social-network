import React from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import cn from "classnames";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import { useForm } from "react-hook-form";
import { Textarea } from '../../common/formsControls/FormsControls';
import Info from '../../common/Info/Info';
import { connect } from 'react-redux';
import { addPost } from '../../../redux/profile-reducer';
import { maxLenghtCreator } from '../../../utils/validators';

const AddPostForm = ({onSubmit}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();

    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data);
            reset();
        })} className={styles.form}>
            <Textarea
                register={register}
                label="newPostbody"
                errors={errors}
                required
                maxLength={maxLenghtCreator(250)}
                placeholder="Enter post text here..." 
                onBlur={() => clearErrors()} 
            />
            <button className={cn(styles.addPostBtn, "submit_btn")}>Add post</button>
        </form>
    )
}

const MyPosts = React.memo(({posts, addPost, profile}) => {
    let avatar = profile.photos.large || defaultAvatar;

    const addNewPost = (values) => {
        addPost(avatar, values.newPostbody);
    }
    console.log(posts)

    return (
        <section className={styles.myPosts}>
            <Info text={"This is a test component. Current version of API not supporting this functional yet"}/>
            <h3 className={styles.header}>Add new post:</h3>
            <AddPostForm onSubmit={addNewPost}/>
            <h4 className={styles.header}>Recent Posts:</h4>
            <ul>
                { posts.map(post => <Post message={post.postText} key={post.id} imgUrl={avatar}/>) }
            </ul>
        </section>
    )
})

let mapStateToProps = state => {
    return {
        posts: state.profilePage.postsData
    }
}

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts)

export default MyPostsContainer;