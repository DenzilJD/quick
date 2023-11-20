import { Card } from './Card';
import './App.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import OutsideAlerter from './ToggleDrop';
import { useEffect, useState } from 'react';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState('status');

  useEffect(() => {
    const llurl = '';
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
      })
      .catch(error => console.log('error', error));
  }, []);

  const [display, setDisplay] = useState('none');

  const toggleDisplay = () => {
    if (display === '')
      setDisplay('none');
  }

  const changeGroup = (e) => {
    if (e.target.value === "Status")
      setGroup('status');
    else if (e.target.value === "User")
      setGroup('user');
    else if (e.target.value === "Priority")
      setGroup('priority');
  }

  const changeOrder = (e)=>{
    if(e.target.value==="Priority")
      sortByPriority();
    else if(e.target.value==="Title")
      sortByTitle();
  }
  const sortByPriority=()=>{
  }

  const sortByTitle=()=>{
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
              <option>Status</option>
              <option>User</option>
              <option>Priority</option>
            </select>
          </div>
          <div className='app-dropdown-order'>
            <p>Ordering</p>
            <select onChange={changeOrder}>
              <option>Priority</option>
              <option>Title</option>
            </select>
          </div>
        </div>
      </OutsideAlerter>
    </div>
    {group === 'status' ? <div>
      {tickets.map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
    </div>
      : group === 'user' ? <div>
        {users.map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
      </div>
        : group === 'priority' ? <div>
          {tickets.map(d => <Card id={d.id} title={d.title} tag={d.tag} userId={d.userId} status={d.status} priority={d.priority} />)}
        </div> : ''}
  </div>
}

export default App;