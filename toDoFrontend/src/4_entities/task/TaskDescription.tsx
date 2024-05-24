import { useEffect } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useDebounceValue } from "usehooks-ts"
import { useMutation } from "@tanstack/react-query"
import { updateTaskRequest } from "../../5_shared/api/taskAPI"
import useSkipFirstEffect from "../../5_shared/hooks/use-skip-first-use-effect"

interface TaskDescriptionProps {
    description?: string
    id: number
}

const TaskDescription: React.FC<TaskDescriptionProps> = (props) => {

    const [debounceName, setName] = useDebounceValue(props?.description || '', 1000)

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }], // Основные инструменты форматирования текста
            ['bold', 'italic', 'underline', 'strike'],
            ['clean'], // Очистка форматирования текста
            [{ 'font': [] }], // Выбор шрифта
            [{ 'size': ['small', false, 'large', 'huge'] }], // Выбор размера шрифта
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Вставка упорядоченных и неупорядоченных списков
            ['link'] // Вставка и редактирование ссылок
        ]
    }

    const formats = [
        'bold', 'italic', 'underline', 'strike', // Основные стили текста
        'font', 'size', // Шрифт и размер текста
        'list', 'bullet', // Списки
        'link', // Ссылки
    ]

    const { mutate } = useMutation({
        mutationFn: () => updateTaskRequest(props.id, { description: debounceName })
    })

    useSkipFirstEffect(
        () => {
            mutate()
        },
        [debounceName])

    const handleChange = (description: string) => {
        setName(description)

    }

    return (
        <ReactQuill
            theme="snow"
            defaultValue={props.description}
            onChange={handleChange}
            modules={modules}
            formats={formats}
        />
    )
}

export default TaskDescription