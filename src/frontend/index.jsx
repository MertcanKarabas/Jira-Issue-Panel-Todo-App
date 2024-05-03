import React, { Fragment, useEffect, useState } from 'react';
import ForgeReconciler, { Form, Textfield, Icon, Box, Inline, Button, Stack, Strike } from '@forge/react';
import { invoke } from '@forge/bridge';

//Styles
import { lineStyle, textStyle, cardStyle, newTodoStyle, deleteStyle } from './Style'

const App = () => {
  const [todos, setTodos] = useState(null);
  const [input, setInput] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  if (!isFetched) {
    setIsFetched(true);
    invoke('get-all').then(setTodos);
  }

  const createTodo = async (label) => {
    const newTodos = [...todos, { label: label, isChecked: 'false', isSaving: true }];
    console.log(newTodos);
    setTodos(newTodos);
  }

  const onSubmit = () => {
    createTodo(input);
    setInput('');
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isChecked: !todo.isChecked, isSaving: true };
        }
        return todo;
      })
    )
  }

  const deleteTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isDeleting: true };
        }
        return todo;
      })
    )
  }

  useEffect(() => {
    if (!todos) return;
    if (!todos.find(todo => todo.isSaving || todo.isDeleting)) return;

    Promise.all(
      todos.map((todo) => {
        if (todo.isSaving && !todo.id) {
          return invoke('create', { label: todo.label, isChecked: false })
        }
        if (todo.isSaving && todo.id) {
          return invoke('update', { id: todo.id, label: todo.label, isChecked: todo.isChecked })
        }
        if (todo.isDeleting && todo.id) {
          return invoke('delete', { id: todo.id }).then(() => false);
        }
        return todo;
      })
    )
      .then(saved => saved.filter(a => a))
      .then(setTodos)
  }, [todos]);

  return (
    <Box xcss={cardStyle}>
      {todos && (
        <Stack>
          {todos.map((todo) => (todo.isChecked === true) ? (
            <Box xcss={lineStyle}>
              <Inline alignBlock='center' spread='space-between'>
                <Button appearance='subtle' onClick={() => toggleTodo(todo.id)}>
                  <Inline space='space.150' alignBlock='center'>
                    <Icon glyph='check-circle'
                      size='small'
                    />
                    <Strike>
                      <Box xcss={textStyle}>{todo.label}</Box>
                    </Strike>
                  </Inline>
                </Button>
                <Box xcss={deleteStyle}>
                  <Button spacing='none' onClick={() => deleteTodo(todo.id)}>
                    <Icon glyph='cross'
                      label='cross'
                      size='medium'
                    />
                  </Button>
                </Box>
              </Inline>
            </Box>
          ) : (
            <Box xcss={lineStyle}>
              <Inline alignBlock='center' spread='space-between'>
                <Button appearance='subtle' onClick={() => toggleTodo(todo.id)}>
                  <Inline space='space.150' alignBlock='center'>
                    <Icon glyph='check-circle-outline'
                      size='small'
                    />
                    <Box xcss={textStyle}>{todo.label}</Box>
                  </Inline>
                </Button>
                <Box xcss={deleteStyle}>
                  <Button spacing='none' onClick={() => deleteTodo(todo.id)}>
                    <Icon glyph='cross'
                      label='cross'
                      size='medium'
                    />
                  </Button>
                </Box>
              </Inline>
            </Box>
          ))}
        </Stack>
      )}
      <Fragment>
        <Form onSubmit={onSubmit}>
          <Box xcss={newTodoStyle}>
            <Textfield
              appearance='subtle'
              name='basic'
              id='newTodo'
              value={input}
              placeholder='Add a todo +'
              onChange={({ target }) => {
                setInput(target.value)
                console.log(input);
              }} />
          </Box>
        </Form>
      </Fragment>
    </Box>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
