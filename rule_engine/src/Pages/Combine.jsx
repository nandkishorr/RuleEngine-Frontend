import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@mui/material/Button';
function Combine() {
  const [rule1, setRule1] = useState('');
  const [rule2, setRule2] = useState('');
  const [operator, setOperator] = useState('');
  return (
    <div className="w-full h-full p-5 ">
        <p className="text-3xl mt-5 font-bold text-gray-700">Combine Rule</p>
        <div className="mt-5">
          <p className="text-lg font-semibold text-gray-600">Select the Rule from the select box to be combine and the combining opertor between the rules. </p>
        </div>
        <div className="mt-5 w-full">
          <div>
            <div className="w-full flex">
              <FormControl sx={{ m: 1, minWidth: '50%'}}>
              <InputLabel id="demo-simple-select-autowidth-label">Rule 1</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={rule1}
                onChange={(e)=>setRule1(e.target.value)}
                autoWidth
                label="Rule ">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200}}>
              <InputLabel id="demo-simple-select-autowidth-label">Operator</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={operator}
                onChange={(e)=>setOperator(e.target.value)}
                autoWidth
                label="Rule ">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value='AND'>AND</MenuItem>
                <MenuItem value='OR'>OR</MenuItem>
              </Select>
            </FormControl>
        </div>
      <div className='w-full'>
      <FormControl sx={{ m: 1, minWidth: '50%'}}>
        <InputLabel id="demo-simple-select-autowidth-label">Rule 2</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={rule2}
          onChange={(e)=>setRule2(e.target.value)}
          autoWidth
          label="Rule ">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div className='mt-5 pl-2'>
      <Button variant="contained">Combine</Button>
      </div>
     
    </div>
    </div>
    </div>
  )
}

export default Combine
