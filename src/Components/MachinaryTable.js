import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from 'axios';
// import Table from 'react-bootstrap/Table';
import { useFieldArray, useFormContext, Controller, useWatch } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Api } from '../Api';
import addKeyValue from './Utility';

const MachinaryTable = () => {
  const [rows, setRows] = useState([{
  }])
  const [machinaryList, setMachinaryList] = useState([]);
  const [machinaryOptions, setMachinaryOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const methods = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    ...methods.control,
    name: 'craneMachineryList',
  });
  const ApiUrl = `${Api}crane/init-data`;

  const defaultValue = [{
    "machinerySetId": "",
    "machineryOthers": null,
    "quantity": "",
    "workingHeightMetres": ""
  }]

    const watchValue = useWatch({
      name: "craneMachineryList"
    });

    console.log(watchValue);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(ApiUrl);
        const options = response.craneMachinerySet.map(function (item) {
          return addKeyValue(item, 'label', 'value', item.machineryName, item.id);
        });
        setMachinaryOptions(options);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const Button = React.memo(() => {
    console.log("Button Rendered!");
    const handleAddRow = () => {
      append({
        "machinerySetId": "",
        "machineryOthers": null,
        "quantity": "",
        "workingHeightMetres": ""
      });
    };

    return <button onClick={handleAddRow} className="btn btn-primary mBot-30">
      Add Row
    </button>
  });

  useEffect(() => {
    setTimeout(() => {
      if (methods.getValues('craneMachineryList').length <= 0) {
        methods.reset({
          ...methods.watch(),
          craneMachineryList: defaultValue
        });
      }

    }, 1);
  }, []);

  const handleChange = (idx, value) => {
    setMachinaryList(currentValues => {
        currentValues[idx] = value;
        return currentValues;
    });
};

  const DeleteButton = React.memo((props) => {
    const { idx } = props
    const removeRow = (index) => () => {
      remove(index);
    };
    return <button className="btn btn-outline-danger btn-sm" onClick={removeRow(idx)}> Delete</button>
  });
  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column table-responsive-xl">
            <div className="text-right">
              <Button></Button>
            </div>
            <table
              className="table table-hover"
              id="tab_logic"
            >
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Machinary Set</th>
                  <th className="text-center">Other Machinary Set</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Working height</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {fields && fields.map((field, idx) => {
                  return (
                    <tr key={field.id}>
                      <td>{idx}</td>
                      <td>
                      <Controller
                          control={methods.control}
                          name={`craneMachineryList.${idx}.machinerySetId`}
                          rules={{ required: true }}
                          render={({
                            field: { onChange, onBlur, name, value }
                          }) => (
                            <Select
                              options={machinaryOptions}
                              onChange={val => {
                                onChange(val.value);
                                handleChange(field.id, val.value); 
                              }} 
                              name={name}
                              onBlur={onBlur}
                            />
                          )}
                        />
                      </td>
                      <td>
                        {methods.getValues(`craneMachineryList.${idx}.machinerySetId`) === 'OTHR' ? <input type="text" className="form-control" {...methods.register(`craneMachineryList.${idx}.machineryOthers`)} /> : null}
                      </td>
                      <td>
                        <input type="text" className="form-control" {...methods.register(`craneMachineryList.${idx}.quantity`,
                          {
                            required: "This is required."
                          })} />
                      </td>
                      <td>
                        <input type="text" className="form-control" {...methods.register(`craneMachineryList.${idx}.workingHeightMetres`,
                          {
                            required: "This is required."
                          })} />
                      </td>
                      <td>
                        <DeleteButton idx={idx}></DeleteButton>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MachinaryTable;