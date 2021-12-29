import React from 'react'
import {NavLink} from 'react-router-dom';

const Nav = (props: React.HTMLAttributes<string>) => {
  const styles = {
    className:props.className,
    activeClassName: props.className,
    id:'menu-item'
  }
  console.log("styles: ", styles)
  const links = [
    {
      className: styles.className,
      activeClassName: styles.activeClassName,
      to: '/',
      name: 'HOME'
    }
   
  ]
  return (
    <div>
      {links.map(link =>  [
      <NavLink 
        className={link.className} 
        to={link.to}
        key={link.name}
        >
        {link.name}
      </NavLink>, 
    ])}
    </div>
  )
}

export default Nav;

