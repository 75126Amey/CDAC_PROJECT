import { config2 } from "../config"

export default function DownloadReportForPublisher({id}){
    return(
        <div>
            <div className="container mt-5">
        <a href={`${config2.url}/excel/download/publisher/sales/${id}`} className="btn btn-outline-primary btn-lg rounded-pill">
            Download Sales Report
        </a>
        </div>
            </div>   
    )
}