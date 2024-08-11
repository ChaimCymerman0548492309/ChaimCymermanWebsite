import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd';
import './App.module.css';

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
  onRemoveOrMove: (id: number, boxIndex: number) => void;
  draggingCount: number;

}> = ({ solder, index, onCheck, isSelected, showCheckbox, onRemoveOrMove, draggingCount }) => {

  const handleDoubleClick = () => {
    if (solder.checked) {
      onCheck(solder.id); // Toggle the checkbox to false on double-click
    }
  };

  return (
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
          {/* Pass the index of the Done box to the onRemoveOrMove function */}
          <div className="remove-icon" onClick={() => onRemoveOrMove(solder.id, index)}>
            &#10005;
          </div>

          {snapshot.isDragging && draggingCount > 1 && (
            <div className="dragging-count-circle">
              {draggingCount}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

const SoldersBox: React.FC<{
  boxTitle: string;
  solders: SolderType[];
  onCheck: (id: number) => void;
  selectedSoldersIds: number[];
  showCheckbox: boolean;
  onRemoveOrMove: (id: number, boxIndex: number) => void;
  draggingCount: number;

}> = ({ boxTitle: title, solders, onCheck, selectedSoldersIds, showCheckbox, onRemoveOrMove, draggingCount }) => {
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
              isSelected={selectedSoldersIds.includes(task.id)}
              showCheckbox={showCheckbox}
              onRemoveOrMove={(id: number) => onRemoveOrMove(id, index)}
              draggingCount={draggingCount}
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
  const [doneBoxes, setDoneBoxes] = useState<SolderType[][]>([[]]);
  const [selectedSoldersIds, setSelectedSoldersIds] = useState<number[]>([]);
  const [draggingCount, setDraggingCount] = useState<number>(0);


  const updateBoxes = (
    sourceId: string,
    destId: string,
    sourceIndex: number,
    destIndex: number,
    selectedSoldersIds: number[], // Changed to number[]
    solders: SolderType[],
    doneBoxes: SolderType[][]
  ): {
    solders: SolderType[];
    doneBoxes: SolderType[][];
  } => {
    const sourceIdNumber = parseInt(sourceId.split('-')[1], 10);
    const destIdNumber = parseInt(destId.split('-')[1], 10);
  
    let updatedSolders = [...solders];
    let updatedDoneBoxes = [...doneBoxes];
  
    const sourceSolders = sourceId === 'Solders' ? updatedSolders : updatedDoneBoxes[sourceIdNumber];
    const destinationSolders = destId === 'Solders' ? updatedSolders : updatedDoneBoxes[destIdNumber];
  
    const movingSolders = selectedSoldersIds.length > 0 && sourceId === 'Solders'
      ? sourceSolders.filter(solder => selectedSoldersIds.includes(solder.id))
      : [sourceSolders[sourceIndex]];
  
    // Remove the items from the source
    const newSourceSolders = sourceSolders.filter(solder => !movingSolders.includes(solder));
  
    // Add the items to the destination
    const newDestinationSolders = [...destinationSolders];
    newDestinationSolders.splice(destIndex, 0, ...movingSolders.map(solder => ({ ...solder, checked: false })));
  
    // Reorganize items in both source and destination boxes
    if (sourceId === 'Solders') {
      updatedSolders = reorganizeItemsInBox(newSourceSolders);
    } else {
      updatedDoneBoxes[sourceIdNumber] = reorganizeItemsInBox(newSourceSolders);
    }
  
    if (destId === 'Solders') {
      updatedSolders = reorganizeItemsInBox(newDestinationSolders);
    } else {
      updatedDoneBoxes[destIdNumber] = reorganizeItemsInBox(newDestinationSolders);
    }
  
    return {
      solders: updatedSolders,
      doneBoxes: updatedDoneBoxes
    };
  };
  
  const reorganizeItemsInBox = (items: SolderType[]): SolderType[] => {
    // Remove duplicates and reorder items if necessary
    const uniqueItems = Array.from(new Set(items.map(item => item.id)))
      .map(id => items.find(item => item.id === id))
      .filter((item): item is SolderType => item !== undefined);
  
    return uniqueItems;
  };
  
  

  const handleCheckSolder = (id: number) => {
    setSelectedSoldersIds(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(solderId => solderId !== id) : [...prevSelected, id]
    );
  };

  const handleRemoveOrMove = (id: number, boxIndex: number) => {
    if (boxIndex === 0) {
      // If in 'Solders' box (box 0), remove it
      setSolders(prevSolders => prevSolders.filter(solder => solder.id !== id));
    } else {
      // If in any 'Done' box, move it back to 'Solders' box (box 0)
      setDoneBoxes(prevDoneBoxes => {
        const updatedBoxes = prevDoneBoxes.map((box, index) =>
          index === boxIndex ? box.filter(solder => solder.id !== id) : box
        );

        // Find the solder to move back to 'Solders'
        const solderToMove = prevDoneBoxes[boxIndex].find(solder => solder.id === id);

        if (solderToMove) {
          // Add the solder back to 'Solders'
          setSolders(prevSolders => [...prevSolders, { ...solderToMove, checked: false }]);
        }

        return updatedBoxes;
      });
    }
  };



  const onDragStart = (start: DragStart) => {
    const sourceId = start.source.droppableId;
    let sourceSolders: SolderType[] = [];

    if (sourceId === 'Solders') {
      sourceSolders = solders;
    } else {
      const parts = sourceId.split('-');
      const sourceIndex = parseInt(parts[1], 10);

      if (isNaN(sourceIndex)) {
        console.error(`Invalid source index: ${sourceIndex}`);
        return;
      }

      if (sourceIndex < 1 || sourceIndex > doneBoxes.length) {
        console.error(`Source index out of bounds: ${sourceIndex}`);
        return;
      }

      sourceSolders = doneBoxes[sourceIndex - 1];
    }

    // Debug: Log extracted values
    console.log('Source index:', sourceId, sourceSolders);

    const movingSolders = selectedSoldersIds.length > 0
      ? sourceSolders.filter(solder => selectedSoldersIds.includes(solder.id))
      : [sourceSolders[start.source.index]];

    setDraggingCount(movingSolders.length);
  };


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) {
      setDraggingCount(0);
      return;
    }
  
    const sourceId = source.droppableId;
    const destId = destination.droppableId;
    const sourceIndex = source.index;
    const destIndex = destination.index;
  
    // Call updateBoxes to get the updated state
    const { solders: updatedSolders, doneBoxes: updatedDoneBoxes } = updateBoxes(
      sourceId,
      destId,
      sourceIndex,
      destIndex,
      selectedSoldersIds,
      solders,
      doneBoxes
    );
  
    // Update the state with the new values
    if (sourceId === 'Solders') {
      setSolders(updatedSolders);
    } else {
      setDoneBoxes(updatedDoneBoxes);
    }
  
    if (destId === 'Solders') {
      setSolders(updatedSolders);
    } else {
      setDoneBoxes(updatedDoneBoxes);
    }
  
    // Reset the dragging count and selected solder IDs
    setSelectedSoldersIds([]);
    setDraggingCount(0);
  };
  
  

  
  
  
  



  const addDoneBox = () => {
    setDoneBoxes(prevDoneBoxes => [...prevDoneBoxes, []]);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="App">
        <SoldersBox
          boxTitle="Solders"
          solders={solders}
          onCheck={handleCheckSolder}
          selectedSoldersIds={selectedSoldersIds}
          showCheckbox={true}
          onRemoveOrMove={handleRemoveOrMove}
          draggingCount={draggingCount}
        />
        {doneBoxes.map((doneBox, index) => (
          <SoldersBox
            key={`Done-${index}`}
            boxTitle={`Done-${index}`}
            solders={doneBox}
            onCheck={() => { }}
            selectedSoldersIds={[]}
            showCheckbox={false}
            onRemoveOrMove={(id: number) => handleRemoveOrMove(id, index)}
            draggingCount={draggingCount}
          />
        ))}
        <button onClick={addDoneBox} className="add-done-box-button">
          + Add Done Box
        </button>
      </div>
    </DragDropContext>
  );
};

export default App;
