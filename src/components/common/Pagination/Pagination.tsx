import styles from "./Pagination.module.scss";
import PageLink from "./PageLink";
import UserInput from "./UserInput";
import cn from "classnames";
import { FC, Fragment } from "react";

type PropsType = {
    currentPage: number, 
    pagesNumbers: Array<number>, 
    onPageChanged: (pageNumber: number) => void
}

const Pagination: FC<PropsType> = ({ currentPage, pagesNumbers, onPageChanged }) => {
    return (
        <div className={styles.paginationContainer}>
            <div className={styles.pagination}>
                {/* previous page button */}
                <button
                    className={cn(styles.pagination_btn, styles.step_btn)} 
                    onClick={() => onPageChanged( currentPage - 1 )} 
                    disabled={ currentPage === 1 } 
                >
                Prev
                </button>

                {
                    pagesNumbers.map( p => {
                        let ifPageFirst = p === 1;
                        let ifPageLast = p === pagesNumbers[pagesNumbers.length - 1];

                        if( ifPageFirst ) { //check page first or last
                            return (

                            <Fragment key={p.toString()}>
                                <PageLink 
                                pageNumber={p} 
                                onPageChanged={onPageChanged} 
                                currentPage={currentPage}
                                />
                                {currentPage >= (p + 4) ? <DotsBetweenPags/> : null}
                            </Fragment>

                            )
                        } else if (ifPageLast) {
                            return (

                                <Fragment key={p.toString()}>
                                    {currentPage <= (p - 4) ? <DotsBetweenPags/> : null}
                                    <PageLink 
                                    pageNumber={p} 
                                    onPageChanged={onPageChanged} 
                                    currentPage={currentPage}
                                    />
                                </Fragment>
        
                            )

                        } else if( ( ( p >= (currentPage - 2) ) && ( p <= (currentPage + 2) ) ) ) { //page in range "currentPage +- 2"
                            return (
                                <Fragment key={p.toString()}>
                                    <PageLink 
                                        pageNumber={p} 
                                        onPageChanged={onPageChanged} 
                                        currentPage={currentPage}
                                    />
                                </Fragment>
                            )
                        }

                        return null;
                    })
                }

                {/* next page button */}
                <button
                    className={cn(styles.pagination_btn, styles.step_btn)}  
                    onClick={() => onPageChanged( currentPage + 1 )}
                    disabled={ currentPage === pagesNumbers[pagesNumbers.length - 1] } 
                >
                Next
                </button>
            </div>
            <UserInput goToPage={onPageChanged} lastPageNumber={pagesNumbers[pagesNumbers.length - 1]}/>
        </div>
    )
}

const DotsBetweenPags = () => <span className={styles.dotsWithinPags}>...</span>

export default Pagination;