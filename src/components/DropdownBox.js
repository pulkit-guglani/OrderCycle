import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const DropDownBox = ({
  data = top3Films,
  width = 300,
  label = "Enter Text",
  value,
  setValue,
}) => {
  const selectHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={data} //props.data
      sx={{ width }} // props.width
      onChange={(event, newValue) => {
        if (newValue) {
          setValue(newValue.id);
        } else {
          console.log("Null value hai");
        }
      }}
      // value={value}
      onSelect={(e) => selectHandler(e)}
      renderInput={(params) => <TextField {...params} label={label} />} // props.label
    />
  );
};

export default DropDownBox;

const top3Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];
