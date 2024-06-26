import React, { useState, useEffect } from "react";
import "../AddData/AddData.css";
import { Button, Select, Modal, message } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

function EditData() {
    const id = useLocation();
    const [data, setData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [editable, setEditable] = useState(true);
    const success = (msg, res) => {
        messageApi.open({
            type: 'success',
            content: msg + res,
        });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleDelete()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const fetchData = async () => {
        await axios
            .get(`https://bfi-server-eight.vercel.app/getpost/${id.state}`)
            .then((res) => setData(res.data));

    };
    useEffect(() => {
        fetchData();
        if (localStorage.getItem('isLoggedIn')) {
            setEditable(false)
        }
    }, []);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const onPriorityChange = (value, index) => {
        setData(prevData => {
            const updatedDashboardItems = [...prevData.dashboardItems];
            updatedDashboardItems[index] = {
                ...updatedDashboardItems[index],
                'Priority': value,
            };
            return {
                ...prevData,
                dashboardItems: updatedDashboardItems
            };
        });
    }
    const onTitleChange = (value) => {
        setData({ ...data, 'Title': value })
    };
    const onStatusChange = (value, index) => {
        setData(prevData => {
            const updatedDashboardItems = [...prevData.dashboardItems];
            updatedDashboardItems[index] = {
                ...updatedDashboardItems[index],
                'Status': value,
            };
            return {
                ...prevData,
                dashboardItems: updatedDashboardItems
            };
        });
    }
    const handleDashItemsChange = (e, index) => {
        setData(prevData => {
            const updatedDashboardItems = [...prevData.dashboardItems];
            updatedDashboardItems[index] = {
                ...updatedDashboardItems[index],
                [e.target.name]: e.target.value,
            };
            return {
                ...prevData,
                dashboardItems: updatedDashboardItems
            };
        });
    };
    const handleSubmit = () => {
        axios.put(`https://bfi-server-eight.vercel.app/updatepost/${id.state}`, data, {
            headers: {
                scheme: 'https',
            }
        })
            .then((res) => { success('Updated Successfully', res); window.location.pathname = `/${data.title}` })
            .catch((err) => console.log(err));
    };

    const handleDelete = () => {
        axios.delete(`https://bfi-server-eight.vercel.app/delPost/${id.state}`)
            .then((res) => {success('Deleted Successfully', res); window.location.pathname = `/${data.title}` })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="addData">
                {contextHolder}
                <Modal title="Delete!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Are you sure you want to delete?</p>
                </Modal>
                <div className="addData-head">
                    <h1>{data.title}</h1>
                    {!editable &&
                        <div className="addData-btn">
                            <Button type="primary" onClick={handleSubmit} style={{ backgroundColor: 'rgb(0, 114, 188)' }}>
                                Update
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" onClick={showModal} danger>
                                Delete
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button onClick={() => (window.location.pathname = `/${data.title}`)} className="cancel-btn">
                                Cancel
                            </Button>
                        </div>
                    }
                </div>
                <div className="addData-body">
                    <div className="form-data">
                        <div className="addform">
                            <label htmlFor="Title">Title</label>
                            <Select
                                className='ant-input'
                                onChange={onTitleChange}
                                placeholder={data.title}
                                options={[
                                    {
                                        value: 'DFS',
                                        label: 'DFS',
                                    },
                                    {
                                        value: 'BRI',
                                        label: 'BRI',
                                    },
                                    {
                                        value: 'ORG',
                                        label: 'ORG',
                                    },
                                ]}
                                disabled={editable}
                            />
                        </div>
                        <div className="addform">
                            <label htmlFor="Objective">Objective</label>
                            <textarea
                                className="input"
                                type={"text"}
                                value={data.objective}
                                rows="5"
                                cols="33"
                                name={"objective"}
                                onChange={handleChange}
                                disabled={editable}
                            />
                        </div>
                        <div className="addform">
                            <label htmlFor="Start_Date">Start Date</label>
                            <input
                                className="input"
                                type={"text"}
                                value={data.startDate}
                                name={"startDate"}
                                onChange={handleChange}
                                disabled={editable}
                            />
                        </div>
                        <div className="addform">
                            <label htmlFor="End_Date">End Date</label>
                            <input
                                className="input"
                                type={"text"}
                                value={data.endDate}
                                name={"endDate"}
                                onChange={handleChange}
                                disabled={editable}
                            />
                        </div>
                        <div className="addform">
                            <label htmlFor="Overall_progress">Overall progress</label>
                            <input
                                className="input"
                                type={"text"}
                                value={data.Overallprogress}
                                name={"Overallprogress"}
                                onChange={handleChange}
                                disabled={editable}
                            />
                        </div>
                    </div>
                    <div className="dashboard-form">
                        <div className="dashboard-body">
                            {data.dashboardItems?.map((value, i) => (
                                <div key={i} className="dashboardItems">
                                    <p>{`Sl.No: 1.${i + 1}`}</p>
                                    <div className="addform">
                                        <label htmlFor="Key_Results">Key Results</label>
                                        <textarea
                                            className="input"
                                            type={"text"}
                                            value={value.Key_Results}
                                            rows="5"
                                            cols="33"
                                            name={"Key_Results"}
                                            disabled={editable}
                                            onChange={(e) => handleDashItemsChange(e, i)}
                                        />
                                    </div>

                                    <div className="addform">
                                        <label htmlFor="Initiatives">Initiatives</label>
                                        <textarea
                                            className="input"
                                            type={"text"}
                                            value={value.Initiatives}
                                            rows="5"
                                            cols="33"
                                            placeholder={"Enter Initiatives"}
                                            name={"Initiatives"}
                                            onChange={(e) => handleDashItemsChange(e, i)}
                                            disabled={editable}
                                        />
                                    </div>
                                    <div className="addform">
                                        <label htmlFor="DFS">DFS</label>
                                        <input
                                            className="input"
                                            type={"text"}
                                            value={value.DFS}
                                            placeholder={"Enter DFS"}
                                            name={"DFS"}
                                            disabled={editable}
                                            onChange={(e) => handleDashItemsChange(e, i)}
                                        />
                                    </div>
                                    <div className="addform">
                                        <label htmlFor="BFI">BFI</label>
                                        <input
                                            className="input"
                                            type={"text"}
                                            value={value.BFI}
                                            placeholder={"Enter BFI"}
                                            name={"BFI"}
                                            onChange={(e) => handleDashItemsChange(e, i)}
                                            disabled={editable}
                                        />
                                    </div>
                                    <div className="addform">
                                        <label htmlFor="Priority">Priority</label>
                                        <Select
                                            className='ant-input dbt-ant-input'
                                            placeholder="Select Priority"
                                            onSelect={(value) => onPriorityChange(value, i)}
                                            defaultValue={value.Priority}
                                            options={[
                                                {
                                                    value: 'High',
                                                    label: 'High',
                                                },
                                                {
                                                    value: 'Medium',
                                                    label: 'Medium',
                                                },
                                                {
                                                    value: 'Low',
                                                    label: 'Low',
                                                },
                                            ]}
                                            disabled={editable}
                                        />
                                    </div>
                                    <div className="addform">
                                        <label htmlFor="Status">Status</label>
                                        <Select
                                            className='ant-input dbt-ant-input'
                                            placeholder="Select Status"
                                            onSelect={(value) => onStatusChange(value, i)}
                                            defaultValue={value.Status}
                                            options={[
                                                {
                                                    value: 'Ongoing',
                                                    label: 'Ongoing',
                                                },
                                                {
                                                    value: 'Yet to start',
                                                    label: 'Yet to start',
                                                },
                                                {
                                                    value: 'Completed',
                                                    label: 'Completed',
                                                },
                                            ]}
                                            disabled={editable}
                                        />
                                    </div>
                                    <div className="addform">
                                        <label htmlFor="progress">progress</label>
                                        <input
                                            className="input"
                                            type={"text"}
                                            value={value.progress}
                                            placeholder={"Enter progress"}
                                            name={"progress"}
                                            disabled={editable}
                                            onChange={(e) => handleDashItemsChange(e, i)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditData;
