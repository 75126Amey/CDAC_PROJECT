import { config2 } from "../config"

export default function DownloadReportForAuthor({id}){
    return(
        <div>
            <div className="container mt-5">
        <a href={`${config2.url}/excel/download/author/reviews/${id}`} className="btn btn-outline-primary btn-lg rounded-pill my-5">
            Download Reviews
        </a><br/>
        <a href={`${config2.url}/excel/download/author/sales/${id}`} className="btn btn-outline-primary btn-lg rounded-pill">
            Download Sales Report
        </a>
        </div>
            </div>   
    )
}