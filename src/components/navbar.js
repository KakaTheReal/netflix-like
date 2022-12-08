import { useImperativeHandle } from "react"
import { Link, useMatch , useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <ul>
                <Link to="/LastRelease">Latest Release</Link>
                <Link to="/Popular">Popular</Link>
                <Link to="/TopRated">Top Rated</Link>
                <Link to="/Upcoming">Upcoming</Link>
        </ul>
    </nav>

}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}