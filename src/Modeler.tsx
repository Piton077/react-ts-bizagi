import BpmnModeler from "bpmn-js/lib/Modeler";
import { useEffect, useState } from "react";

const flowChartDraft = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_0ex8ya2" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.4.0">
  <bpmn:process id="Process_03dsped" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="Inicio" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_03dsped">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="159" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="162" y="202" width="70" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

interface State {
    save: (xml: string) => void
}

const Modeler = (props: State) => {
    //hook to use the modeler later
    const [modeler, setModeler] = useState<BpmnModeler>()

    const getXML = async () => {
        const { xml } = await modeler!.saveXML({ format: true })
        if (!xml) {
            console.error("There is no flow charts to save")
        } else {
            props.save(xml)
        }
    }

    useEffect(() => {
        //This code is to attach the canvas to any html node
        const modelerContainer = document.querySelector("#canvas");
        if (!modelerContainer?.childNodes.length) {
            const bpmnModeler = new BpmnModeler({
                container: "#canvas",
                keyboard: {
                    bindTo: modelerContainer
                },
            });
            // Note: Dont dare to skip this step otherwise the canvas won't work
            bpmnModeler.importXML(flowChartDraft).then(x => {
                const canvas: any = bpmnModeler.get("canvas")
                canvas.zoom("fit-viewport")
            })
            setModeler(bpmnModeler)
        }
    }, []);

    return (
        <div >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h1 style={{ textAlign: 'left' }}>Modeler</h1>




                <button className="custom-ant-btn" onClick={getXML} > Display on Viewer</button>
                <button className="custom-ant-btn-secondary" > Download BPMN XML</button>

            </div>
            <div id="canvas" style={{ width: '100%', height: '30vw', minHeight: '300px', border: 'black 1px solid' }} />

        </div>
    )
}
export default Modeler