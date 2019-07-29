import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Header = ({onBoardSelected, boards}) => (
  <div className='header-boards'>
    {boards.map(board => (
      <button name={board} className="board-link" onClick={e => onBoardSelected(e.target.name)}>{board}</button>
    ))}
  </div>
);

export default Header;

Header.propTypes = {
  onBoardSelected: PropTypes.func.isRequired,
  boards: PropTypes.array,
}