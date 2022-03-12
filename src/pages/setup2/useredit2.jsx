import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import "./useredit.css";
import axios from 'axios';
import { useHistory } from 'react-router';

export function PageUserEdit2() {
  const {Title}=Typography;
  const history = useHistory();
    return (
        <div className="page-user-edit">
          <Title level={2}>Editar Usuarios:</Title>
            <EditableTable />
            <Button onClick={()=>{history.push("/setup2")}} style={{marginBottom:"1rem"}}>Regresar</Button>
        </div>
    )
};
   
  
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

// GET

function EditableTable()  {
    const [originData,setorigindata] = useState([])

useEffect(()=>{
    axios.get("http://127.0.0.1:8080/users")
    .then((destino)=>{
       setorigindata(destino.data.users);
       console.log(originData)
          
    }) 
},["http://127.0.0.1:8080/users"]);

  const [form] = Form.useForm();

  const [data, setData] = useState(originData);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
    titulo: '',
      descripcion: '',
      // key:"",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

// PUT
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...originData];
      const index = newData.findIndex((item) => id === item.id);
      console.log('ID COMO ARGUMENTO:',id,typeof(id))
      console.log('ID COMO INDEX:',index,typeof(index))

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        console.log('EL VALOR A ACTUALIZAR',newData[index]);
        axios.put(`http://127.0.0.1:8080/user/${newData[index].id}`,newData[index])
        .then((portafolio)=>{
            alert("exito")
            console.log('que es esto',portafolio)})
        .catch((er)=>{console.log(er)})
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  //DELETE
     const delete_item = async (id) => {
       try {
        console.log('ID COMO ARGUMENTO:',id,typeof(id)) 
        const row = await form.validateFields();
         const newData = [...originData];
         console.log('NEW_DATA:',newData);
         const index = newData.findIndex((item) => id === item.id);
         console.log('ID COMO INDEX:',index,typeof(index))

         if (index > -1) {
           const item = newData[index];
           newData.splice(index, 1, { ...item, ...row });
           setData(newData);
           setEditingKey('');
           console.log('EL VALOR A ELIMINAR',newData[index]);
           axios.delete(`http://127.0.0.1:8080/user/${newData[index].id}`)
           .then((portafolio)=>{
               alert("exito")
               console.log('que es esto',portafolio)})
           .catch((er)=>{console.log(er)})
         } else {
           newData.push(row);
           setData(newData);
           setEditingKey('');
         }
       } catch (errInfo) {
         console.log('Validate Failed:', errInfo);
       }
     };


  const columns = [
    {
        title: 'UserID',
        dataIndex: 'id',
        width: '15%',
        editable: false,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      width: '15%',
      editable: true,
    },
    {
      title: 'TaxPayer',
      dataIndex: 'TaxPayer',
      width: '15%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '20%',
      editable: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: '20%',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      width: '20%',
      editable: true,
    },
    {
      title: 'Acción',
      dataIndex: 'operation',
      width: '10%',
      fixed:'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <br />
        <Popconfirm title="Sure to Delete?"  onConfirm={() => delete_item(record.id)}>
          <a style={{cursor:'pointer'}}>Delete</a>
        </Popconfirm>
        </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={originData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        scroll={{ x: 1300,y:400 }}
      />
    </Form>
  );
};
