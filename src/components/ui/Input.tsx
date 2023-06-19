import TextField from '@mui/material/TextField'

interface InputProps {
  onChange: (value: string) => void
  label: string
  value: string
}

const Input = ({ onChange, label, value }: InputProps) => {
  return (
    <TextField
      id='outlined-basic'
      label={label}
      variant='outlined'
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  )
}

export default Input
