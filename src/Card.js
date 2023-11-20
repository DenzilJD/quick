import './Card.css';

export const Card = ({ id, title, tag, userId, status, priority }) => {
    return <div className='card'>
        <div className='card-id-group'>
            <h2 className='card-id'>{id}</h2>
            <h2 className='card-user-id'>{userId}</h2>
        </div>
        <div className='card-title-group'>
            {/* {status} */}
            <h3 className='card-title'>{title}</h3>
        </div>
        <div className='card-info-group'>
            {/* <div className='tag'>{priority}</div> */}
            {tag?.map(t=><div className='tag'>{t}</div>)}
        </div>
    </div>
}