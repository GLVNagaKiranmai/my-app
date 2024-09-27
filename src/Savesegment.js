import React, { useState } from 'react';
import './Savesegment.css';

const Savesegment = ({ onClose }) => {
  const allSchemas = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];

  const [segmentName, setSegmentName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [additionalSchemas, setAdditionalSchemas] = useState([]);
  const [values, setValues] = useState([''])
  const [options, setOptions] = useState([allSchemas]);
  let availableSchemas = [];  

  console.log("values ", values, options[0], options);

  const handleInputChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSchemaChange = (index, value) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(segmentName);
    setSegmentName('');
    
    const selectedSchemas = values
      .filter(value => value) // Keep only selected values
      .map(value => {
        const schema = allSchemas.find(schema => schema.value === value);
        if (schema) {
          return { [schema.value]: schema.label }; // { first_name: "First Name" }
        } else {
          console.error(`Schema not found for value: ${value}`);
          return null; // Handle case where schema is not found
        }
      })
      .filter(schema => schema !== null); // Remove any null entries

    const jsonOutput = {
      segment_name: segmentName,
      schema: selectedSchemas
    };

    console.log("JSON Output:", JSON.stringify(jsonOutput, null, 2));
    setSubmittedName(segmentName);
    setSegmentName('');
    setValues(['']); // Reset values after submission
  };

  const handleAdditionalSchemaChange = (index, value) => {
    const updatedSchemas = [...additionalSchemas];
    console.log("updateSchema: ", updatedSchemas)
    updatedSchemas[index] = value;
    console.log("updateSchema: ", updatedSchemas)
    setAdditionalSchemas(updatedSchemas);
  };

  availableSchemas = allSchemas
    .filter(schema => !additionalSchemas.includes(schema.value))
    .map(schema => <option key={schema.value} value={schema.value}>{schema.label}</option>);
  
  let availableValues = allSchemas.filter(scheam => !values.includes(scheam.label));

  const handleAddNewSchema = () => {
    console.log("last: ", values[values.length - 1].length, values[values.length - 1])

    if (values[values.length - 1].length > 0 && values.length < 7) {
      setValues(preVal => ([
        ...preVal, ''
      ]))
  
      setOptions(preVal => ([
        ...preVal, availableValues
      ]))
    }    
  };

  console.log("AVAILABLEVAL: ", availableValues);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className='heading'>
          <h2>Saving Segment</h2>
        </div>
        <div className='sub-content'>
          <form onSubmit={handleSubmit}>
            <p>Enter the Name of the Segment:</p>
            <input
              type="text"
              value={segmentName}
              onChange={handleInputChange}
              placeholder="Segment Name"
              required
            />
            <p>To save your segment, you need to save your schemas to build a query</p>
            <div className='traits'>
              <div className='trait'>
                <span className='user-circle'></span> - User traits
              </div>
              <div className='trait'>
                <span className='group-circle'></span> - Group traits
              </div>
            </div>
            {values.map((item, index) => (
              <select key={index} id="schema-select" value={item} onChange={(e) => handleSchemaChange(index, e.target.value)}>
                <option value="">Select a schema</option>
                {options[index].map(each => (
                  <option value={each.value}>{each.label}</option>
                ))}
              </select>
            ))}

            {/* <button type="button" onClick={handleAddNewSchema}>+ Add new schema</button> */}
            <div className='schema-container'>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                handleAddNewSchema();
              }} 
              className="add-schema-link" // Optional class for styling
            >
              + Add new schema
            </a>
            </div>

            <div className='button-container'>
              <button type="submit">Save</button>
              <button onClick={onClose}>Close</button>
            </div>
            {submittedName && <p>Saved Segment: {submittedName}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Savesegment;
