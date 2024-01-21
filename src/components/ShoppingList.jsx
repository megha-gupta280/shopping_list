import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import Item from "./Item";

const ShoppingList = ({ listItems, setListItems }) => {

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(listItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListItems(items);
  }

  return (<>
    <Grid container xs={12} mt={2} border={"1px solid black"} sx={{ maxHeight: "500px", overflow: "scroll" }} p={1}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppableId">
          {(provided) => (
            <Grid container xs={12} sx={{ display: 'flex', flexDirection: "row", gap: "1rem" }} className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {listItems.map(({ id }, index) => {
                return (
                  <Item listItems={listItems} setListItems={setListItems} id={id} index={index} />
                );
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  </>)
}

export default ShoppingList;