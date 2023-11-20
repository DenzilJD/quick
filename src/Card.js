import './Card.css';
import { MdOutlineSignalCellularAlt, MdOutlineSignalCellularAlt2Bar, MdOutlineSignalCellularAlt1Bar } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { AiOutlineDash } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { BiAdjust } from "react-icons/bi";

export const Card = ({ id, title, tag, status, priority, group, userName }) => {
    return <div className='card'>
        <div className='card-id-group'>
            <h2 className='card-id'>{id}</h2>
            {group !== 'user' ? (<img className='item img' src={`https://ui-avatars.com/api/?name=${userName.name}+${userName.name}&background=random`} />) : ''}
        </div>
        <div className='card-title-group'>
            {group !== 'status' ?
                (status === 'Todo' ? 
                    <MdOutlineRadioButtonUnchecked size='1.5rem' color='lightgrey' />
                : status === 'In progress' ?
                    <BiAdjust size='1.5rem' color='gold' />
                : status === 'Backlog' ?
                    <MdOutlineRadioButtonUnchecked size='1.5rem' color='red' />
                : status === 'Done' ?
                    <FaRegCheckCircle size='1.5rem' color='green' />
                : <IoIosCloseCircleOutline size='1.5rem' />)
            : ''}
            <h3 className='card-title'>{title}</h3>
        </div>
        <div className='card-info-group'>
            {group !== 'priority' ?
                (priority === 4 ?
                    <CgDanger color='red' size='1.5rem' />
                : priority === 3 ?
                    <MdOutlineSignalCellularAlt color='orange' size='1.5rem' />
                : priority === 2 ?
                    <MdOutlineSignalCellularAlt2Bar color='yellowgreen' size='1.5rem' />
                : priority === 1 ?
                    <MdOutlineSignalCellularAlt1Bar color='green' size='1.5rem' />
                : <AiOutlineDash size='1.5rem' />)
            : ''}
            <div>{tag?.map(t => <div className='tag'><FaCircle className='c-icon' color='grey' /> <span>{t}</span></div>)}</div>
        </div>
    </div>
}