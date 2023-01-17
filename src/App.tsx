import useFetch from 'react-fetch-hook';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import createTrigger from "react-use-trigger";
import useTrigger from 'react-use-trigger/useTrigger';

import './App.css';

type ApiResponse = Array<{
  date: string;
  units: number;
}>;

const requestTrigger = createTrigger();

const RenderBarChart = ({ data = [] }: { data: ApiResponse | undefined }) => (
  <BarChart width={800} height={600} data={data}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="units" fill="#8884d8" />
  </BarChart>
);

function App() {
  const requestTriggerValue = useTrigger(requestTrigger);

  const { isLoading, data } = useFetch<ApiResponse>('https://my.api.mockaroo.com/graph.json?key=158c1970', {
    depends: [requestTriggerValue]
  });

  return (
    <div className='app-container'>
      <div className='canvas-container'>
        { isLoading && (<p>Loading...</p>)}
        { !isLoading && <RenderBarChart {...{ data }} />}
      </div>
      <button onClick={() => requestTrigger()}>Fetch new data</button>
    </div>
  );
}

export default App;
