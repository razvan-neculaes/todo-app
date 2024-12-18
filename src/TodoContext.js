import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

// Define initial state
const initialState = {
  todos: [],
};

// Define reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create context
export const TodoContext = createContext();

// Create provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, initial => {
    const persistedTodos = localStorage.getItem('todos');
    return persistedTodos ? { todos: JSON.parse(persistedTodos) } : initial;
  });

  // Memoize the context value
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

// Add prop types validation
TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
