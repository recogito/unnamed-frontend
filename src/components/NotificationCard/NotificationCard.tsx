import './NotificationCard.css';

export interface NotificationCardProps {
    invitedBy: string,
    projectName: string,
    inviteId: string,
    ignored: boolean,
    onAccept(): void,
    onIgnore(): void,
    onUnignore(): void,
};

const NotificationCard = (props: NotificationCardProps) => {
    return (
        <div className="notification-card" style={{ backgroundColor: props.ignored ? '#eee' : '#fff' }}>
            <div>
                <h1>{props.projectName}</h1>
                <p>You have been invited to join this project by {props.invitedBy}</p>
                <div className="notification-actions">
                    <button className="success" onClick={props.onAccept}>Accept</button>
                    {props.ignored ? (<button onClick={props.onUnignore}>Unignore</button>) : (<button onClick={props.onIgnore}>Ignore</button>)}            
                </div>
            </div>
        </div>
    )
};

export default NotificationCard