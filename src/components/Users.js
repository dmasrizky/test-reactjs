import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Users() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const [geo, setGeo] = useState([]);
    const [company, setCompany] = useState([]);
    const isMounted = React.useRef(null);

    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [comments, setComments] = useState([]);

    const getData = async () => {
        await axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => setData(response.data));
        // console.log(data);
    };
    const getPosts = async (userId) => {
        await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => setPosts(response.data));
        // console.log(posts);
    };
    const getAlbums = async (userId) => {
        await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response) => setAlbums(response.data));
        // console.log(posts);
    };
    const getComments = async (postId) => {
        await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => setComments(response.data));
        // console.log(posts);
    };

    const [showAddress, setShowAddress] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [showPosts, setShowPosts] = useState(false);
    const [showAlbums, setShowAlbums] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleCloseAddress = () => setShowAddress(false);
    const handleCloseCompany = () => setShowCompany(false);
    const handleClosePosts = () => setShowPosts(false);
    const handleCloseAlbums = () => setShowAlbums(false);
    const handleCloseComments = () => setShowComments(false);

    const handleShowAddress = (item) => 
        {
            setShowAddress(true); 
            setUser(item); 
            setAddress(item.address); 
            setGeo(item.address.geo); 
        }
    const handleShowCompany = (item) => 
        {
            setShowCompany(true);
            setUser(item);
            setCompany(item.company);
        }
    const handleShowPosts = (item) => 
        {
            setShowPosts(true);
            setUser(item);
            getPosts(item.id);
        }
    const handleShowAlbums = (item) => 
        {
            setShowAlbums(true);
            setUser(item);
            getAlbums(item.id);
        }
    
    const handleShowComments = (item) => 
    {
        setShowComments(true);
        getComments(item.id);
    }

    useEffect(() => {
        isMounted.current = true;
        getData();
        return () => {
            isMounted.current = false;
          };
    }, []);
    
  return (
    <div className="col-xs-12">
            <div className="col-xs-12" id="header">
                <div className="col-md-12" id="mid">
                    <center>
                        <h3>List Users</h3>
                    </center>
                </div>
            </div>
            <div className="table-responsive table-full-width col-md-12">
            <Modal show={showAddress} onHide={handleCloseAddress}>
                <Modal.Header closeButton>
                <Modal.Title>Address - {user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>City</b> : {address.city}<br/>
                    <b>Street</b> : {address.street} <br/>
                    <b>Suite</b> : {address.suite} <br/>
                    <b>Zipcode</b> : {address.zipcode} <br/>
                    <b>Geo Latitude</b> : {geo.lat} <br/>
                    <b>Geo Longitude</b> : {geo.lng} <br/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleCloseAddress}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCompany} onHide={handleCloseCompany}>
                <Modal.Header closeButton>
                <Modal.Title>Company - {user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Name</b> : {company.name}<br/>
                    <b>Catch Phrase</b> : {company.catchPhrase} <br/>
                    <b>BS</b> : {company.bs} <br/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleCloseCompany}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showPosts} onHide={handleClosePosts} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Posts - {user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <table className="table table-hover table-striped table-bordered" id="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(
                            (post, index) => 
                            <tr key = {post.id}>    
                                <td> { index + 1} </td>   
                                <td> { post.title} </td>   
                                <td> {post.body} </td>
                                <td> 
                                <Button variant="success" onClick={() => handleShowComments(post)}>
                                    View Comments
                                </Button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        
                    </tfoot> */}
                </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClosePosts}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAlbums} onHide={handleCloseAlbums}>
                <Modal.Header closeButton>
                <Modal.Title>Albums - {user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <table className="table table-hover table-striped table-bordered" id="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            albums.map(
                            (album, index) => 
                            <tr key = {album.id}>    
                                <td> { index + 1} </td>   
                                <td> { album.title} </td> 
                            </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        
                    </tfoot> */}
                </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleCloseAlbums}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showComments} onHide={handleCloseComments} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <table className="table table-hover table-striped table-bordered" id="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.map(
                            (comment, index) => 
                            <tr key = {comment.id}>    
                                <td> { index + 1} </td>   
                                <td> { comment.name} </td> 
                                <td> { comment.email} </td> 
                                <td> { comment.body} </td> 
                            </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        
                    </tfoot> */}
                </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleCloseComments}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>

                <table className="table table-hover table-striped table-bordered" id="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Address</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(
                            (user, index) => 
                            <tr key = {user.id}>    
                            <td> { index + 1} </td>   
                            <td> { user.name} </td>   
                            <td> {user.username}</td>
                            <td> {user.email}</td>
                            <td> {user.phone}</td>
                            <td> {user.website}</td>
                            <td> 
                            <Button onClick={() => handleShowAddress(user)}>
                                View Address
                            </Button>
                            </td>
                            <td> 
                            <Button variant="success" onClick={() => handleShowCompany(user)}>
                                View Company
                            </Button>
                            </td>
                            <td> 
                            <Button variant="warning" onClick={() => handleShowPosts(user)}>
                                View Posts
                            </Button>
                            <Button variant="info" onClick={() => handleShowAlbums(user)}>
                                View Albums
                            </Button>
                            </td>
                            </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        
                    </tfoot> */}
                </table>
            </div>
        </div>
  );
}

export default Users;