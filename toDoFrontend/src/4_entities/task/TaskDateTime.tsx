import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { Status } from '../../5_shared/types';
dayjs.extend(relativeTime);


interface TaskDateTimeProps {
    date_created: string
    time_in_progress?: string
    date_completed?: string
    status: Status
}

const TaskDateTime: React.FC<TaskDateTimeProps> = ({ date_created, date_completed, status }) => {

    const timeInProgress = dayjs(date_created, 'YYYY-MM-DD HH:mm:ss', true).toNow(true)

    const statusId = status?.id

    return (
        <>
            <div>
                Date of creation: {date_created}
            </div>

            {(statusId === 1 || statusId === 2) &&
                <div>Time in progress: {timeInProgress}</div>
            }

            {statusId === 3 && <div>Date of completion: {date_completed}</div>}
        </>
    )
}

export default TaskDateTime