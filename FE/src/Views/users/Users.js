import React, { useEffect, useState } from 'react'
import './Users.scss'
import Table from 'react-bootstrap/Table';
import MyNav from '../../components/nav/MyNav'
import Container from 'react-bootstrap/esm/Container';
import ModelDelete from '../../components/Model/ModelDelete';
import ModalUser from '../../components/Model/ModalUser';
import { useNavigate } from 'react-router-dom';
import { deleteUser, fecthAllUser } from '../../service/userService';
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';
import { getAllGroup } from '../../service/groupService';
import Button from 'react-bootstrap/esm/Button';

const Users = (props) => {

    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [showModelDelete, setShowModelDelete] = useState(false);
    const [dataModel, setDataModel] = useState({});
    const navigate = useNavigate();
    const [accout, setAccout] = useState({});
    const [actionModalUser, setActionModalUser] = useState("CREATE");

    // Phân trang ở đây, cần xem lại Back-end nếu không nhớ (getAllUser)
    // Đã sử dụng thư viện react-paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [listUser, setListUser] = useState([]);


    const fetchUser = async () => {
        let res = await fecthAllUser(currentPage, currentLimit);
        if (res && res.data) {
            setTotalPage(res.data.data.totalPages);
            setListUser(res.data.data.users);
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem('accout');
        if (session) {
            setAccout(JSON.parse(session));
        } else {
            navigate('/');
        }
        fetchUser();
    }, [currentPage])

    // handle pagination
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchUser();
        console.log("Check data list: ", event);
    };

    const handleDeleteUser = async (user) => {
        setShowModelDelete(true);
        setDataModel(user);

    }

    const handleClose = () => {
        setShowModelDelete(false);
        setDataModel({});
    }

    const onHide = () => {
        setIsShowModalUser(false);
    }

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModel)
        if (res && res.data) {
            toast.success(res.data.message);
            await fetchUser();
            setShowModelDelete(false);
        } else {
            toast.error(res.data.message);
        }
    }
    return (
        <>
            <MyNav />
            <Container className='Users'>
                <h1 className='mt-4'>List Users</h1>
                <div>
                    <Button variant='success' onClick={() => setIsShowModalUser(true)}>Create new user</Button>
                </div>
                <Table striped bordered hover variant="dark" className='mb-4 mt-2'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Group name</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 ?
                            <>
                                {listUser.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.Group ? user.Group.name : "Chưa có Group"}</td>
                                            <td className='edit'>
                                                <button
                                                    className='btn btn-warning'
                                                >Edit
                                                </button>
                                                <button
                                                    className='btn btn-danger ms-4'
                                                    onClick={() => handleDeleteUser(user)}
                                                >Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                            :
                            <tr>
                                <td className='not-found-user' colSpan={5}>Not Found User</td>
                            </tr>
                        }
                    </tbody>
                </Table>
                {totalPage > 0 &&
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                }

                <ModelDelete
                    show={showModelDelete}
                    handleClose={handleClose}
                    confirmDeleteUser={confirmDeleteUser}
                    dataModel={dataModel}
                />

                <ModalUser
                    title={'Create new user'}
                    onHide={onHide}
                    isShowModalUser={isShowModalUser}
                    action={actionModalUser}
                />
            </Container>

        </>
    )
}
export default Users;