import styles from "./Pagination.module.scss";
import cn from "classnames";
import { FC } from "react";

type PropsType = {
    pageNumber: number,
    onPageChanged: (pageNumber: number) => void,
    currentPage: number
}

const PageLink: FC<PropsType> = ({pageNumber, onPageChanged, currentPage}) => {
    let currentBoolean = currentPage === pageNumber ? true : false;

    return (
        <button 
            className={cn({
                [styles.pagination_btn]: true,
                [styles.selectedPage]: currentBoolean
            })} 
            onClick={() => onPageChanged(pageNumber)}
            disabled={currentBoolean}
        >
            {pageNumber}
        </button>
               
    )
}

export default PageLink;