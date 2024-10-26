import RuleCard from "../Components/RuleCard"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
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
function Overview() {
    const [open, setOpen] = useState(false);
    const [rule, setRule] = useState('');
    const handleClose = () => {
        setOpen(false);
    }
  return (
    <div className="w-full h-full p-5 ">
        <p className="text-3xl mt-5 font-bold text-gray-700">All Created Rules</p>
        <div className="mt-5">
            <RuleCard/>
            <RuleCard/>
            <RuleCard/>
            <RuleCard/>
            <RuleCard/>
        </div>
        <div className="fixed top-[600px] right-10" onClick={()=>{
            setOpen(true)
        }}><Fab color="primary" aria-label="add">
            <AddIcon />
            </Fab>
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Add a Rule details
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

export default Overview
