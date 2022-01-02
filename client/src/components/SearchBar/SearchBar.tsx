import { useState } from 'react'
import TextField from '@material-ui/core/TextField';

export default function SearchBar() {
  const [state, setState] = useState({ term: '' })
 
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState({ term: e.target.value })
  };

  return (
      <form className="searchbar">
        <TextField
          id="outlined-basic"
          variant="outlined"
          className="search-field"
          onChange={(e)=>onInputChange(e)}
          value={state.term}
        />
      </form>
    )
  }

