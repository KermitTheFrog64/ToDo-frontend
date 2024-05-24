import React from "react"
import { Project } from "../2_widgets/project"
import { AppBar } from "../5_shared/ui/layout"


const ProjectPage: React.FC = () => {
    return (
        <>
            <AppBar />
            <Project />
        </>
    )
}

export default ProjectPage