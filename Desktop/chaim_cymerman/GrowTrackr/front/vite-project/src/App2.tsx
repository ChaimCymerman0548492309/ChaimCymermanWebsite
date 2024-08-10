import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './App.css';

type Task = {
  id: number;
  text: string;
  checked: boolean;
};

const tasksData: Task[] = [
  { id: 1, text: 'Task 1', checked: false },
  { id: 2, text: 'Task 2', checked: false },
  { id: 3, text: 'Task 3', checked: false },
  { id: 4, text: 'Task 4', checked: false },
];

const TaskItem: React.FC<{
  task: Task;
  index: number;
  onCheck: (id: number) => void;
  isSelected: boolean;
  showCheckbox: boolean;
}> = ({ task, index, onCheck, isSelected, showCheckbox }) => {
  
  const handleDoubleClick = () => {
    if (task.checked) {
      onCheck(task.id); // Toggle the checkbox to false on double-click
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${snapshot.isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
          style={{
            userSelect: 'none',
            ...provided.draggableProps.style,
          }}
        >
          {showCheckbox && (
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => onCheck(task.id)}
              onDoubleClick={handleDoubleClick}
              className="task-checkbox"
            />
          )}
          {task.text}
        </div>
      )}
    </Draggable>
  );
};


const TaskBox: React.FC<{
  title: string;
  tasks: Task[];
  onCheck: (id: number) => void;
  selectedTaskIds: number[];
  showCheckbox: boolean;
}> = ({ title, tasks, onCheck, selectedTaskIds, showCheckbox }) => {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="task-box"
          style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' }}
        >
          <h2>{title}</h2>
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onCheck={onCheck}
              isSelected={selectedTaskIds.includes(task.id)}
              showCheckbox={showCheckbox}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const App2: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    setSelectedTaskIds(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(taskId => taskId !== id) : [...prevSelected, id]
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    // Dropped outside the list
    if (!destination) return;
  
    const sourceTasks = source.droppableId === 'To Do' ? tasks : doneTasks;
    const destinationTasks = destination.droppableId === 'To Do' ? tasks : doneTasks;
    const setSourceTasks = source.droppableId === 'To Do' ? setTasks : setDoneTasks;
    const setDestinationTasks = destination.droppableId === 'To Do' ? setTasks : setDoneTasks;
  
    let movingTasks: Task[] = [];
  
    if (selectedTaskIds.length > 0 && source.droppableId === 'To Do') {
      // Dragging multiple selected tasks
      movingTasks = sourceTasks.filter(task => selectedTaskIds.includes(task.id));
    } else {
      // Dragging a single task
      movingTasks = [sourceTasks[source.index]];
    }
  
    // If reordering within the same list
    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = Array.from(sourceTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);
  
      setSourceTasks(reorderedTasks);
    } else {
      // Moving between lists
      const remainingTasks = sourceTasks.filter(task => !movingTasks.includes(task));
      const newDestinationTasks = Array.from(destinationTasks);
  
      // Insert the moving tasks into the new list
      newDestinationTasks.splice(destination.index, 0, ...movingTasks.map(task => ({ ...task, checked: false })));
  
      setSourceTasks(remainingTasks);
      setDestinationTasks(newDestinationTasks);
    }
  
    // Clear selected tasks after dragging
    setSelectedTaskIds([]);
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <TaskBox
          title="To Do"
          tasks={tasks}
          onCheck={handleCheck}
          selectedTaskIds={selectedTaskIds}
          showCheckbox={true}
        />
        <TaskBox
          title="Done"
          tasks={doneTasks}
          onCheck={() => {}}
          selectedTaskIds={[]}
          showCheckbox={false}
        />
      </div>
    </DragDropContext>
  );
};

export default App2



