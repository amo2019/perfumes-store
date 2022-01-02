import React from 'react';


import  './customButtonStyles.css';
interface Props {
  children?: React.ReactNode;
  onClick?: () => void
}

const CustomButton: React.FC<Props> = ({ children, ...props }) => (
  <button className='customButtonContainer' {...props}>{children}</button>
);

export default CustomButton;
 
 