import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd';
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
  onRemoveOrMove: (id: number, boxIndex: number, title: string) => void;
  draggingCount: number;
  title: string;
}> = ({ solder, index, onCheck, isSelected, showCheckbox, onRemoveOrMove, draggingCount, title }) => {
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
          <div className="remove-icon" onClick={() => onRemoveOrMove(solder.id, index, title)}>
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
  onRemoveOrMove: (id: number, boxIndex: number, title: string) => void;
  draggingCount: number;
  onRemoveBox?: () => void;
  teamName: string;
  onTeamNameChange: (name: string) => void;
}> = ({
  boxTitle: title,
  solders,
  onCheck,
  selectedSoldersIds,
  showCheckbox,
  onRemoveOrMove,
  draggingCount,
  onRemoveBox,
  teamName,
  onTeamNameChange
}) => {
  return (
    <Droppable droppableId={title}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="task-box"
          style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' }}
        >
          <div className="box-header">
            {title !== 'Solders' && (
              <input
                type="text"
                value={teamName}
                onChange={(e) => onTeamNameChange(e.target.value)}
                placeholder="Team Name"
                className="team-name-input"
              />
            )}
            {/* Display the team name as the box title in an h3 */}
            <h3 className="team-name-title">{teamName || title}</h3>
            {onRemoveBox && title !== 'Solders' && (
              <button className="remove-box-button" onClick={onRemoveBox}>
                &#10005;
              </button>
            )}
          </div>
          {solders.map((task, index) => (
            <Solder
              key={task.id}
              solder={task}
              index={index}
              onCheck={onCheck}
              isSelected={selectedSoldersIds.includes(task.id)}
              showCheckbox={showCheckbox}
              onRemoveOrMove={(id: number) => onRemoveOrMove(id, index, title)}
              draggingCount={draggingCount}
              title={title}
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
  const [teamNames, setTeamNames] = useState<string[]>(['']);

  const updateBoxes = (
    sourceId: string,
    destId: string,
    sourceIndex: number,
    destIndex: number,
    selectedSoldersIds: number[],
    solders: SolderType[],
    doneBoxes: SolderType[][]
  ): {
    solders: SolderType[];
    doneBoxes: SolderType[][];
  } => {
    const sourceIdNumber = parseInt(sourceId.split('-')[1], 10);
    const destIdNumber = parseInt(destId.split('-')[1], 10);

    let updatedSolders = [...solders];
    const updatedDoneBoxes = [...doneBoxes];

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

  const handleRemoveOrMove = (id: number, boxIndex: number, title: string) => {
    if (title === 'Solders') {
      // Remove from 'Solders' box (box 0)
      setSolders(prevSolders => prevSolders.filter(solder => solder.id !== id));
    } else {
      // If in any 'Done' box, move it back to 'Solders' box (box 0)
      const boxIndex = parseInt(title.split('-')[1], 10);
  
      setDoneBoxes(prevDoneBoxes => {
        // Remove the solder from the current 'Done' box
        const updatedBoxes = prevDoneBoxes.map((box, index) =>
          index === boxIndex ? box.filter(solder => solder.id !== id) : box
        );
  
        // Find the solder to move
        const solderToMove = prevDoneBoxes[boxIndex].find(solder => solder.id === id);
  
        if (solderToMove) {
          // Add the solder back to 'Solders'
          setSolders(prevSolders => [...prevSolders, { ...solderToMove, checked: false }]);
        }
  
        return updatedBoxes;
      });
    }
  };
  

  const handleRemoveBox = (index: number) => {
    setDoneBoxes(prevDoneBoxes => {
      const boxToRemove = prevDoneBoxes[index];

      if (boxToRemove.length > 0) {
        // Add solders from the removed box back to 'Solders'
        setSolders(prevSolders => [...prevSolders, ...boxToRemove.map(solder => ({ ...solder, checked: false }))]);
      }

      // Remove the box
      const updatedBoxes = prevDoneBoxes.filter((_, i) => i !== index);

      // Update team names
      const updatedNames = teamNames
        .filter((_, i) => i !== index)
      // .map((name, i) => `Done-${i}`);

      setTeamNames(updatedNames);

      return updatedBoxes;
    });
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
    setTeamNames(prevTeamNames => [...prevTeamNames, `Done-${prevTeamNames.length}`]);
  };

  const handleTeamNameChange = (index: number, name: string) => {
    setTeamNames(prevTeamNames => {
      const updatedNames = [...prevTeamNames];
      updatedNames[index] = name;
      return updatedNames;
    });
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
          teamName="Solders"
          onTeamNameChange={() => {}} // No need to handle team name change for the "Solders" box
        />
        {doneBoxes.map((doneBox, index) => (
          <SoldersBox
            key={`Done-${index}`}
            boxTitle={`Done-${index}`}
            solders={doneBox}
            onCheck={() => { }}
            selectedSoldersIds={[]}
            showCheckbox={false}
            onRemoveOrMove={handleRemoveOrMove}
            draggingCount={draggingCount}
            onRemoveBox={() => handleRemoveBox(index)}
            teamName={teamNames[index]}
            onTeamNameChange={(name) => handleTeamNameChange(index, name)}
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
