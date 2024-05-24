import React from "react"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import { updateTaskHeader } from "../../2_widgets/project/project-slice"
import { useMutation } from "@tanstack/react-query"
import { updateTaskRequest } from "../../5_shared/api/taskAPI"
import { useDebounceValue } from "usehooks-ts"
import useSkipFirstEffect from "../../5_shared/hooks/use-skip-first-use-effect"

interface TaskHeaderProps {
    name: string
    id: number
}

const TaskHeader: React.FC<TaskHeaderProps> = (props) => {

    const dispatch = useAppDispatch()

    const [debounceName, setName] = useDebounceValue(props.name, 1000)

    const {mutate} = useMutation({
        mutationFn: () => updateTaskRequest(props.id, {name: debounceName}),
        onSuccess: () => {
            dispatch(updateTaskHeader({id: props.id, name: debounceName}))
        }
    })

    useSkipFirstEffect(() => {
        mutate()
    }, [debounceName])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setName(name)
    }

    return (
        <input
            type="text"
            placeholder="Header"
            defaultValue={props.name}
            onChange={handleInputChange}
            required
        />
    )
}

export default TaskHeader