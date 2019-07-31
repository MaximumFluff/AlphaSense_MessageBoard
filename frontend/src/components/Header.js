import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const Header = ({onBoardSelected, boards}) => (
  <div className='header-boards'>
    <p style={{ fontSize: 20, margin: 10}}>/</p>
    {boards.map(board => (
      <div style={{ display: 'flex', flexDirection: 'row', }}>
        <button name={board.name} className="board-link" onClick={e => onBoardSelected(board.name, board.symbol)}>{board.symbol}</button>
        <p style={{ fontSize: 20, margin: 10}}>/</p>
      </div>
    ))}
  </div>
);

export default Header;

Header.propTypes = {
  onBoardSelected: PropTypes.func.isRequired,
  boards: PropTypes.array,
}