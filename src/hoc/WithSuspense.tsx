import { ComponentType, Suspense } from "react"
import Loader from "../components/common/Loader/Loader"

export function WithSuspense <WCP> (Component: ComponentType<WCP>) {
    return (props: WCP) => (
        <Suspense fallback={<Loader/>}>
            <Component {...props}/>
        </Suspense>
    )
}