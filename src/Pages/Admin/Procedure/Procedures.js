import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { FaEye, FaEdit, FaTrash, FaPlus, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllProcedures, deleteProcedure, getAllDoctors, getAllHospitals } from '../../../Services/apiService';
import ProcedureDetailsDialog from './ProcedureDetailsDialog';
import procedureImage from '../../../Assets/Procedure.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CSVLink } from 'react-csv';
import { Table, Button, Form, Container, Row, Col, Pagination, InputGroup, ListGroup } from 'react-bootstrap';
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

function Procedures() {
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [gotoPage, setGotoPage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proceduresData = await getAllProcedures();
        setProcedures(proceduresData);
        const doctorsData = await getAllDoctors();
        setDoctors(doctorsData);
        const hospitalsData = await getAllHospitals();
        setHospitals(hospitalsData);
      } catch (error) {
        toast.error('Error fetching procedures, doctors, or hospitals.');
      }
    };
    fetchData();
  }, []);

  const handleDelete = useCallback((id) => {
    confirmAlert({
      title: 'Delete Procedure',
      message: 'Are you sure you want to delete this procedure? This action cannot be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await deleteProcedure(id);
              setProcedures(prev => prev.filter(proc => proc.id !== id));
              toast.success('Procedure deleted successfully!');
            } catch (error) {
              toast.error('Failed to delete procedure.');
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info('Procedure deletion canceled.')
        }
      ],
      overlayClassName: "confirm-alert-overlay-danger",
    });
  }, []);

  const handleViewProcedure = useCallback((procedure) => {
    setSelectedProcedure(procedure);
    setShowDetails(true);
  }, []);

  const handleCloseDialog = useCallback(() => setShowDetails(false), []);

  const convertByteArrayToImage = useCallback((base64String) => {
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : procedureImage;
  }, []);

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
      accessor: 'introductionMedia',
      Cell: ({ value }) => (
        <img
          src={convertByteArrayToImage(value)}
          alt="Procedure"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
        />
      ),
      width: 70
    },
    {
      Header: 'Procedure Name',
      accessor: 'procedureName',
      sortType: 'basic',
      width: 200
    },
    {
      Header: 'Procedure Overview',
      accessor: 'procedureOverview',
      sortType: 'basic',
      width: 300
    },
    {
      Header: 'Typical Duration',
      accessor: 'typicalDuration',
      sortType: 'basic',
      width: 150
    },
    {
      Header: 'Recovery Time',
      accessor: 'recoveryTime',
      sortType: 'basic',
      width: 150
    },
    {
      Header: 'Success Rate',
      accessor: 'successRate',
      Cell: ({ value }) => value ? `${value}%` : 'N/A',
      sortType: 'basic',
      width: 100
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => {
        const procedure = row.original;
        return (
          <div className="action-buttons" style={{ textAlign: 'center' }}>
            <Button variant="info" size="sm" onClick={() => handleViewProcedure(procedure)} style={{ margin: '0 2px' }}>
              <FaEye />
            </Button>
            <Button variant="warning" size="sm" onClick={() => navigate(`/admin/procedures/edit-procedure/${procedure.id}`)} style={{ margin: '0 2px' }}>
              <FaEdit />
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleDelete(procedure.id)} style={{ margin: '0 2px' }}>
              <FaTrash />
            </Button>
            {/* Add social media buttons */}
            {procedure.socialLinks && procedure.socialLinks.fbLink && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(procedure.socialLinks.fbLink, '_blank')}
                style={{ margin: '0 2px' }}
              >
                <i className="fab fa-facebook" /> {/* Facebook Icon */}
              </Button>
            )}
            {procedure.socialLinks && procedure.socialLinks.linkedInLink && (
              <Button
                variant="info"
                size="sm"
                onClick={() => window.open(procedure.socialLinks.linkedInLink, '_blank')}
                style={{ margin: '0 2px' }}
              >
                <i className="fab fa-linkedin" /> {/* LinkedIn Icon */}
              </Button>
            )}
            {procedure.socialLinks && procedure.socialLinks.xLink && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(procedure.socialLinks.xLink, '_blank')}
                style={{ margin: '0 2px' }}
              >
                <i className="fab fa-x" /> {/* X (formerly Twitter) Icon */}
              </Button>
            )}
            {procedure.socialLinks && procedure.socialLinks.threadLink && (
              <Button
                variant="dark"
                size="sm"
                onClick={() => window.open(procedure.socialLinks.threadLink, '_blank')}
                style={{ margin: '0 2px' }}
              >
                <i className="fab fa-thread" /> {/* Threads Icon */}
              </Button>
            )}
          </div>
        );
      },
      width: 200
    },
  ], [navigate, handleViewProcedure, handleDelete, convertByteArrayToImage]);

  const filteredData = useMemo(() => {
    return procedures.filter(procedure =>
      procedure.procedureName?.toLowerCase().includes(searchText.toLowerCase()) ||
      procedure.procedureOverview?.toLowerCase().includes(searchText.toLowerCase()) ||
      procedure.typicalDuration?.toLowerCase().includes(searchText.toLowerCase()) ||
      procedure.recoveryTime?.toLowerCase().includes(searchText.toLowerCase()) ||
      (procedure.successRate && procedure.successRate.toString().includes(searchText)) ||
      (procedure.causes && procedure.causes.toLowerCase().includes(searchText.toLowerCase())) ||
      (procedure.symptoms && procedure.symptoms.toLowerCase().includes(searchText.toLowerCase())) ||
      (procedure.diagnosis && procedure.diagnosis.toLowerCase().includes(searchText.toLowerCase())) ||
      (procedure.treatmentDetails && procedure.treatmentDetails.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [procedures, searchText]);

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

  const indexOfLastProcedure = currentPage * itemsPerPage;
  const indexOfFirstProcedure = indexOfLastProcedure - itemsPerPage;
  const currentProcedures = useMemo(() => {
    return rows.slice(indexOfFirstProcedure, indexOfLastProcedure).map(row => {
      prepareRow(row);
      return row.original;
    });
  }, [rows, indexOfFirstProcedure, indexOfLastProcedure, prepareRow]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleGotoPage = useCallback(() => {
    const pageNum = parseInt(gotoPage, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      toast.error(`Please enter a page number between 1 and ${totalPages}`);
    }
    setGotoPage('');
  }, [gotoPage, totalPages]);

  return (
    <Container fluid>
      <Row className="mb-3 mt-3">
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <Button variant="primary" onClick={() => navigate('/admin/procedures/add-procedure')}>
            <FaPlus /> Add Procedure
          </Button>
        </Col>
        <Col xs={12} md={9} className="d-flex flex-column flex-md-row justify-content-md-end align-items-center">
          <div className="d-flex flex-row mb-2 mb-md-0">
            <CSVLink
              data={filteredData}
              headers={[
                { label: "ID", key: "id" },
                { label: "Procedure Name", key: "procedureName" },
                { label: "Procedure Overview", key: "procedureOverview" },
                { label: "Typical Duration", key: "typicalDuration" },
                { label: "Recovery Time", key: "recoveryTime" },
                { label: "Success Rate", key: "successRate" },
              ]}
              filename="procedures_export.csv"
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
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {currentProcedures.length > 0 ? (
            currentProcedures.map((procedure) => (
              <tr key={procedure.id}>
                <td>{procedure.id}</td>
                <td>
                  <img
                    src={convertByteArrayToImage(procedure.introductionMedia)}
                    alt="Procedure"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </td>
                <td>{procedure.procedureName}</td>
                <td>{procedure.procedureOverview}</td>
                <td>{procedure.typicalDuration || 'N/A'}</td>
                <td>{procedure.recoveryTime || 'N/A'}</td>
                <td>{procedure.successRate ? `${procedure.successRate}%` : 'N/A'}</td>
                <td>
                  <div className="action-buttons" style={{ textAlign: 'center' }}>
                    <Button variant="info" size="sm" onClick={() => handleViewProcedure(procedure)} style={{ margin: '0 2px' }}>
                      <FaEye />
                    </Button>
                    <Button variant="warning" size="sm" onClick={() => navigate(`/admin/procedures/edit-procedure/${procedure.id}`)} style={{ margin: '0 2px' }}>
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(procedure.id)} style={{ margin: '0 2px' }}>
                      <FaTrash />
                    </Button>
                    {/* Add social media buttons */}
                    {procedure.socialLinks && procedure.socialLinks.fbLink && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => window.open(procedure.socialLinks.fbLink, '_blank')}
                        style={{ margin: '0 2px' }}
                      >
                        <i className="fab fa-facebook" /> {/* Facebook Icon */}
                      </Button>
                    )}
                    {procedure.socialLinks && procedure.socialLinks.linkedInLink && (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => window.open(procedure.socialLinks.linkedInLink, '_blank')}
                        style={{ margin: '0 2px' }}
                      >
                        <i className="fab fa-linkedin" /> {/* LinkedIn Icon */}
                      </Button>
                    )}
                    {procedure.socialLinks && procedure.socialLinks.xLink && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.open(procedure.socialLinks.xLink, '_blank')}
                        style={{ margin: '0 2px' }}
                      >
                        <i className="fab fa-x" /> {/* X (formerly Twitter) Icon */}
                      </Button>
                    )}
                    {procedure.socialLinks && procedure.socialLinks.threadLink && (
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => window.open(procedure.socialLinks.threadLink, '_blank')}
                        style={{ margin: '0 2px' }}
                      >
                        <i className="fab fa-thread" /> {/* Threads Icon */}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">No procedures found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination and Items Per Page */}
      <Row className="align-items-center mt-3">
        <Col md={6}>
          <div className="d-flex align-items-center">
            <div className="w-33 me-2">
              <Form.Select
                size="sm"
                value={itemsPerPage}
                onChange={e => {
                  setItemsPerPage(parseInt(e.target.value, 10));
                  setCurrentPage(1);
                }}
              >
                {[5, 10, 15, 20].map(size => (
                  <option key={size} value={size}>{size} per page</option>
                ))}
              </Form.Select>
            </div>
            <span>
              Showing {indexOfFirstProcedure + 1} to {Math.min(indexOfLastProcedure, filteredData.length)} of {filteredData.length} procedures
            </span>
          </div>
        </Col>

        <Col md={6} className="d-flex justify-content-end">
          <Pagination>
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          </Pagination>
          <InputGroup className="ms-2" style={{ width: '120px' }}>
            <Form.Control
              type="number"
              min={1}
              max={totalPages}
              value={gotoPage}
              onChange={e => setGotoPage(e.target.value)}
              placeholder="Go to page"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleGotoPage();
                }
              }}
            />
            <Button variant="outline-secondary" onClick={handleGotoPage}>
              Go
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <ProcedureDetailsDialog
        show={showDetails}
        onClose={handleCloseDialog}
        procedure={selectedProcedure}
      />
    </Container>
  );
}

export default Procedures;
