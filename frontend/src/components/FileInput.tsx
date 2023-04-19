import Button from '@mui/material/Button';


export default function FileInput() {
  return (
    <div>
      <Button variant="contained" component="label" sx={{mt: 2}}>
        Dodaj plik
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </div>
  );
}