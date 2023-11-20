import { Card } from './Card';
import './App.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import OutsideAlerter from './ToggleDrop';
import { useEffect, useState } from 'react';

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
          <div>Urgent</div>
          {tickets?.filter(dd => dd.priority === 4).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>High</div>
          {tickets?.filter(dd => dd.priority === 3).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>Medium</div>
          {tickets?.filter(dd => dd.priority === 2).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>Low</div>
          {tickets?.filter(dd => dd.priority === 1).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>No</div>
          {tickets?.filter(dd => dd.priority === 0).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
      </div>
    }
    else if (group === 'user') {
      return <div className='app-group'>
        {users.map(u => <div className='group-item'>
          <h5>{u.name}</h5>
          {tickets?tickets.filter(dd => dd.userId === u.id).map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />):'No created tasks.'}
        </div>)}
      </div>
    }
    else{
      return <div className='app-group'>
        <div className='group-item'>
          <div>Backlog</div>
          {tickets?.filter(dd => dd.status === 'Backlog').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>Todo</div>
          {tickets?.filter(dd => dd.status === 'Todo').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>In Progress</div>
          {tickets?.filter(dd => dd.status === 'In progress').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>Done</div>
          {tickets?.filter(dd => dd.status === 'Done').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div>
        <div className='group-item'>
          <div>Cancelled</div>
          {tickets?.filter(dd => dd.status === 'Canceled').map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
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