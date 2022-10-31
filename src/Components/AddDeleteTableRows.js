import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const AddDeleteTableRows = () => {

  const defaultValue = [{
    dateStart: "",
    dateEnd: "",
    timeStart: "",
    timeEnd: ""
  }];

  const methods = useFormContext();
  
  const { fields, append, remove, update } = useFieldArray({
    ...methods.control,
    name: 'activityDays',
  });

  const Button = React.memo(() => {
    console.log("Button Rendered!");
    const handleAddRow = () => {
      append({
          dateStart: "",
          dateEnd: "",
          timeStart: "",
          timeEnd: ""
      });
    };

    return <button onClick={handleAddRow} className="btn btn-primary mBot-30">
      Add Row
    </button>
  });

  const removeRow = (index) => () => {
    remove(index);
  };

  useEffect(() => {
    setTimeout(() => {
      if(methods.getValues('activityDays').length<=0){
        methods.reset({
          ...methods.watch(),
          activityDays: defaultValue
        });
      }
      
    }, 2000);
  }, []);


  const DeleteButton = React.memo((props) => {
    const { idx } = props
    const removeRow = (idx) => () => {
      remove(idx);
    };
    return <button className="btn btn-outline-danger btn-sm" onClick={removeRow(idx)}>Delete</button>
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
                  <th className="text-center"> ID </th>
                  <th className="text-center">Date Start</th>
                  <th className="text-center">Date End</th>
                  <th className="text-center">Time Start</th>
                  <th className="text-center">Time End</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {fields && fields.map((field, idx) => {
                  return (
                    <tr key={field.id}>
                      <td>{idx}</td>
                      <td>
                        {/* <Input type="date" idx={idx} name="dateStart" className="form-control" Invalue={rows[idx].dateStart}/> */}
                        <input type="date" defaultValue={field.dateStart} className="form-control" {...methods.register(`activityDays.${idx}.dateStart`,
                        {
                          required: "This is required.",
                          validate: {
                            required: value => {
                              //console.log(value);
                              const dateEnd = methods.getValues(`activityDays.${idx}.dateEnd`);
                              const x = new Date(value);
                              const y = new Date(dateEnd);
                              if (!!y && (x.getTime() > y.getTime())) return 'End date should be greater than Start date';
                              return true;
                            }
                          }
                        })}/>
                        <ErrorMessage
                          errors={methods.errors}
                          name={`activityDays.${idx}.dateStart`}
                          render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
                        />
                      </td>
                      <td>
                        <input type="date" defaultValue={field.dateEnd}  className="form-control" {...methods.register(`activityDays.${idx}.dateEnd`,
                        {
                          required: "This is required." ,
                          validate: {
                            required: value => {
                              const dateStart = methods.getValues(`activityDays.${idx}.dateStart`)
                              const x = new Date(value);
                              const y = new Date(dateStart);
                              if (x.getTime() < y.getTime()) return 'End date should be greater than Start date';
                              return true;
                            }
                          }
                        })} />
                        <ErrorMessage
                          errors={methods.errors}
                          name={`activityDays.${idx}.dateEnd`}
                          render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
                        />
                        {/* <Input type="date" idx={idx} name="dateEnd" className="form-control" Invalue={rows[idx].dateEnd}/> */}
                      </td>
                      <td>
                        <input type="time"  defaultValue={field.timeStart} className="form-control" {...methods.register(`activityDays.${idx}.timeStart`,
                        {
                          required: "This is required." 
                        })} />
                        <ErrorMessage
                          errors={methods.errors}
                          name={`activityDays.${idx}.timeStart`}
                          render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
                        />
                        {/* <Input type="time" idx={idx} name="timeStart" className="form-control" Invalue={rows[idx].timeStart}/> */}
                      </td>
                      <td>
                        <input type="time"  defaultValue={field.timeEnd}   className="form-control" {...methods.register(`activityDays.${idx}.timeEnd`,
                        {
                          required: "This is required." 
                        })} />
                        <ErrorMessage
                          errors={methods.errors}
                          name={`activityDays.${idx}.timeEnd`}
                          render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
                        />
                        {/* <Input type="time" idx={idx}  name="timeEnd" className="form-control" Invalue={rows[idx].timeEnd}/> */}
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

export default AddDeleteTableRows;