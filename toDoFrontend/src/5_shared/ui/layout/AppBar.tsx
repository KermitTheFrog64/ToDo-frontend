import LogOutButton from "../../../2_widgets/authorization/LogOutButton"
import { getUser } from "../../../2_widgets/authorization/auth-slice"
import { useAppSelector } from "../../hooks/redux"
import './app-bar.scss'
import Menu from "../menu/Menu"
import { Link } from "react-router-dom"
import Card from "../card/Card"

const AppBar: React.FC = () => {

    const user = useAppSelector(getUser)

    return (
        <header>
            <div>
                <Menu activator={<b>{user?.name}</b>} >
                    <Card>
                        <Link to='/' >
                            My projects
                        </Link>
                    </Card>
                </Menu>
            </div>
            <div><LogOutButton /></div>
        </header>
    )
}

export default AppBar