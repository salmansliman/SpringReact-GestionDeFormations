import React from 'react';
import styled from "styled-components";
import { MdMenu, MdShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavbarWrapper className="bg-white flex">
      <div className='container w-100'>
        <div className='brand-and-toggler flex flex-between w-100'>
          <Link to="/" className='navbar-brand text-uppercase ls-1 fw-8'>
            <span>F</span><span style={{ color: 'Black' }}>ormation</span>
          </Link>

          <div className='navbar-btns flex'>
            <Link to="/login" className='login-btn'>
              Login
            </Link>
            <Link to="/register" className='register-btn'>
              Register as Teacher
            </Link>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  height: 80px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px, rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

  .navbar-brand {
    font-size: 23px;
    span {
      color: var(--clr-orange);
    }
  }

  .navbar-btns {
    .login-btn,
    .register-btn {
      display: inline-block;
      padding: 10px 15px;
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
      color: var(--clr-black);
      text-decoration: none;
      border: 2px solid var(--clr-black);
      background-color: transparent;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .sidebar-open-btn {
      transition: all 300ms ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export default Navbar;
