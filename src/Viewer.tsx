import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
import { useEffect, useState } from "react";

const Viewer = ({ bpmnXml }: { bpmnXml: string }) => {
    //hook to use the modeler later
    const [viewer, setViewer] = useState<BpmnViewer>()
    const displayFlowChart = async () => {
        if (!viewer) return
        //console.log(viewer.get("viewer"))
        await viewer?.importXML(bpmnXml)
        const canvas: any = viewer?.get('canvas')
        canvas.zoom()
    }

    useEffect(() => {
        const viewerContainer = document.querySelector("#viewer");
        if (!viewerContainer?.childNodes.length) {
            setViewer(new BpmnViewer({ container: "#viewer" }))
        }
    }, []);

    useEffect(() => {
        displayFlowChart()

    }, [bpmnXml])

    return (
        <div >
            <h1 style={{ textAlign: 'left' }}>Viewer</h1>
            <div id="viewer" style={{ width: '100%', height: '30vw', minHeight: '300px', border: 'black 1px solid' }} />


        </div>
    )
}
export default Viewer