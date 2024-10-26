import { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
function Combine() {
  const [rules, setRules] = useState([]);      
  const [rule1, setRule1] = useState('');      
  const [rule2, setRule2] = useState('');      
  const [operator, setOperator] = useState(''); 
  const [error, setError] = useState('');     

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const url = import.meta.env.VITE_APP_BACKEND_URL;
        const response = await axios.get(`${url}/rules`); 
    
        // Check for specific response statuses
        if (response.status === 200) {
          const rulesData = response.data;
          console.log('Rules Data:', rulesData);
          // Ensure rulesData is an array before setting
          if (Array.isArray(rulesData)) {
            toast.success('Rules fetched successfully');
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
        toast.error('Failed to fetch rules. Please try again later.');
        console.error('Error fetching rules:', error);
        setError('Failed to fetch rules. Please try again later.');
      }
    };

    fetchRules(); // Call fetchRules inside useEffect to fetch rules on component mount
  }, []);

  const handleCombine = async () => {
    console.log('Rule 1:', rule1);
    console.log('Rule 2:', rule2);
    console.log('Operator:', operator);
    if (!rule1 || !rule2 || !operator) {
      toast.error('Please select both rules and an operator.');
      setError('Please select both rules and an operator.');
      return;
    }

    setError(''); 
    try {
      const url = import.meta.env.VITE_APP_BACKEND_URL;
      const response = await axios.post(`${url}/combine`, {
        rule1_id: rule1,
        rule2_id: rule2,
        type: operator
      });
      console.log('Combine successful:', response.data);
      toast.success('Rules combined successfully.');

    } catch (err) {
      toast.error('Failed to combine rules. Please try again later.');
      setError('Failed to combine rules. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full p-5">
      <p className="text-3xl mt-5 font-bold text-gray-700">Combine Rule</p>
      <div className="mt-5">
        <p className="text-lg font-semibold text-gray-600">
          Select the Rule from the select box to be combined and the combining operator between the rules.
        </p>
      </div>
      <div className="mt-5 w-full">
        {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
        <div className="w-full flex">
          <FormControl sx={{ m: 1, minWidth: '50%',maxWidth:'50%'  }}>
            <InputLabel>Rule 1</InputLabel>
            <Select
              value={rule1} // Controlled input
              onChange={(e) => setRule1(e.target.value)}
              label="Rule 1"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.isArray(rules) && rules.map((rule, index) => (
             <MenuItem key={index} value={rule._id}>
             {rule.rule}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={operator} // Controlled input
              onChange={(e) => setOperator(e.target.value)}
              label="Operator"
              
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-full">
          <FormControl sx={{ m: 1, minWidth: '50%',maxWidth:'50%' }}>
            <InputLabel>Rule 2</InputLabel>
            <Select
              value={rule2} // Controlled input
              onChange={(e) => setRule2(e.target.value)}
              label="Rule 2"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Array.isArray(rules) && rules.map((rule, index) => (
                <MenuItem key={index} value={rule._id}>
               {rule.rule}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mt-5 pl-2">
          <Button variant="contained" onClick={handleCombine}>
            Combine
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Combine;
