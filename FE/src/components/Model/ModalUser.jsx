import React, { useEffect } from 'react'
import { useState } from 'react';
import { getAllGroup } from '../../service/groupService';
import { toast } from 'react-toastify'
import { createUserWithAdmin } from '../../service/userService';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/esm/Container';
export default function ModalUser(props) {

    const defaultUserData = {
        email: "",
        password: "",
        userName: "",
        groupId: ""
    };

    const validInputDefaul = {
        email: true,
        password: true,
        userName: true,
        groupId: true
    };
    const [validInput, setValidInput] = useState(validInputDefaul);
    const [userdata, setUserData] = useState(defaultUserData);

    const handelUserInput = (value, name) => {
        let _userData = _.cloneDeep(userdata);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidateInputs = () => {
        setValidInput(validInputDefaul);
        // create user
        let check = true;
        let arr = ['email', 'userName', 'password', 'group'];
        for (let i = 0; i < arr.length; i++) {
            if (!userdata[arr[i]]) {
                toast.error(`Empty Input ${arr[i]}`);
                let _validInput = _.cloneDeep(validInputDefaul);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                check = false;
                break;
            }
        }
        return check;
    }

    const handelConfirmUser = async () => {
        let check = checkValidateInputs();
        if (check === true) {
            let res = await createUserWithAdmin(userdata);
            console.log(res);
            if (res.data && res.data.EC === 0) {
                props.onHide();
                toast.success('Tạo mới người dùng thành công');
                setUserData({ ...defaultUserData, group: userGroup[0].id })
            } else {
                toast.error('Error create user');
            }
        } else {
            return;
        }
    }

    const [userGroup, setUserGroup] = useState([]);
    useEffect(() => {
        fetchGroup();
    }, [])
    const fetchGroup = async () => {
        let res = await getAllGroup();
        if (res && res.data.EC === '0') {
            setUserGroup(res.data.data);
            if (res.data.data) {
                let groups = res.data.data;
                setUserData({ ...userdata, group: groups[0].id })
            }
        }
    }
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={props.isShowModalUser}
            centered
            className='model-user'
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.action === "CREATE" ? 'Create new user' : 'Edit a user'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label htmlFor="email">Email</label>
                            <input
                                id='email'
                                className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                value={userdata.email}
                                onChange={(event) => handelUserInput(event.target.value, "email")}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label htmlFor="user-name">User name</label>
                            <input
                                id='user-name'
                                className={validInput.userName ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                value={userdata.userName}
                                onChange={(event) => handelUserInput(event.target.value, "userName")}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label htmlFor="password">Password</label>
                            <input
                                id='password'
                                className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                type="password"
                                value={userdata.password}
                                onChange={(event) => handelUserInput(event.target.value, "password")}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label htmlFor="group">Group</label>
                            <select
                                className={validInput.email ? 'form-select' : 'form-select is-invalid'}
                                aria-label="Default select example"
                                id='group'
                                onChange={(event) => handelUserInput(event.target.value, "groupId")}
                            >
                                <option defaultValue>--- Choose Group ---</option>
                                {userGroup && userGroup.length > 0 ?
                                    userGroup.map((group, index) => {
                                        return (
                                            <option
                                                key={`group-${index}`}
                                                value={group.id}
                                            >{group.name}
                                            </option>
                                        )
                                    }) :
                                    <option>Loading</option>
                                }

                            </select>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>Close</Button>
                <Button variant='success' onClick={() => handelConfirmUser()}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}
