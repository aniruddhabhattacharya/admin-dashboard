import React from 'react';
import './css/Filter.css';
import { useForm } from 'react-hook-form';

function Filter({ onFilterChange, onRemoveFilters }) {
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            make: [],
            duration: [],
        },
    });

    const onSubmit = (data) => {
        console.log("Applied Filters:", data);
        // Pass the selected filters back to parent
        onFilterChange(data);
    };

    const ckear = (data) => {
        onRemoveFilters({})
    }

    const handleRemoveFilters = () => {
        // Reset the checkboxes by setting all to empty arrays (which unchecks them)
        reset({
            make: [],
            duration: [],
        });
    };

    return (
        <div className='filter-section'>
            <div className="heading-filter">
                <h4 className='header-font'>
                <span style={{fontSize: "15px", marginRight: "10px"}} className="material-symbols-outlined">
                    arrow_back_ios
                </span>
                    Filter Data By</h4>
            </div>

            <div className="filter-subsection">
                <h6 style={{ fontWeight: "bold", marginTop: "10px" }}>MAKE</h6>
                <div className='space-left'>
                    {["Ford", "Cadillac", "Jeep"].map((make) => (
                        <label key={make} style={{ display: "block", marginBottom: "5px" }}>
                            <input
                                type="checkbox"
                                value={make}
                                {...register("make")}
                                checked={watch("make").includes(make)}
                            />{" "}
                            <span className='input-check'>{make}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-subsection">
                <h6 style={{ fontWeight: "bold", marginTop: "10px" }}>DURATION</h6>
                <div className='space-left'>
                    {["Last Month", "This Month", "Last 3 Months", "Last 6 Months", "This Year", "Last Year"].map((duration) => (
                        <label key={duration} style={{ display: "block", marginBottom: "5px" }}>
                            <input
                                type="checkbox"
                                value={duration}
                                {...register("duration")}
                                checked={watch("duration").includes(duration)}
                            />{" "}
                            <span className='input-check'>{duration}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", gap: "20px" }}>
                <button
                    onClick={handleSubmit(onSubmit)}
                    style={{
                        background: "#ff9800", color: "#fff", border: "none", cursor: "pointer",
                        borderRadius: "2px", width: "100%", padding: "5px", textTransform: "uppercase",
                        fontSize: "12px", letterSpacing: "2px"
                    }}
                >
                    Apply Filter
                </button>
                <button
                    onClick={handleSubmit(ckear)}
                    style={{
                        background: "transparent", color: "#ff9800", border: "1px solid #ff9800",
                        cursor: "pointer", borderRadius: "2px", width: "100%", padding: "5px",
                        textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px"
                    }}
                >
                    Remove All Filters
                </button>
            </div>
        </div>
    );
}

export default Filter;
