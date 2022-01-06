import TextField from '@material-ui/core/TextField';

interface Props {
  onSetSearch: (search: string) => void,
  search: string
}

export default function SearchBar({onSetSearch, search}:Props) {
 
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onSetSearch(e.target.value)
  };

  return (
      <form className="searchbar">
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Search.."
          className="search-field"
          onChange={(e)=>onInputChange(e)}
          value={search}
        />
      </form>
    )
  }

