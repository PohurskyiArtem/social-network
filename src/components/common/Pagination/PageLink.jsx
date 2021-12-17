import styles from "./Pagination.module.scss";
import cn from "classnames";

const PageLink = props => {
    let {pageNumber, onPageChanged, currentPage} = props;
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