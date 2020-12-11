import React from 'react';
import PropTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import list from '../../transitions/list.module.css';
import styles from './ContactList.module.css';


const ContactList = ({ items, onDelete }) => {
  return items.length ? (
    <TransitionGroup component="ul" className={styles.ContactList}>
        {items.map(({ name, id, number }) => {
          return (
            <CSSTransition 
            key={id} 
            timeout={250} 
            classNames={list}
            unmountOnExit>
            <li>
              <span>
                {name} {number}
              </span>
              <button
                type="button"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    ): null;
    // );
      };

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ContactList;