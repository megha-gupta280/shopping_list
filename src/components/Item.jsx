import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DragHandle } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';

const Item = ({ listItems, setListItems, id, index }) => {

  const handleItemNameChange = useCallback((e, i) => {
    //Add the typed name on the correct index of rows
    const oldListems = [...listItems]
    const indexedItem = oldListems[i]
    indexedItem["name"] = e.target.value;
    setListItems(oldListems)
  }, [listItems, setListItems])

  const handleItemQuantityChange = useCallback((value, i, newValue) => {
    //Add the quantity for the item on the correct index of rows
    const oldListems = [...listItems]
    const indexedItem = oldListems[i]
    indexedItem["quantity"] = newValue?.props?.value;
    setListItems(oldListems)
  }, [listItems, setListItems])

  const handleRemoveItem = useCallback((index) => {
    // remove the selected index row from listItems
    const oldListems = [...listItems]
    oldListems.splice(index, 1)
    setListItems(oldListems)
  }, [listItems, setListItems])

  return (<>
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (

        <Grid xs={12} sx={{ display: "flex", flexDirection: "row", gap: "1rem", border: "1px solid grey", p: 1 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Grid item xs={1}><DragHandle /></Grid>
          <Grid item xs={4}><TextField fullWidth id="outlined-basic" label="Name" value={listItems[index]?.name || ""} variant="outlined" onChange={(e) => handleItemNameChange(e, index)} /></Grid>
          <Grid item xs={4}><FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={listItems[index]?.quantity || ""}
              onChange={(e, newValue) => handleItemQuantityChange(e, index, newValue)}
            >
              {
                [...Array(12).keys()].map((type) => {
                  return (
                    <MenuItem value={type + 1}>{type + 1}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl></Grid>
          <Grid item xs={2}><IconButton aria-label="delete" onClick={() => { handleRemoveItem(index) }}><Delete sx={{ color: "red" }} /></IconButton></Grid>
        </Grid>
      )}
    </Draggable>
  </>)
}

export default Item;