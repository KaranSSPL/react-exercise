import { SquareMenu } from 'lucide-react';
import { useTaskEvents } from '../../Hooks/TaskEvents';

const Header = () => {
    const { hideSidebar, setHideSidebar } = useTaskEvents();
    return (
        <div className="header">
            <div className="row d-flex justify-content-center text-left" >
                <div className="col-1">
                    <SquareMenu className="squaremenu-btn" onClick={() => setHideSidebar(!hideSidebar)} />
                </div>
                <div className="col-11 text-end">
                    <p> RAMLAKHAN'S TO DO APP </p>
                </div>
            </div>
        </div>
    )
}

export default Header;