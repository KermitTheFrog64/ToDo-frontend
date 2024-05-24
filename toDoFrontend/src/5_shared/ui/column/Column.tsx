import { ReactNode } from "react"
import './Column.scss'

interface ColumnProps {
    children: ReactNode
}



const Column: React.FC<ColumnProps> = ({ children }) => {
    return (
        <div className="column">
            {children}
        </div>
    )
}

export default Column