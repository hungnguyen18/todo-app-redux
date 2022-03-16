import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef } from 'react';
import { todoRemainingSelector } from '../../redux/selectors'


export default function TodoList() {
  const [todoName, setTodoName] = useState('');
  const [priority, setPriority] = useState('Medium');

  const todoList = useSelector(todoRemainingSelector);

  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleButtonClick =() => {
    
    dispatch(
      addTodo({
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      })
    )
    setTodoName('');
    setPriority('Medium');
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map((todo) => 
          <Todo 
            id={todo.id}
            key={todo.id} 
            name={todo.name} 
            prioriry={todo.priority} 
            completed={todo.completed} 
          />
        )}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input
            ref ={inputRef}
            value={todoName}
            onChange={handleInputChange}
          />

          <Select defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>

          <Button type='primary' onClick={handleButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
