// src/Pages/Admin/Hospital/Hospitals.js

import React, { useEffect, useMemo, useState } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllHospitals, deleteHospital } from '../../../Services/apiService';
import HospitalDetailsDialog from './HospitalDetailsDialog'; // Ensure this component exists
import hospitalImage from '../../../Assets/hospital-icon.jpg'; // Update the path as needed
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CSVLink } from 'react-csv';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Pagination, InputGroup } from 'react-bootstrap';
import { useTable, useSortBy } from 'react-table';
import '../../../Styles/DataTable.css';

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  const onChange = value => {
    setGlobalFilter(value || undefined);
  };

  return (
    <Form.Control
      size="sm"
      type="text"
      value={value || ""}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search...`}
      className="me-2"
    />
  );
}

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [gotoPage, setGotoPage] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getAllHospitals();
        console.log("Fetched Hospitals:", data);
        setHospitals(data);
      } catch (error) {
        toast.error('Error fetching hospitals.');
      }
    };
    fetchHospitals();
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Delete Hospital',
      message: 'Are you sure you want to delete this hospital? This action cannot be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteHospital(id);
              setHospitals(prevHospitals => prevHospitals.filter(hospital => hospital.id !== id));
              toast.success('Hospital deleted successfully!');
            } catch (error) {
              toast.error('Failed to delete hospital.');
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info('Hospital deletion canceled.')
        }
      ],
      overlayClassName: "confirm-alert-overlay-danger",
    });
  };

  const handleViewHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowDetails(true);
  };

  const handleCloseDialog = () => setShowDetails(false);

  const convertByteArrayToImage = (base64String) => {
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : hospitalImage;
  };

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({ value }) => (
        <div style={{ width: '60px', textAlign: 'center' }}>{value}</div>
      ),
      sortType: 'basic',
      width: 60
    },
    {
      Header: 'Image',
      accessor: 'imageFile', // Changed to 'imageBase64'
      Cell: ({ value }) => (
        <img
          src={convertByteArrayToImage(value)}
          alt="Hospital"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
        />
      ),
      width: 70
    },
    {
      Header: 'Name',
      accessor: 'name', // Changed to 'name'
      sortType: 'basic',
      width: 200
    },
    {
      Header: 'Location',
      accessor: 'location', // Changed to 'location'
      sortType: 'basic',
      width: 200
    },
    {
      Header: 'Phone',
      accessor: 'phone', // Changed to 'phone'
      sortType: 'basic',
      width: 150
    },
    {
      Header: 'Email',
      accessor: 'email', // Changed to 'email'
      sortType: 'basic',
      width: 200
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="action-buttons" style={{ textAlign: 'center' }}>
          <Button variant="info" size="sm" onClick={() => handleViewHospital(row.original)} style={{ margin: '0 2px' }}>
            <FaEye />
          </Button>
          <Button variant="warning" size="sm" onClick={() => navigate(`/admin/hospitals/edit-hospital/${row.original.id}`)} style={{ margin: '0 2px' }}>
            <FaEdit />
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.original.id)} style={{ margin: '0 2px' }}>
            <FaTrash />
          </Button>
        </div>
      ),
      width: 150
    },
  ], [navigate]);

  const filteredData = useMemo(() => {
    return hospitals.filter(hospital =>
      hospital.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      hospital.location?.toLowerCase().includes(searchText.toLowerCase()) ||
      hospital.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
      hospital.email?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [hospitals, searchText]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        sortBy: [{ id: 'id', desc: false }],
      },
    },
    useSortBy
  );

  const indexOfLastHospital = currentPage * itemsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - itemsPerPage;
  const currentHospitals = rows.slice(indexOfFirstHospital, indexOfLastHospital);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleGotoPage = () => {
    const pageNum = parseInt(gotoPage, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      toast.error(`Please enter a page number between 1 and ${totalPages}`);
    }
    setGotoPage('');
  };

  return (
    <Container fluid>

      <Row className="mb-3 mt-3">
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <Button variant="primary" onClick={() => navigate('/admin/hospitals/add-hospital')}>
            <FaPlus /> Add Hospital
          </Button>
        </Col>
        <Col xs={12} md={9} className="d-flex flex-column flex-md-row justify-content-md-end align-items-center">
          <div className="d-flex flex-row mb-2 mb-md-0">
            <CSVLink
              data={filteredData}
              headers={[
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Location", key: "location" },
                { label: "Phone", key: "phone" },
                { label: "Email", key: "email" }
              ]}
              filename="hospitals_export.csv"
              className="btn btn-success me-2"
            >
              <FaDownload /> Export CSV
            </CSVLink>
            <div className="position-relative">
              <GlobalFilter
                globalFilter={searchText}
                setGlobalFilter={setSearchText}
                className="form-control rounded-pill"
                style={{ width: '100%' }} // Make search box full width on small screens
              />
            </div>
          </div>
        </Col>
      </Row>


      <Table bordered hover striped responsive {...getTableProps()} className="table-custom">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {currentHospitals.length > 0 ? (
            currentHospitals.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.column.id} style={{ width: cell.column.width }}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">No hospitals found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Row className="align-items-center mt-3">
        <Col md={6}>
          <div className="d-flex align-items-center">
            <div className="w-33 me-2"> {/* Adjust width here */}
              <Form.Select
                size="sm"
                value={itemsPerPage}
                onChange={e => setItemsPerPage(parseInt(e.target.value, 10))}
              >
                {[5, 10, 15, 20].map(size => (
                  <option key={size} value={size}>{size} per page</option>
                ))}
              </Form.Select>
            </div>
            <div>Total Items: {filteredData.length}</div>
          </div>
        </Col>

        <Col md={6} className="d-flex justify-content-end align-items-center">
          <InputGroup size="sm" className="me-2" style={{ width: '150px', marginBottom: '1rem' }}>
            <Form.Control
              type="number"
              value={gotoPage}
              onChange={e => setGotoPage(e.target.value)}
              placeholder="Go to page"
            />
            <Button onClick={handleGotoPage}>Go</Button>
          </InputGroup>
          <Pagination size="sm">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </Col>
      </Row>

      {selectedHospital && (
        <HospitalDetailsDialog
          show={showDetails}
          onClose={handleCloseDialog}
          hospital={selectedHospital}
        />
      )}
    </Container>
  );
}

export default Hospitals;
