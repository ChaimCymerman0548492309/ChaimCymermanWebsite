import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './App.css';

type SolderType = {
  id: number;
  text: string;
  checked: boolean;
};

const soldersData: SolderType[] = [
  { id: 1, text: 'Task 1', checked: false },
  { id: 2, text: 'Task 2', checked: false },
  { id: 3, text: 'Task 3', checked: false },
  { id: 4, text: 'Task 4', checked: false },
];

const Solder: React.FC<{
  solder: SolderType;
  index: number;
  onCheck: (id: number) => void;
  isSelected: boolean;
  showCheckbox: boolean;
  onRemoveOrMove: (id: number) => void;
}> = ({ solder: solder, index, onCheck, isSelected, showCheckbox, onRemoveOrMove }) => {

  const handleDoubleClick = () => {
    if (solder.checked) {
      onCheck(solder.id); // Toggle the checkbox to false on double-click
    }
  };

  return (
      <div >
    <Draggable draggableId={solder.id.toString()} index={index}>

      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${snapshot.isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
          style={{
            userSelect: 'none',
            ...provided.draggableProps.style,
            display: 'flex',
          }}
        >
          {showCheckbox && (
            <input
              type="checkbox"
              checked={solder.checked}
              onChange={() => onCheck(solder.id)}
              onDoubleClick={handleDoubleClick}
              className="task-checkbox"
              />
            )}
          <span className="task-text">{solder.text}</span>
          <div className="remove-icon" onClick={() => onRemoveOrMove(solder.id)}>x
          </div>
      </div>
      )}
    </Draggable>
      </div>
  );
};

const SoldersBox: React.FC<{
  boxTitle: string;
  solders: SolderType[];
  onCheck: (id: number) => void;
  selectedSoldersIds: number[];
  showCheckbox: boolean;
  onRemoveOrMove: (id: number) => void;
}> = ({ boxTitle: title, solders: solders, onCheck, selectedSoldersIds: selectedTaskIds, showCheckbox, onRemoveOrMove }) => {
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
          {solders.map((task, index) => (
            <Solder
              key={task.id}
              solder={task}
              index={index}
              onCheck={onCheck}
              isSelected={selectedTaskIds.includes(task.id)}
              showCheckbox={showCheckbox}
              onRemoveOrMove={onRemoveOrMove}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const App: React.FC = () => {
  const [solders, setSolders] = useState<SolderType[]>(soldersData);
  const [choseSolders, setChoseSolders] = useState<SolderType[]>([]);
  const [selectedSoldersIds, setSelectedSoldersIds] = useState<number[]>([]);

  const handleCheckSolder = (id: number) => {
    setSelectedSoldersIds(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(solderId => solderId !== id) : [...prevSelected, id]
    );
  };

  const handleRemoveOrMove = (id: number) => {
    if (solders.some(task => task.id === id)) {
      // If the task is in the To Do box, remove it
      setSolders(prevSoldrs => prevSoldrs.filter(task => task.id !== id));
    } else {
      // If the task is in the Done box, move it back to the To Do box
      const taskToMove = choseSolders.find(task => task.id === id);
      if (taskToMove) {
        setChoseSolders(prevChosenSolders => prevChosenSolders.filter(solder => solder.id !== id));
        setSolders(prevSoldrs => [...prevSoldrs, { ...taskToMove, checked: false }]);
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    const sourceSolders = source.droppableId === 'Solders' ? solders : choseSolders;
    const destinationTasks = destination.droppableId === 'Solders' ? solders : choseSolders;
    const setSourceSolders = source.droppableId === 'Solders' ? setSolders : setChoseSolders;
    const setDestinationSolders = destination.droppableId === 'Solders' ? setSolders : setChoseSolders;

    let movingSolders: SolderType[] = [];

    if (selectedSoldersIds.length > 0 && source.droppableId === 'Solders') {
      // Dragging multiple selected tasks
      movingSolders = sourceSolders.filter(solder => selectedSoldersIds.includes(solder.id));
    } else {
      // Dragging a single task
      movingSolders = [sourceSolders[source.index]];
    }

    // If reordering within the same list
    if (source.droppableId === destination.droppableId) {
      const reorderedSolders = Array.from(sourceSolders);
      const [removed] = reorderedSolders.splice(source.index, 1);
      reorderedSolders.splice(destination.index, 0, removed);

      setSourceSolders(reorderedSolders);
    } else {
      // Moving between lists
      const remainingSolders = sourceSolders.filter(solder => !movingSolders.includes(solder));
      const newDestinationSolders = Array.from(destinationTasks);

      // Insert the moving tasks into the new list
      newDestinationSolders.splice(destination.index, 0, ...movingSolders.map(solder => ({ ...solder, checked: false })));

      setSourceSolders(remainingSolders);
      setDestinationSolders(newDestinationSolders);
    }

    // Clear selected tasks after dragging
    setSelectedSoldersIds([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <SoldersBox
          boxTitle="Solders"
          solders={solders}
          onCheck={handleCheckSolder}
          selectedSoldersIds={selectedSoldersIds}
          showCheckbox={true}
          onRemoveOrMove={handleRemoveOrMove}
        />
        <SoldersBox
          boxTitle="ChosenSolders"
          solders={choseSolders}
          onCheck={() => {}}
          selectedSoldersIds={[]}
          showCheckbox={false}
          onRemoveOrMove={handleRemoveOrMove}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
