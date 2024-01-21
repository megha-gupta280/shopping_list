import React, { useCallback, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Snackbar } from '@mui/material';
import ShoppingList from "./ShoppingList";
import "./Home.css"

const itemTypeOptions = [{ label: "Grocery", value: "grocery" }, { label: "Home Goods", value: "homeGoods" }, { label: "Hardware", value: "hardware" }]

const Home = () => {
  const [listItems, setListItems] = useState([{ id: "1", name: "", quantity: "" }]);
  const [listDetails, setListDetails] = useState({ name: "", type: "" })
  const [success, setSuccess] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleAddItem = useCallback(() => {
    // pushing the new item to the top of list so that even if list is scrollable, the newly added items will be visible to user
    setListItems(prev => [{ id: `${prev.length - 1}`, name: "", quantity: "" }, ...prev])
  }, [setListItems])

  const handleSave = useCallback(() => {
    // Check validation for all fields (if any field is empty)
    const isAnyFieldEmpty = listItems.find((item) => item.name === "" || item.quantity === "") || listDetails.name === "" || listDetails.type === ""
    if (isAnyFieldEmpty) {
      setShowNotification(true)
      setSuccess(false)
    } else {
      setShowNotification(true)
      setSuccess(true)
    }
  }, [listItems, listDetails])


  return (<>
    <div className="fixedHeader">
      <div className="container">
        My Shopping List
      </div>
    </div>
    <div className="container">
      <Grid container xs={12} rowSpacing={2}>
        <Grid container item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Grid item xs={4}>
            <TextField fullWidth label="List Name" onChange={(e) => setListDetails(prev => ({ ...prev, name: e.target.value }))} />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                onChange={(e, newValue) => {
                  console.log(e, "check e", newValue, "show new Value")
                  setListDetails(prev => ({ ...prev, type: newValue?.props?.value }))
                }}
              >
                {
                  itemTypeOptions.map((type) => {
                    return (
                      <MenuItem value={type.value}>{type.label}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Button sx={{ width: "100%" }} variant="contained" onClick={handleAddItem}>+ Add an item</Button>
        </Grid>
        <ShoppingList listItems={listItems} setListItems={setListItems} />
      </Grid>
    </div>
    <div className="fixedFooter">
      <div className="container">
        <Grid xs sx={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "end" }}>
          <Button variant="contained" disabled={!listItems.length} onClick={handleSave}>Save</Button>
          <Button variant="contained" onClick={() => { }}>Cancel</Button>
        </Grid>
      </div>
    </div>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={showNotification}
      autoHideDuration={60000}
      onClose={() => setShowNotification(false)}
      message={success ? "Saved list Details Successfully." : "please fill all the details."}
    />
  </>)
}

export default Home;