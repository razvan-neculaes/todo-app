import React, { useReducer, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';

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

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={5}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb={4} textAlign="center">
          To-Do List
        </Heading>
        <Flex mb={4}>
          <Input
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            mr={2}
          />
          <Button colorScheme="teal" onClick={handleAddTodo}>
            Add
          </Button>
        </Flex>
        <List spacing={3}>
          {state.todos.map(todo => (
            <ListItem
              key={todo.id}
              p={2}
              borderWidth={1}
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg={todo.completed ? 'green.100' : 'white'}
            >
              <Text
                as={todo.completed ? 's' : undefined}
                cursor="pointer"
                onClick={() =>
                  dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
                }
              >
                {todo.text}
              </Text>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() =>
                  dispatch({ type: 'REMOVE_TODO', payload: todo.id })
                }
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </ChakraProvider>
  );
};

export default App;
