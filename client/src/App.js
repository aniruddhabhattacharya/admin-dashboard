import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Graph1 from './components/Graph1.js';
import Graph2 from './components/Graph2.js';
import Table from './components/Table';
import Filter from './components/Filter';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { add } from './redux/slices/dashboard/index.ts';

function App() {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState({
    make: [],
    duration: [],
  });

  const fetchData = async () => {
    try {
      const { make, duration } = filters;
      console.log("Applied Filters: 3", make, duration)
      const response = await axios.get('http://localhost:3001/api/dataops/getData', {
        params: {
          make: make.join(','), // Passing filter as query params
          duration: duration.join(',')
        }
      });
      if (response && response.data.status === 'success') {
        dispatch(add(response.data.response));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const dashBoardInfo = useAppSelector((state) => state.dashBoard);

  useEffect(() => {
    fetchData();
  }, []);

  const getCounts = (type) => {
    if (type === 'new-units') {
      return dashBoardInfo.filter(item => item.condition === "new").length;
    } else if (type === 'new-msrp') {
      const newItems = dashBoardInfo.filter(item => item.condition === "new");
      const prices = newItems.map(item => parseFloat(item.price.replace(" USD", "")));
      const sum = prices.reduce((acc, price) => acc + price, 0);
      return sum;
    } else if (type === 'new-avg-msrp') {
      const newItems = dashBoardInfo.filter(item => item.condition === "new");
      const prices = newItems.map(item => parseFloat(item.price.replace(" USD", "")));
      const sum = prices.reduce((acc, price) => acc + price, 0);
      const avg = sum / prices.length;
      return Math.floor(avg);
    } else if (type === 'used-units') {
      return dashBoardInfo.filter(item => item.condition === "used").length;;
    } else if (type === 'used-msrp') {
      const newItems = dashBoardInfo.filter(item => item.condition === "used");
      const prices = newItems.map(item => parseFloat(item.price.replace(" USD", "")));
      const sum = prices.reduce((acc, price) => acc + price, 0);
      return sum;
    } else if (type === 'used-avg-msrp') {
      const newItems = dashBoardInfo.filter(item => item.condition === "used");
      const prices = newItems.map(item => parseFloat(item.price.replace(" USD", "")));
      const sum = prices.reduce((acc, price) => acc + price, 0);
      const avg = sum / prices.length;
      return Math.floor(avg);
    } else if (type === 'cpo-units') {
      return dashBoardInfo.filter(item => item.condition === "cpo").length;;
    } else if (type === 'cpo-msrp') {
      const newItems = dashBoardInfo.filter(item => item.condition === "cpo");
      const prices = newItems.map(item => parseFloat(item.price.replace(" USD", "")));
      const sum = prices.reduce((acc, price) => acc + price, 0);
      return sum;
    } else {
      return 0
    }
  }


  const handleFilterChange = async (newFilters) => {
    console.log("Applied Filters: 2", newFilters)
    setFilters(newFilters);
    try {
      const { make, duration } = newFilters;
      console.log("Applied Filters: 3", make, duration)
      const response = await axios.get('http://localhost:3001/api/dataops/getData', {
        params: {
          make: make.join(','), // Passing filter as query params
          duration: duration.join(',')
        }
      });
      if (response && response.data.status === 'success') {
        dispatch(add(response.data.response));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRemoveFilters = async() => {
    console.log("Applied Filters: 4")
    // Reset filters and refetch data
    setFilters({});
    try {
      const { make, duration } = {};
      console.log("Applied Filters: 3", make, duration)
      const response = await axios.get('http://localhost:3001/api/dataops/getData', {
        params: {
          make: null, // Passing filter as query params
          duration: null
        }
      });
      if (response && response.data.status === 'success') {
        dispatch(add(response.data.response));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <div className="container-view">
        <div className="left-container">
          <Header />

          <div className="top-cont">
            <div className="row mt-2">
              <div className="" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h2>Inventory</h2>
                <div className="">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <label style={{ fontWeight: "bold", color: "#333" }}>Select Dealer</label>
                    <select
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option>AAA MITSUBISHI DEALER</option>
                    </select>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "white",
                        border: "none",
                        color: "#ff8c00",
                        fontWeight: "bold",
                        fontSize: "14px",
                        padding: "8px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{marginRight: "10px"}} className="material-symbols-outlined">
                      filter_list
                      </span>
                      FILTER DATA BY
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <p style={{ fontWeight: "bolder", fontSize: "12px" }}>Recent Gathered Data 04/01/24</p>
              <div className="col-6">
                <div className="row">
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>{getCounts('new-units')}</h3>
                      <p className='orange-text'># New Units</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>${getCounts('new-msrp')}</h3>
                      <p className='orange-text'>New MSRP</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>${getCounts('new-avg-msrp')}</h3>
                      <p className='orange-text'>New Avg. MSRP</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>{getCounts('used-units')}</h3>
                      <p className='orange-text'># Used Units</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>${getCounts('used-msrp')}</h3>
                      <p className='orange-text'>Used MSRP</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>${getCounts('used-avg-msrp')}</h3>
                      <p className='orange-text'>Used Avg. MSRP</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>{getCounts('cpo-units')}</h3>
                      <p className='orange-text'># CPO Units</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card-dashboard">
                      <h3>${getCounts('cpo-msrp')}</h3>
                      <p className='orange-text'>CPO MSRP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <Graph1 />
            <br />
            <Graph2 />
            <br />
            <Table />
          </div>
        </div>
        <div className="right-container">
          <Filter onFilterChange={handleFilterChange} onRemoveFilters={handleRemoveFilters} />
        </div>
      </div>
    </div>
  );
}

export default App;
