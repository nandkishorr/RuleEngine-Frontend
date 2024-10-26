import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { TextField } from '@mui/material';
import { useState } from "react";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper', 
    borderRadius:'10px',
  
    boxShadow: 24,
    p: 4,
  };
function RuleCard() {
    const [open, setOpen] = useState(false);
    const [rule, setRule] = useState('');
    const handleClose = () => {
        setOpen(false);
    }
  return (
    <div className="h-48 border-2 rounded-xl mt-5">
        <div className="flex flex-row justify-between p-5">
            <div className="text-xl font-bold text-gray-700">Rule Name</div>
            <div className="text-sm text-zinc-900 text-opacity-40">Created on 12th March 2021</div>
        </div>
        <div className="pl-5 text-xl font-semibold text-gray-600">((age{'>'}30 AND department = 'Sales') OR (age {'<'}25 AND
department = 'Marketing')) AND (salary {'>'} 50000 OR experience{'>'}5)</div>
        <div className="flex flex-row justify-between p-5">
            <div className="text-sm text-zinc-900 text-opacity-40">Rule ID: 123456</div>
            <div className="text-sm text-zinc-900 text-opacity-40">Last Updated: 12th March 2021</div>
        </div>
        <div className="flex justify-end">
        <button className=' flex justify-center mr-2 ml-6 hover-bg-zinc-900 hover-bg-opacity-15 w-40 px-6 py-0.5 rounded-lg text-sm border-2 '><div className='flex'>Evaluate Rule</div></button>
        <button  onClick={()=>{
          setOpen(true)
        }}className='flex justify-center mr-2 ml-6 hover-bg-zinc-900 hover-bg-opacity-15 w-40 px-6 py-0.5 rounded-lg text-sm border-2 '><div className='flex'>Edit Rule</div></button>
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Update the Rule details
            </Typography>
            <TextField
              sx={{ mb: 2, width: '50ch' }}
              label="Enter the rule string here "
              placeholder="(age > 30 AND department = 'Sales')"
              multiline
              variant="standard"
              onChange={e => setRule(e.target.value)}
              value={rule}
            />
            
            <Button
              sx={{ width: '100px', float: 'right' }}
            //   onClick={addMovie}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Modal>
        
        </div>
      
   
  )
}

export default RuleCard
