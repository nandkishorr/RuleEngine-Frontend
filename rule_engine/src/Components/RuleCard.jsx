import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useState } from "react";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper', 
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function RuleCard({ rule }) {
    const [newRule, setNewRule] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openEvaluate, setOpenEvaluate] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [experience, setExperience] = useState('');

    const handleCloseEdit = () => setOpenEdit(false);
    const handleCloseEvaluate = () => {
        setOpenEvaluate(false);
        // Reset evaluation inputs
        setAge('');
        setDepartment('');
        setSalary('');
        setExperience('');
        setError('');
        setResult('');
    };

    const time = new Date(rule?.createdAt).toLocaleDateString();

    const evaluateRule = async () => {
        if (!rule?._id || !age || !department || !salary || !experience) {
            setError('All fields are required for evaluation.');
            return;
        }
        setError(''); 
        try {
            const url=import.meta.env.VITE_APP_BACKEND_URL;
            const response = await axios.post(`${url}/evaluate`, {
                id: rule?._id,
                data: { age, department, salary, experience },
            });
            if (response.status === 200) {
                setResult(response);
                alert(`Rule evaluated successfully: ${response.data.message}`);
                console.log('Rule evaluated:', response.data.result);
            } else {
                setError(`Error: ${response.data.message}`);
            }
        } catch (err) {
            if (err.response) {
                setError(`Server Error: ${err.response.data.message}`);
            } else if (err.request) {
                setError('Network Error: No response from server.');
            } else {
                setError(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="h-fit border-2 rounded-xl mt-5 p-3">
            <div className="flex flex-row justify-between p-5">
                <div className="text-xl font-bold text-gray-700">Rule Name</div>
                <div className="text-sm text-zinc-900 text-opacity-40">Created on {time}</div>
            </div>
            <div className="pl-5 text-xl font-semibold text-gray-600">{rule?.rule}</div>
            <div className="flex flex-row justify-between p-5">
                <div className="text-sm text-zinc-900 text-opacity-40">Rule ID: {rule?._id}</div>
                {rule?.updatedAt && <div className="text-sm text-zinc-900 text-opacity-40">Last Updated: {rule?.updatedAt}</div>}
            </div>
            <div className="flex justify-end">
                <button onClick={() => setOpenEvaluate(true)} className='flex justify-center mr-2 ml-6 hover:bg-zinc-900 hover:bg-opacity-15 w-40 px-6 py-0.5 rounded-lg text-sm border-2 '>
                    <div className='flex'>Evaluate Rule</div>
                </button>
                <button onClick={() => setOpenEdit(true)} className='flex justify-center mr-2 ml-6 hover:bg-zinc-900 hover:bg-opacity-15 w-40 px-6 py-0.5 rounded-lg text-sm border-2 '>
                    <div className='flex'>Edit Rule</div>
                </button>
            </div>

            {/* Edit Rule Modal */}
            <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                        onChange={e => setNewRule(e.target.value)}
                        value={newRule}
                    />
                    <Button
                        sx={{ width: '100px', float: 'right' }}
                        // onClick={editRule}
                        variant="contained"
                    >
                        Add
                    </Button>
                </Box>
            </Modal>

            {/* Evaluate Rule Modal */}
            <Modal open={openEvaluate} onClose={handleCloseEvaluate} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Evaluate the Rule details
                    </Typography>
                    <TextField
                        sx={{ mb: 2, width: '50ch' }}
                        required
                        label="Enter the age"
                        placeholder="35"
                        variant="standard"
                        onChange={e => setAge(e.target.value)}
                        value={age}
                    />
                    <TextField
                        sx={{ mb: 2, width: '50ch' }}
                        required
                        label="Enter the department"
                        placeholder="Sales/Marketing"
                        variant="standard"
                        onChange={e => setDepartment(e.target.value)}
                        value={department}
                    />
                    <TextField
                        sx={{ mb: 2, width: '50ch' }}
                        required
                        label="Enter the salary"
                        placeholder="50000"
                        variant="standard"
                        onChange={e => setSalary(e.target.value)}
                        value={salary}
                    />
                    <TextField
                        sx={{ mb: 2, width: '50ch' }}
                        required
                        label="Enter the experience"
                        placeholder="3"
                        variant="standard"
                        onChange={e => setExperience(e.target.value)}
                        value={experience}
                    />
                    {error && <Typography color="error">{error}</Typography>} {/* Display error */}
                    {result && <Typography>Evaluation Result: {JSON.stringify(result.data.message)}</Typography>} {/* Display result */}
                    <Button
                        sx={{ width: '100px', float: 'right' }}
                        onClick={evaluateRule}
                        variant="contained"
                    >
                        Evaluate
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

RuleCard.propTypes = {
    rule: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rule: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string,
    }).isRequired,
};

export default RuleCard;
