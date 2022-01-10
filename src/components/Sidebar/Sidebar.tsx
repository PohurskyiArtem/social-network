import { FC } from 'react';
import styles from './Sidebar.module.scss';
import Navbar from "./Navbar/Navbar";
import Friendsbar from "./Friendsbar/Friendsbar";
import { connect } from 'react-redux';
import cn from "classnames";
import { FriendType } from '../../redux/types';
import { AppStateType } from '../../redux/store';

type PropsType = {
    friendsList: Array<FriendType>
    isOpen: boolean
}

const Sidebar:FC<PropsType> = ({friendsList, isOpen}) => {
    return (
       <aside className={cn({[styles.sidebar]: true, [styles.active]: isOpen})}>
           <div className={styles.contentWrapper}>
            <Navbar />
            <Friendsbar friendsList={friendsList}/>
           </div>
       </aside>
    )
}

const mapStateToProps = (state:AppStateType) => ({
    friendsList: state.sidebar.friendsList,
    isOpen: state.sidebar.isSidebarOpen
})

export default connect(mapStateToProps, {})(Sidebar);