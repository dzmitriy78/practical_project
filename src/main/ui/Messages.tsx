import React, {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';

const MessagesDemo: React.FC<MessagesPropsType> = ({message, errorMessage}) => {
    const mes: React.MutableRefObject<any> = useRef(null);

    useEffect(() => {
        if (errorMessage)
            mes.current.show(
                {life: 4000, severity: 'error', summary: 'Error: ', detail: `${errorMessage}`})
        else
            mes.current?.show(
                {life: 4000, severity: 'success', summary: 'Success: ', detail: `${message}`})
    }, [])

    return (
        <div>
            <div className="card">
                <Messages ref={mes}/>
            </div>
        </div>
    )
}

export default MessagesDemo

type MessagesPropsType = {
    message?: string
    errorMessage?: string
}