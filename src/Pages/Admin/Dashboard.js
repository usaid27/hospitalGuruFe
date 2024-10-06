// src/Pages/Admin/Dashboard.js
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Sample data for charts
const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
    }],
};

const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
        label: 'Revenue',
        data: [4000, 5000, 7000, 2000, 3000, 4000, 6000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    }],
};

const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Sales',
            data: [300, 500, 400, 700],
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.1,
        },
        {
            label: 'Expenses',
            data: [200, 300, 400, 500],
            fill: false,
            borderColor: '#FF6384',
            tension: 0.1,
        },
    ],
};

function Dashboard() {
    return (
        <div style={{ flexGrow: 1, padding: 24 }}>
            <Grid container spacing={3}>
                {/* Statistic Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Hospitals</Typography>
                            <Typography variant="h4">150</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Doctors</Typography>
                            <Typography variant="h4">300</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Diseases</Typography>
                            <Typography variant="h4">50</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Procedures</Typography>
                            <Typography variant="h4">75</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Charts */}
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Hospitals</Typography>
                            <div style={{ width: '100%', height: '150px' }}>
                                <Doughnut data={data} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Doctors</Typography>
                            <div style={{ width: '100%', height: '150px' }}>
                                <Doughnut data={data} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Diseases</Typography>
                            <div style={{ width: '100%', height: '150px' }}>
                                <Doughnut data={data} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Procedures</Typography>
                            <div style={{ width: '100%', height: '150px' }}>
                                <Doughnut data={data} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Revenue and Sales</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <div style={{ width: '100%', height: '250px' }}>
                                        <Bar data={barData} options={{ responsive: true }} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div style={{ width: '100%', height: '250px' }}>
                                        <Line data={lineData} options={{ responsive: true }} />
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
