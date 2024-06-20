import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './App.css';

import 'bpmn-js/dist/assets/diagram-js.css';
import { useState } from 'react';
import Modeler from './Modeler';
import Viewer from './Viewer';

function App() {
  const [flowChartXml, setFlowChartXml] = useState<string>("")

  const fetchXml = (xml: string) => {
    setFlowChartXml(xml)
  }

  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
        <Modeler save={fetchXml} />
        <Viewer bpmnXml={flowChartXml} />
      </div>
    </div>
  );
}

export default App;
