import React, { useEffect, useMemo, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllDoctors, deleteDoctor } from "../../../Services/apiService";
import DoctorDetailsDialog from "./DoctorDetailsDialog";
import doctorImage from "../../../Assets/doctor.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { CSVLink } from "react-csv";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Pagination, InputGroup } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";
import "../../../Styles/DataTable.css";
import Loading from "../../Loading";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <Form.Control
      size="sm"
      type="text"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search...`}
      className="me-2"
      style={{ height: "5vh" }}
    />
  );
}

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [gotoPage, setGotoPage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      setloading(true);
      try {
        const data = await getAllDoctors();
        console.log("Fetched Doctors:", data);
        setDoctors(data);
        setloading(false);
      } catch (error) {
        toast.error("Error fetching doctors.");
        setloading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Delete Doctor",
      message:
        "Are you sure you want to delete this doctor? This action cannot be undone.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteDoctor(id);
              setDoctors((prevDoctors) =>
                prevDoctors.filter((doctor) => doctor.id !== id)
              );
              toast.success("Doctor deleted successfully!");
            } catch (error) {
              toast.error("Failed to delete doctor.");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Doctor deletion canceled."),
        },
      ],
      overlayClassName: "confirm-alert-overlay-danger",
    });
  };

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetails(true);
  };

  const handleCloseDialog = () => setShowDetails(false);

  const convertByteArrayToImage = (base64String) => {
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : doctorImage;
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => (
          <div style={{ width: "60px", textAlign: "center" }}>{value}</div>
        ),
        sortType: "basic",
        width: 60,
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <img
            src={convertByteArrayToImage(value)}
            alt="Doctor"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ),
        width: 70,
      },
      {
        Header: "Name",
        accessor: "name",
        sortType: "basic",
        width: 200,
      },
      {
        Header: "Specialization",
        accessor: "specialization",
        sortType: "basic",
        width: 200,
      },
      {
        Header: "About",
        accessor: "about",
        sortType: "basic",
        width: 200,
      },
      {
        Header: "Education & Training",
        accessor: "educationAndTraining",
        sortType: "basic",
        width: 200,
      },
      {
        Header: "Experience",
        accessor: "experience",
        sortType: "basic",
        width: 200,
      },
      {
        Header: "Membership",
        accessor: "membership",
        sortType: "basic",
        width: 200,
      },

      {
        Header: "Actions",
        Cell: ({ row }) => {
          const doctor = row.original;
          return (
            <div className="action-buttons" style={{ textAlign: "center" }}>
              <Button
                variant="info"
                size="sm"
                onClick={() => handleViewDoctor(doctor)}
                style={{ margin: "0 2px" }}
              >
                <FaEye />
              </Button>
              <Button
                variant="warning"
                size="sm"
                onClick={() =>
                  navigate(`/admin/doctors/edit-doctor/${doctor.id}`)
                }
                style={{ margin: "0 2px" }}
              >
                <FaEdit />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(doctor.id)}
                style={{ margin: "0 2px" }}
              >
                <FaTrash />
              </Button>
              {/* Add social media buttons */}
              {doctor.fbLink && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.open(doctor.fbLink, "_blank")}
                  style={{ margin: "0 2px" }}
                >
                  <i className="fab fa-facebook" /> {/* Facebook Icon */}
                </Button>
              )}
              {doctor.linkedInLink && (
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => window.open(doctor.linkedInLink, "_blank")}
                  style={{ margin: "0 2px" }}
                >
                  <i className="fab fa-linkedin" /> {/* LinkedIn Icon */}
                </Button>
              )}
              {doctor.xLink && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(doctor.xLink, "_blank")}
                  style={{ margin: "0 2px" }}
                >
                  <i className="fab fa-x" /> {/* X (formerly Twitter) Icon */}
                </Button>
              )}
              {doctor.threadLink && (
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => window.open(doctor.threadLink, "_blank")}
                  style={{ margin: "0 2px" }}
                >
                  <i className="fab fa-thread" /> {/* Threads Icon */}
                </Button>
              )}
            </div>
          );
        },
        width: 230,
      },
    ],
    [navigate]
  );

  const filteredData = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        doctor.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [doctors, searchText]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        sortBy: [{ id: "id", desc: false }],
      },
    },
    useSortBy
  );

  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = rows
    .slice(indexOfFirstDoctor, indexOfLastDoctor)
    .map((row) => {
      prepareRow(row);
      return row.original;
    });
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleGotoPage = () => {
    const pageNum = parseInt(gotoPage, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-3 mt-3">
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <Button
            variant="primary"
            onClick={() => navigate("/admin/doctors/add-doctor")}
          >
            <FaPlus /> Add Doctor
          </Button>
        </Col>
        <Col
          xs={12}
          md={9}
          className="d-flex flex-column flex-md-row justify-content-md-end align-items-center"
        >
          <div className="d-flex flex-row mb-2 mb-md-0">
            <CSVLink
              data={filteredData}
              headers={[
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Specialization", key: "specialization" },
              ]}
              filename="doctors_export.csv"
              className="btn btn-success me-2"
            >
              <FaDownload /> Export CSV
            </CSVLink>
            <div className="position-relative">
              <GlobalFilter
                globalFilter={searchText}
                setGlobalFilter={setSearchText}
                className="form-control rounded-pill"
                style={{ width: "100%" }} // Make search box full width on small screens
              />
            </div>
          </div>
        </Col>
      </Row>

      {loading ? (
        <div
          style={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        // <>
        <div className="table-container">
          <Table
            bordered
            hover
            striped
            responsive
            {...getTableProps()}
            // className="table-custom"
            className="glass-table"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {currentDoctors.map((doctor, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ width: column.width, textAlign: "center" }}
                    >
                      {column.Cell
                        ? column.Cell({
                            value: doctor[column.accessor],
                            row: { original: doctor },
                          })
                        : doctor[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <Row className="align-items-center mt-3">
        <Col md={6}>
          <div className="d-flex align-items-center">
            <div className="w-33 me-2">
              {" "}
              {/* Adjust width here */}
              <Form.Select
                size="sm"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size} per page
                  </option>
                ))}
              </Form.Select>
            </div>
            <div>Total Items: {filteredData.length}</div>
          </div>
        </Col>

        <Col md={6} className="d-flex justify-content-end align-items-center">
          <InputGroup
            size="sm"
            className="me-2"
            style={{ width: "150px", marginBottom: "1rem" }}
          >
            <Form.Control
              type="number"
              value={gotoPage}
              onChange={(e) => setGotoPage(e.target.value)}
              placeholder="Go to page"
            />
            <Button onClick={handleGotoPage}>Go</Button>
          </InputGroup>
          <Pagination size="sm">
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
            />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
          </Pagination>
        </Col>
      </Row>
      {/* </> */}

      {selectedDoctor ? (
        <DoctorDetailsDialog
          show={showDetails}
          onClose={handleCloseDialog}
          doctor={selectedDoctor}
        />
      ) : null}
    </Container>
  );
}

export default Doctors;
