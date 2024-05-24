import './card.scss'

interface CardProps extends React.PropsWithChildren {
    
}

const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="card" >
            {children}
        </div>
    )
}

export default Card