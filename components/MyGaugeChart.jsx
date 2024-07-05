import React from "react";
import GaugeChart from "react-gauge-chart";

const MyGaugeChart = ({ correct, incorrect, unanswered }) => {
  const total = correct + incorrect + unanswered;
  const correctPercent = correct / total;
  const incorrectPercent = incorrect / total;
  const unansweredPercent = unanswered / total;

  return (
    <div className="w-full ">
      <div className="pt-2">
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={3}
          arcsLength={[correctPercent, incorrectPercent, unansweredPercent]}
          colors={["#00FF00", "#FF0000", "#808080"]}
          percent={correctPercent}
          arcPadding={0.01}
          cornerRadius={3}
          textColor="#000000"
          needleColor="#345243"
          // animate={false}
          formatTextValue={(value) => `Score: ${value}%`}
        />
      </div>

        <div className="flex items-center space-x-2 px-6 py-2 w-full justify-between">
          {/* Green Square */}
          <div className="flex items-center space-x-2 ">
            <div className="w-6 h-6 text-center text-white font-bold" style={{ backgroundColor: '#00FF00' }}>{correct}</div>
            <span className="text-md">Correct</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className="w-6 h-6 text-center text-white font-bold" style={{ backgroundColor: '#FF0000' }}>{incorrect}</div>
            <span className="text-md">Incorrect</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className="w-6 h-6 text-center text-white font-bold" style={{ backgroundColor: '#808080' }}>{unanswered}</div>
            <span className="text-md">Unanswered</span>
          </div>
        </div>
    </div>
  );
};

export default MyGaugeChart;
