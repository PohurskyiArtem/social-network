import { connect } from 'react-redux';
import { addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

let mapStateToProps = state => {
    return {
        avatar: state.profilePage.profile.photos.large
    }
}

export default connect(mapStateToProps, { addPost })(MyPosts);