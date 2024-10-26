import RuleCard from "../Components/RuleCard"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
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
    const [rules, setRules] = useState('');
    const[error, setError] = useState('');
    const [newrule, setNewRule] = useState('');
    const handleClose = () => {
        setOpen(false);
    }
  const addRule = async () => {
      try {
        console.log('New rule:', typeof(newrule));
        if (!newrule) {
          setError('Please select the  rule.');
          return;
        }
        setError(''); 
        const url = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.post(`${url}/create`, {
          rule: newrule,
        });
        console.log('New rule added:', response.data);
        setNewRule(''); 
        handleClose(); 
      } catch (error) {
        console.error('Error adding rule:', error);
      }
    };
    useEffect(() => {
      const fetchRules = async () => {
        try {
          const url = import.meta.env.VITE_APP_BACKEND_URL;
          const response = await axios.get(`${url}/rules`); 
      
          // Check for specific response statuses
          if (response.status === 200) {
            const rulesData = response.data;
            console.log('Rules Data:', rulesData);
            if (Array.isArray(rulesData)) {
              setRules(rulesData);
            } else {
              console.error('Fetched data is not an array:', rulesData);
              setError('Failed to fetch rules. Please try again later.');
            }
          } else {
            console.error(`Error fetching rules: HTTP error! Status: ${response.status}`);
            setError(`Error fetching rules: Status ${response.status}`);
          }
        } catch (error) {
          console.error('Error fetching rules:', error);
          setError('Failed to fetch rules. Please try again later.');
        }
      };
  
      fetchRules(); 
    }, []);
  return (
    <div className="w-full h-full p-5 ">
        <p className="text-3xl mt-5 font-bold text-gray-700">All Created Rules</p>
        <div className="mt-5">
           {Array.isArray(rules) && rules.map((rule,index) => {
            return <RuleCard key={index} rule={rule} />;
           })}
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
              onChange={e => setNewRule(e.target.value)}
              value={newrule}
            />
            
            <Button
              sx={{ width: '100px', float: 'right' }}
              onClick={addRule}
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
