import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';




const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload; // get paste coming from action or home

      state.pastes.push(paste); // push paste into pastes list
      localStorage.setItem("pastes", JSON.stringify(state.pastes)) // JSON used for show paste in key value pair
      toast("paste created succesful")  // show msg when paste is created

      //  // Check if key-value pair already exists
      // const exists = state.pastes.some(
      //   (p) => p.key === paste.key && p.value === paste.value
      // );

      // if (exists) {
      //   toast("⚠️ This key-value pair already exists!");
      //   return; // Don't add duplicate
      // }


    },
    updateToPastes: (state, action) => {
      const updatepaste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === updatepaste._id) // find index number if the id of current paste is equal to new paste then it  their index number otherwise it give -1 not found

      if (index !== -1) {
        state.pastes[index] = updatepaste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste updated")
      }else {
    console.warn("Paste not found for update");
  }

      //   This searches the state.pastes array to find the index of the paste with the same _id as the one we're trying to update.
      // .findIndex() returns:
      // The index (e.g., 0, 1, 2, etc.) if found.
      // -1 if not found.

    },
    resetToPastes: (state, action) => {
      state.pastes = [];    // empty pastes array
      localStorage.removeItem("pastes") // remove pastes key

    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if(index >= 0){
        state.pastes.splice(index, 1);  //array.splice(startIndex, deleteCount)

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste deleted")
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer