import { Suspense } from "react"
import Loader from "../components/common/Loader/Loader"

export const WithSuspense = Component => {
    return props => (
        <Suspense fallback={<Loader/>}>
            <Component {...props}/>
        </Suspense>
    )
}