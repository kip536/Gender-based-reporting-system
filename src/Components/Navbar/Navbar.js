import React from 'react'
import "../../App.css"

function Navbar() {
  return (
    <div>

        <nav className='navbar'>
            <div className='nav-container'>                               
                <ul>
                <li className='nav-item'> <a href ="http://localhost:3000/dashboard"> Dashboard</a></li>
                <li className='nav-item'><a href ="http://localhost:3000/"> Login</a></li>
                <li className='nav-item'><a href ="http://localhost:3000/messages"> Messages</a></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar


