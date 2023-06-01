import { useEffect, useState } from "react";

const calculateEndDate = (duration:any) => {
  const currentDate = new Date();
  const endDate = new Date(currentDate);

  // Add logic to calculate the end date based on the selected duration
  if (duration.endsWith("Months")) {
    const months = parseInt(duration);
    endDate.setMonth(endDate.getMonth() + months);
  } else if (duration.endsWith("Year")) {
    const years = parseInt(duration);
    endDate.setFullYear(endDate.getFullYear() + years);
  }

  return endDate.toDateString(); // Return the formatted end date as per your needs
};

const SubscriptionPage = () => {
  const [selectedDuration, setSelectedDuration] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (selectedDuration) {
      const calculatedEndDate = calculateEndDate(selectedDuration);
      setEndDate(calculatedEndDate);
    } else {
      setEndDate("");
    }
  }, [selectedDuration]);

  const handleDurationChange = (event:any) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <div>   
        {/* style={{backgroundColor:"antiquewhite"}} */}
      <h1 style={{color:"peru",textShadow:"2px 2px 2px blue"}}>Subscription Page</h1>
      <label>
        Select Duration:
        <select value={selectedDuration} onChange={handleDurationChange}>
          <option value="">Select</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="9 Months">9 Months</option>
          <option value="1 Year">1 Year</option>
        </select>
      </label>
      {endDate && <p>End Date: {endDate}</p>}
    </div>
  );
};

export default SubscriptionPage;
