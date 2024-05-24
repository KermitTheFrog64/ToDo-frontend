import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../5_shared/hooks/redux"
import { deleteProject, fetchProjects, getProjects } from "./projects-slice"
import { useNavigate } from "react-router-dom"
import { AddButton } from "../../5_shared/ui/buttons"
import { AddProjectModal } from "."
import { Project } from "../../5_shared/types"
import DeleteButton from "../../5_shared/ui/buttons/DeleteButton"
import { getUser } from "../authorization/auth-slice"
import { Error } from "../../5_shared/ui/error"

const Projects: React.FC = () => {

    const dispatch = useAppDispatch()

    const user = useAppSelector(getUser)

    useEffect(() => {
        user && dispatch(fetchProjects())
    }, [user])

    const projects = useAppSelector(getProjects)  
 
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleAddProjectClick = () => {
        setIsModalOpen(true)
    }

    if (!Array.isArray(projects)) {
        return (
            <Error name="Projects are unavailable" />
        )
    }

    const handleDeleteClick = (event: React.MouseEvent, id: number) => {
        event.stopPropagation()
        dispatch(deleteProject(id))
      }

    return (
        <div>
            {
                projects.map((p: Project) =>
                    <div
                        key={p.id}
                        onClick={() => navigate(`/projects/${p.id}`)}
                    >
                        {p.name}
                        <DeleteButton kind='projects' onClick={(event) => handleDeleteClick(event, p.id)  }/>
                    </div>)
            }

            <AddButton handleClick={handleAddProjectClick} />

            {isModalOpen && user && <AddProjectModal setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}



export default Projects