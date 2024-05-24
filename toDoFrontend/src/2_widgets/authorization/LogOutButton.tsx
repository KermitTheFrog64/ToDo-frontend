import { useAppDispatch } from "../../5_shared/hooks/redux"
import { logOut } from "./auth-slice"
import './../../5_shared/ui/buttons/buttons.scss'

const LogOutButton: React.FC = () => {

    const dispatch = useAppDispatch()

    return (
        <span className="material-symbols-outlined" onClick={() => dispatch(logOut())} >
            logout
        </span >
    )
}

export default LogOutButton