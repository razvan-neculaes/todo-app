import React, { useContext, useState } from 'react';
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
import { TodoProvider, TodoContext } from './TodoContext';

const TodoApp = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
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
              as={todo.completed ? 's' : undefined} // Strikethrough if completed
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
  );
};

const App = () => (
  <ChakraProvider>
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  </ChakraProvider>
);

export default App;
