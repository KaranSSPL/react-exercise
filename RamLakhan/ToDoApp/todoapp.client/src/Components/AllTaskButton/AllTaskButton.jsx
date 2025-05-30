import { Link } from "react-router-dom";
import { CircleCheckBig } from 'lucide-react';

const AllTaskButton = () => {

    return (
        <>
            <CircleCheckBig />
            <Link className={`btn nav-link`} to="/">
                All tasks
            </Link>
        </>
    )
}

export default AllTaskButton;