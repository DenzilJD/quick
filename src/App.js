import { Card } from './Card';
import './App.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import OutsideAlerter from './ToggleDrop';
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineSignalCellularAlt, MdOutlineSignalCellularAlt2Bar, MdOutlineSignalCellularAlt1Bar } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { AiOutlineDash } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { BiAdjust } from "react-icons/bi";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(localStorage.getItem("gr"));
  const [order, setOrder] = useState(localStorage.getItem("or"));
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    const llurl = process.env.REACT_APP_API;
    fetch(llurl)
      .then(response => response.json())
      .then(result => {
        setTickets(() => {
          let arr = result.tickets.map(d => d);
          return arr;
        });
        setUsers(() => {
          let arr = result.users.map(d => d);
          return arr;
        });
        setTemp(true);
      })
      .catch(error => console.log('error', error));
  }, []);

  const [display, setDisplay] = useState('none');

  const toggleDisplay = () => {
    if (display === '')
      setDisplay('none');
  }

  const changeGroup = (e) => {
    if (e.target.value === "User") {
      setGroup('user');
      localStorage.setItem("gr", "user");
    }
    else if (e.target.value === "Priority") {
      setGroup('priority');
      localStorage.setItem("gr", "priority");
    }
    else {
      setGroup('status');
      localStorage.setItem("gr", "status");
    }
  }

  const changeOrder = (e) => {
    if (e.target.value === "Title") {
      setOrder('title');
      sortByTitle();
      localStorage.setItem("or", "title");
    }
    else {
      setOrder('priority');
      sortByPriority();
      localStorage.setItem("or", "priority");
    }
  }

  const sortByPriority = () => {
    const ticket = tickets.slice().sort((a, b) => a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : a.title > b.title ? 1 : -1);
    setTickets(ticket);
  }

  const sortByTitle = () => {
    let ticket = tickets.slice().sort((a, b) => a.title > b.title ? 1 : a.title < b.title ? -1 : a.priority > b.priority ? 1 : -1);
    setTickets(ticket);
  }
  useEffect(() => {
    if (order === 'title' && temp)
      sortByTitle();
    else if (order !== 'title' && temp)
      sortByPriority();
  }, [temp]);

  const groupTickets = () => {
    if (group === 'priority') {
      return <div className='app-group'>
        <div className='group-item'>
          <div className='sub-head'>
            <AiOutlineDash className='p-icon' size='1.5rem' />
            <div className='item'>No</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 0).length : ''}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.priority === 0).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='priority' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <CgDanger className='p-icon' color='red' size='1.5rem' />
            <div className='item'>Urgent</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 4).length : 'ghj'}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.priority === 4).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='priority' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <MdOutlineSignalCellularAlt className='p-icon' color='orange' size='1.5rem' />
            <div className='item'>High</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 3).length : 'ghj'}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.priority === 3).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='priority' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <MdOutlineSignalCellularAlt2Bar className='p-icon' color='orange' size='1.5rem' />
            <div className='item'>Medium</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 2).length : 'ghj'}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.priority === 2).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='priority' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <MdOutlineSignalCellularAlt1Bar className='p-icon' color='orange' size='1.5rem' />
            <div className='item'>Low</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 1).length : 'ghj'}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.priority === 1).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='priority' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
      </div>
    }
    else if (group === 'user') {
      return <div className='app-group'>
        {users.map(u => <div className='group-item'>
          <div className='item-head'>
            <div className='sub-head'>
              <img className='item img' src={`https://ui-avatars.com/api/?name=${u.name}+${u.name}&background=random`} />
              <div className='item'>{u.name} </div>
              <div className='item len'>{tickets ? tickets.filter(dd => dd.userId === u.id).length : 'ghj'}</div>
            </div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets ? tickets.filter(dd => dd.userId === u.id).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='user' userName={users.filter(u => u.id === d.userId)} />) : 'No created tasks.'}
        </div>)}
      </div>
    }
    else {
      return <div className='app-group'>
        <div className='group-item'>
          <div className='sub-head'>
            <MdOutlineRadioButtonUnchecked className='p-icon' size='1.5rem' color='red' />
            <div className='item'>Backlog</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 0).length : ''}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.status === 'Backlog').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='status' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <MdOutlineRadioButtonUnchecked className='p-icon' size='1.5rem' color='lightgrey' />
            <div className='item'>Todo</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 0).length : ''}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.status === 'Todo').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='status' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <BiAdjust className='p-icon' size='1.5rem' color='gold' />
            <div className='item'>In Progress</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 0).length : ''}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.status === 'In progress').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='status' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <FaRegCheckCircle className='p-icon' size='1.5rem' color='green' />
            <div className='item'>Done</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 0).length : ''}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.status === 'Done').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='status' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
        <div className='group-item'>
          <div className='sub-head'>
            <IoIosCloseCircleOutline className='p-icon' size='1.5rem' />
            <div className='item'>Backlog</div>
            <div className='item len'>{tickets ? tickets.filter(dd => dd.priority === 0).length : ''}</div>
            <div><FaPlus className='img' /> <BsThreeDots className='img' /></div>
          </div>
          {tickets?.filter(dd => dd.status === 'Canceled').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} group='status' userName={users.filter(u => u.id === d.userId)[0]} />)}
        </div>
      </div>
    }
  }

  return <div className="App">
    <div className='dropdown'>
      <OutsideAlerter display={display} toggleDisplay={toggleDisplay}>
        <div className='app-display' onClick={() => setDisplay(d => {
          if (d === '')
            return 'none';
          return '';
        })}>
          <RxHamburgerMenu size='2rem' />Display<RiArrowDropDownLine size='2rem' />
        </div>
        <div style={{ display: display }} className='app-dropdown-content'>
          <div className='app-dropdown-group'>
            <p>Grouping</p>
            <select onChange={changeGroup}>
              <option></option>
              <option>Status</option>
              <option>User</option>
              <option>Priority</option>
            </select>
          </div>
          <div className='app-dropdown-order'>
            <p>Ordering</p>
            <select onChange={changeOrder}>
              <option></option>
              <option>Priority</option>
              <option>Title</option>
            </select>
          </div>
        </div>
      </OutsideAlerter>
    </div>
    <div style={{ display: 'flex' }}>
      {groupTickets()}
    </div>
  </div>
}

export default App;