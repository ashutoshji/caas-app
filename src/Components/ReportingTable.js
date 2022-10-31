import React, { useState, useEffect } from "react";
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Select from "react-select";
import axios from 'axios';
import { Api } from '../Api';
import addKeyValue from './Utility';

const ReportingTable = () => {
  const [rows, setRows] = useState([{
  }]);
  const [reportingOptions, setReportingOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const ApiUrl = `${Api}ship/init-data`;

  const defaultValue = [{
        reportingPoint: "",
        reportingTime: ""
  }];

  const methods = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    ...methods.control,
    name: 'shipReportingPointDetails',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(ApiUrl);
        const options = response.ship_reporting_points.map(function (item) {
          return addKeyValue(item, 'label', 'value', item.reportingPointName, item.reportingPointName);
        });
        setReportingOptions(options);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if(methods.getValues('shipReportingPointDetails').length<=0){
        methods.reset({
          ...methods.watch(),
          shipReportingPointDetails: defaultValue
        });
      }
      
    }, 2000);
  }, []);

  const Button = React.memo(() => {
    console.log("Button Rendered!");
    const handleAddRow = () => {
      append({
        reportingPoint: "",
        reportingTime: ""
      });
    };

    return <button onClick={handleAddRow} className="btn btn-primary mBot-30">
      Add Row
    </button>
  });

  const DeleteButton = React.memo((props) => {
    const { idx } = props
    const removeRow = (idx) => () => {
      remove(idx);
    };
    return <button className="btn btn-outline-danger btn-sm" onClick={removeRow(idx)}>Delete</button>
  });

  return (
    <>
      <div className="container mTop-30">
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
                  <th className="text-left">ID</th>
                  <th className="text-left">Reporting Point</th>
                  <th className="text-left">Reporting Time (HH:MM)</th>
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
                          name={`shipReportingPointDetails.${idx}.reportingPointId`}
                          rules={{ required: true }}
                          render={({
                            field: { onChange, onBlur, name, value }
                          }) => (
                            <Select
                              options={reportingOptions}
                              onChange={onChange}
                              name={name}
                              onBlur={onBlur}
                              value={value}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <input type="time"
                          defaultValue={field.timeStart}
                          className="form-control"
                          {...methods.register(`shipReportingPointDetails.${idx}.reportingTime`,
                            {
                              required: "This is required."
                            })} />
                        <ErrorMessage
                          errors={methods.errors}
                          name={`shipReportingPointDetails.${idx}.reportingTime`}
                          render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                        {/* <Input type="time" idx={idx} name="timeStart" className="form-control" Invalue={rows[idx].timeStart}/> */}
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

export default ReportingTable;